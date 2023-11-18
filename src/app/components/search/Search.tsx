'use client'

import react, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { useSearchContext } from '@/context/SearchContext'
import Router from 'next/router'

export default function Search() {

    const { loading, searchResults, realTimeSearch } = useSearchContext()

    const [search, setSearch] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);

        realTimeSearch(e.target.value);
    };

    const displaySearchResults = () => {
        return searchResults.map((pokemon: any, index: number) => {
            return (
                <li
                    key={index}
                    className="p-2"
                >
                    <a href={`${pokemon.name}`}>
                        {pokemon.name}
                    </a>
                </li>
            );
        });
    };


    return (
        <>
            <input onChange={handleChange} type="text" placeholder="Find a Pokemon..." className="input input-bordered w-full max-w-xs" />
            {search && searchResults.length > 0 && (
                <ul className="menu bg-base-200 w-full mt-5 rounded-box menu-md">{displaySearchResults()}</ul>
            )}
        </>
    )
}
