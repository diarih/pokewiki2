'use client'
import { loadFromLocalStorage, saveToLocalStorage } from '@/utils/helpers/favorite';
import React, { useEffect } from 'react'
import { createContext, useState } from 'react'

type FavContextType = {
    favPokemon: Pokemon[];
    addFav: (newFav: Pokemon) => void;
    deleteFav: (id: number | string) => void;
};

export const FavContext = createContext<FavContextType>({
    favPokemon: [],
    addFav: () => { },
    deleteFav: () => { }
});


export const FavProvider = ({ children }: { children: React.ReactNode }) => {

    const [favPokemon, setFavPokemon] = useState<Array<Pokemon>>([]);

    const updateAndSaveFavPokemon = (updatedFavs: Pokemon[]) => {
        setFavPokemon(updatedFavs);
        saveToLocalStorage("favPokemon", updatedFavs);
    };

    const addFav = (newFav: Pokemon) => {
        if (!favPokemon.some((fav) => fav.id === newFav.id)) {
            const updatedFavs = [...favPokemon, newFav];
            updateAndSaveFavPokemon(updatedFavs);
        } else {
            deleteFav(newFav.id);
        }
    };
    
    const deleteFav = (id: number | string) => {
        const updatedFavs = favPokemon.filter((fav) => fav.id !== id);
        updateAndSaveFavPokemon(updatedFavs);
    };

    useEffect(() => {
        const load = loadFromLocalStorage("favPokemon")
        if (load.length > 0) {
            setFavPokemon(load)
        }
    }, [])


    return (
        <FavContext.Provider value={{ favPokemon, addFav, deleteFav }}>
            <div>{children}</div>
        </FavContext.Provider>
    )
}