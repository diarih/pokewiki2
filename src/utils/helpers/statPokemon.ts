const types = [
    {
        "name": "hp",
        "color": "progress-success",
    },
    {
        "name": "attack",
        "color": "progress-error",
    },
    {
        "name": "defense",
        "color": "progress-accent",
    },
    {
        "name": "special-attack",
        "color": "progress-info",
    },
    {
        "name": "special-defense",
        "color": "progress-warning",
    },
]

export function statPokemon(stateName: string) {

    const match = types.find((item) => item.name === stateName);

    const color = match ? match.color : null;

    return color
}