'use client'

import { FavContext } from '@/context/FavContext'
import React, { ChangeEvent, useContext } from 'react'

export default function Favorite({ data }: { data: Pokemon }) {

    const { favPokemon, addFav } = useContext(FavContext)

    const onChangeFav = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedData = JSON.parse(e.target.value)
        addFav(updatedData)
    }

    const checked = favPokemon.some((fav) => fav.id === data.id)

    return (
        <input checked={checked} value={JSON.stringify(data)} onChange={onChangeFav} type="checkbox" aria-label={`${checked ? 'Catched' : 'Catch'}`} className="btn capitalize" />
    )
}
