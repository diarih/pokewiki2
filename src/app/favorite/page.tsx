"use client"

import React, { ChangeEvent, useContext } from 'react'
import PokemonCard from '../components/cards/PokemonCard';
import { FavContext } from '@/context/FavContext';

export default function Favorite() {

    const { favPokemon, deleteFav } = useContext(FavContext)

    const onChangeFav = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedData = JSON.parse(e.target.value)
        deleteFav(updatedData.id)
    }

    return (
        <main className="max-w-screen-md bg-neutral py-12 mx-auto flex flex-col gap-8 min-h-screen">
            <section className='flex justify-center flex-col items-center gap-4 mb-12'>
                <div className='text-lg'>My Catched</div>
                <div className='md:text-8xl text-4xl font-black'>Pokemons</div>
            </section>
            <section className='flex md:px-8 justify-center flex-col items-center gap-4 px-2'>
                <div className='grid grid-cols-12 gap-5 w-full'>
                    {favPokemon?.map((project) => (
                        <PokemonCard onChange={onChangeFav} data={project} key={project.id} />
                    ))}
                </div>
            </section>
        </main>
    )
}
