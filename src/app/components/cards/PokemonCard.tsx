import { FavContext } from '@/context/FavContext'
import Image from 'next/image'
import React, { ChangeEvent, useContext } from 'react'
import LabelTypePokemon from '../labels/LabelTypePokemon'

interface PokemonCardType {
    data: Pokemon
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function PokemonCard({ data, onChange }: PokemonCardType) {

    const { favPokemon } = useContext(FavContext)

    const image = data.sprites.other["official-artwork"].front_default
    const imageAlt = data.sprites.other.dream_world.front_default

    const checked = favPokemon.some((fav) => fav.id === data.id)

    const cardBody = (
        <a href={`/${data.id}`}>
            <div style={{ height: 200 }} className='bg-base-300 rounded w-full p-4 flex justify-center items-center'>
                <div className='relative' style={{ height: 150, width: 150 }}>
                    <Image sizes='150' alt="pokemon" fill src={image || imageAlt || '/images/pokeball.png'} />
                </div>
            </div>
            <div className='p-4'>
                <div className='text-xs font-semibold mb-3'>
                    #{data.id}
                </div>
                <div>
                    <div className='text-xl font-semibold mb-2 capitalize'>{data.name}</div>
                    <div className='flex items-center gap-2'>
                        {
                            data.types.map((type, c: number) => {
                                const typePokemon = type.type.name
                                return (
                                    <LabelTypePokemon key={c} typePokemon={typePokemon}>
                                        {typePokemon}
                                    </LabelTypePokemon>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </a>
    )

    return (
        <article className='md:col-span-3 col-span-6 flex flex-col gap-3 rounded bg-base-200'>
            {cardBody}
            <input checked={checked} value={JSON.stringify(data)} onChange={onChange} type="checkbox" aria-label={`${checked ? 'Catched' : 'Catch'}`} className="btn rounded-none capitalize" />
        </article>
    )
}