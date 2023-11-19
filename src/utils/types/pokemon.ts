interface PokemonAbility {
    isHidden: boolean,
    slot: number,
    ability: any
}

interface VersionGameIndex {
}

interface PokemonHeldItem {
}

interface LocationAreaEncounters {
}

interface PokemonMove {
}

interface PokemonTypePast {
    generation: any
    types: any
}

interface PokemonSprites {
    front_default?: string
    front_shiny?: string
    other: any
}

interface NamedAPIResource {
}

interface PokemonStat {
    stat: {
        name: string
    }
    base_stat: string
}

interface PokemonType {
    slot: number,
    type: any
}

interface PokemonSpecies {
}

interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: PokemonAbility[];
    forms: NamedAPIResource[];
    game_indices: VersionGameIndex[];
    held_items: PokemonHeldItem[];
    location_area_encounters: LocationAreaEncounters;
    moves: PokemonMove[];
    past_types: PokemonTypePast[];
    sprites: PokemonSprites;
    species: NamedAPIResource;
    stats: PokemonStat[];
    types: PokemonType[];
}

interface PokemonsResult {
    name: number,
    url: string
}

interface PokemonResultType {
    pokemon: PokemonsResult
}

interface Pokemons {
    count: number,
    next: string | null,
    previous: string | null,
    results: PokemonsResult[]
}