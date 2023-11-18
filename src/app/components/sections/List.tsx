'use client'

import React, { ChangeEvent, useContext, useState } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import Loading from '@/app/loading'
import { useInView } from 'react-intersection-observer'
import PokemonCard from '../cards/PokemonCard'
import { FavContext } from '@/context/FavContext'

interface PokeType {
    pokemon: []
}

async function getPokemons(pageparam: number = 0, queryKey: [string]) {
    const type = queryKey[0]

    if (type === '' || type === 'all') {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${pageparam}`)
        const pokemons: Pokemons = await res.json();
        const data = await getPokemon(pokemons.results)
        return data;
    }

    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
    const pokeType: PokeType = await res.json();
    const data = await getPokemon(pokeType.pokemon, type)
    return data

}

async function getPokemon(
    res: Array<PokemonResultType | PokemonsResult>,
    type?: string
): Promise<Array<Pokemon>> {
    const filteredRes = type
        ? res.filter((item) => 'pokemon' in item)
        : res;

    const detail = await Promise.all(filteredRes.map(async (item) => {
        const itemUrl = 'pokemon' in item ? item.pokemon.url : item.url;
        const res = await fetch(itemUrl);
        const pokemons = await res.json();
        return pokemons;
    }));

    return detail;
}

async function getTypePokemon() {
    const res = await fetch(`https://pokeapi.co/api/v2/type`)
    const data: Pokemons = await res.json();
    return data;
}

export default function List() {

    const { ref, inView } = useInView()

    const [type, setType] = useState("all")

    const { favPokemon, addFav } = useContext(FavContext)

    const { data: typeData } = useQuery(
        'type',
        getTypePokemon
    )

    const {
        status,
        data,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        type,
        ({ pageParam = 0, queryKey }) => getPokemons(pageParam, queryKey),
        {
            getNextPageParam: (lastPage) => {

                if (lastPage && lastPage.length > 0 && type === 'all') {
                    const lastPokemonId = lastPage[lastPage.length - 1].id;
                    const nextOffset = lastPokemonId;

                    return nextOffset;
                }
                return undefined;
            },
        }
    )

    const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value)
    }

    const onChangeFav = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedData = JSON.parse(e.target.value)
        addFav(updatedData)
    }

    React.useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView])


    return (
        <section className='flex md:px-8 justify-center flex-col items-center gap-4'>
            <div className='w-full flex items-center justify-between'>
                <a href="/favorite">
                    <button className="btn btn-primary capitalize">My Pokemon</button>
                </a>
                <div className='flex items-center gap-3'>
                    <div className='whitespace-nowrap hidden md:block'>Monster Type</div>
                    <select onChange={onChangeType} defaultValue={type} className="select select-bordered w-full max-w-xs">
                        <option value={'all'}>All Type</option>
                        {
                            typeData?.results.map((e, i) => {
                                return <option key={i} value={e.name} className='capitalize'>{e.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>

            {
                status === 'loading' ?
                    <Loading /> : (
                        <>
                            <div className='grid grid-cols-12 gap-5 w-full'>
                                {data?.pages.map((page, i: number) => (
                                    <React.Fragment key={i}>
                                        {page?.map((project) => (
                                            <PokemonCard onChange={onChangeFav} data={project} key={project.id} />
                                        ))}
                                    </React.Fragment>
                                ))}
                            </div>
                            <div>
                                <button
                                    ref={ref}
                                    onClick={() => fetchNextPage()}
                                    disabled={!hasNextPage || isFetchingNextPage}
                                >
                                    {isFetchingNextPage
                                        ? 'Loading more...'
                                        : hasNextPage
                                            ? 'Load Newer'
                                            : 'Nothing more to load'}
                                </button>
                            </div>
                        </>
                    )
            }
        </section>
    )
}
