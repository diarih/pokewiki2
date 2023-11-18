import React, { useEffect, useReducer, createContext, ReactNode, useContext } from 'react';
import { useDebounce, useDebouncedCallback } from 'use-debounce';

type Pokemon = {
    name: string;
    url: string;
};

type State = {
    loading: boolean;
    pokemonDatabase: Pokemon[];
    searchResults: Pokemon[];
    realTimeSearch: any
};

type Action =
    | { type: "LOADING" }
    | { type: "GET_POKEMON_DATABASE"; payload: Pokemon[] }
    | { type: "GET_SEARCH"; payload: Pokemon[] };

type ContextValue = State;

export const SearchContext = createContext<ContextValue>({
    loading: false,
    pokemonDatabase: [],
    searchResults: [],
    realTimeSearch: () => {}
});

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "LOADING":
            return { ...state, loading: true };

        case "GET_POKEMON_DATABASE":
            return { ...state, pokemonDatabase: action.payload, loading: false };

        case "GET_SEARCH":
            return { ...state, searchResults: action.payload, loading: false };
    }

    return state;
};

type SearchProviderProps = {
    children: ReactNode;
};

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }: SearchProviderProps) => {
    const initialState: State = {
        loading: false,
        pokemonDatabase: [],
        searchResults: [],
        realTimeSearch: () => {}
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const getPokemonDatabase = async () => {
        const baseUrl = "https://pokeapi.co/api/v2/";

        dispatch({ type: "LOADING" });

        const res = await fetch(`${baseUrl}pokemon?limit=100000&offset=0`);
        const data = await res.json();

        dispatch({ type: "GET_POKEMON_DATABASE", payload: data.results });
    };

    const realTimeSearch = useDebouncedCallback((search: string) => {
        dispatch({ type: "LOADING" });
        const res = state.pokemonDatabase.filter((pokemon) => {
          return pokemon.name.includes(search.toLowerCase());
        }).slice(0, 5);
        dispatch({ type: "GET_SEARCH", payload: [...res] });
      }, 500);

    useEffect(() => {
        getPokemonDatabase();
    }, []);

    return (
        <SearchContext.Provider value={{ ...state, realTimeSearch }}>
            <div>{children}</div>
        </SearchContext.Provider>
    );
};


export const useSearchContext = () => {
    return useContext(SearchContext);
  };