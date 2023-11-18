'use client'
import { loadFromLocalStorage, saveToLocalStorage } from '@/utils/helpers/favorite';
import React, { useEffect } from 'react'
import { createContext, useState } from 'react'

type FavContextType = {
    favPokemon: Pokemon[];
    addFav: (newFav: Pokemon) => void;
    deleteFav: (id: number | string) => void;
  };
  
  // Create the context with the specified type
  export const FavContext = createContext<FavContextType>({
    favPokemon: [],
    addFav: () => {},
    deleteFav: () => {}
  });


export const FavProvider = ({children}: {children: React.ReactNode}) => {

    const [favPokemon, setFavPokemon] = useState<Array<Pokemon>>([]);

    const addFav = (newFav: Pokemon) => {
        if (!favPokemon.some((fav) => fav.id === newFav.id)) {
            setFavPokemon([...favPokemon, newFav]);
        } else {
            deleteFav(newFav.id)
        }
    }

    const deleteFav = (id: number | string) => {
        const updatedFavs =  favPokemon.filter((post) => post.id !== id);
        setFavPokemon(updatedFavs);
    }

    useEffect(() => {
        setFavPokemon(loadFromLocalStorage("favPokemon"))
    }, [])

    useEffect(() => {
        saveToLocalStorage("favPokemon", favPokemon)
    }, [favPokemon])

    return (
        <FavContext.Provider value={{favPokemon, addFav, deleteFav}}>
            <div>{children}</div>
        </FavContext.Provider>
    )
}