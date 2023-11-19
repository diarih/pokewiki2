import { FavContext } from "@/context/FavContext";
import Image from "next/image";
import { useContext } from "react";
import Favorite from "./components/favorite";
import { statPokemon } from "@/utils/helpers/statPokemon";

interface About {
    about: string
}

async function getAbout(url: string) {
    const res = await fetch(url)
    const data = await res.json();
    return data;
}

async function getPokemon(slug: string | number): Promise<Pokemon & About> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`)
    const pokemon = await res.json();
    const species = await getAbout(pokemon.species.url)

    const about: string = species.flavor_text_entries[0].flavor_text

    return {
        ...pokemon,
        about
    };
}


export default async function asyPage({ params }: { params: { slug: string } }) {

    const data = await getPokemon(params.slug)

    const image = data.sprites.other["official-artwork"].front_default
    const imageAlt = data.sprites.other.dream_world.front_default

    return (
        <>
            <section className="flex flex-col gap-2 justify-center items-center">
                <div>#{data.id}</div>
                <div className="capitalize font-semibold text-4xl">{data.name}</div>
            </section>
            <section className="mt-12">
                <div style={{ height: 200 }} className='rounded w-full flex justify-center items-center'>
                    <div className='relative' style={{ height: 250, width: 250 }}>
                        <Image priority sizes='250' alt="pokemon" fill src={image || imageAlt || '/images/pokeball.png'} />
                    </div>
                </div>
            </section>
            <section className="p-4 flex flex-col gap-8">
                <div className="flex flex-row gap-2">
                    <p className="w-full rounded-xl bg-neutral-focus py-3 px-6">
                        {data.about}
                    </p>
                    <Favorite data={data} />
                </div>

                <div className="flex w-full">
                    <div className="flex justify-center h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                        <div className="text-xl font-black capitalize">
                            {
                                data.types.map((e, i: number) => {
                                    return <span key={i}>{e.type.name} </span>
                                })
                            }
                        </div>
                        <div className="text-xs">
                            Types
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex justify-center h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                        <div className="text-xl font-black">{Number(data.weight) / 10}kg</div>
                        <div className="text-xs">
                            Weight
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex justify-center h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                        <div className="text-xl font-black">{Number(data.height) / 10}m</div>
                        <div className="text-xs font-semibold">
                            Height
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                    {data.stats.map((e, i: number) => {
                        const colorStat = statPokemon(e.stat.name)
                        return (
                            <div key={i}>
                                <div className="flex justify-between">
                                    <div className="capitalize">
                                        {e.stat.name}
                                    </div>
                                    <div>
                                        {e.base_stat}
                                    </div>
                                </div>
                                <progress className={`progress w-full ${colorStat}`} value={e.base_stat} max="100"></progress>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}