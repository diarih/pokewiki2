const types = [
    {
        "name": "normal",
        "bg_color": "bg-cyan-600",
        "text_color": "text-neutral-300"
    },
    {
        "name": "fighting",
        "bg_color": "bg-red-600",
        "text_color": "text-neutral-300"
    },
    {
        "name": "flying",
        "bg_color": "bg-purple-600",
        "text_color": "text-neutral-300"
    },
    {
        "name": "poison",
        "bg_color": "bg-green-800",
        "text_color": "text-neutral-300"
    },
    {
        "name": "ground",
        "bg_color": "bg-orange-600",
        "text_color": "text-neutral-300"
    },
    {
        "name": "rock",
        "bg_color": "bg-stone-600",
        "text_color": "text-neutral-300"
    },
    {
        "name": "bug",
        "bg_color": "bg-amber-600",
        "text_color": "text-neutral-300"
    },
    {
        "name": "ghost",
        "bg_color": "bg-stone-800",
        "text_color": "text-neutral-300"
    },
    {
        "name": "steel",
        "bg_color": "bg-stone-700",
        "text_color": "text-neutral-300"
    },
    {
        "name": "fire",
        "bg_color": "bg-red-600",
        "text_color": "text-neutral-300"
    },
    {
        "name": "water",
        "bg_color": "bg-blue-600",
        "text_color": "text-neutral-300"
    },
    {
        "name": "grass",
        "bg_color": "bg-green-600",
        "text_color": "text-neutral-300"
    },
    {
        "name": "electric",
        "bg_color": "bg-yellow-700",
        "text_color": "text-neutral-300"
    },
    {
        "name": "psychic",
        "bg_color": "bg-zinc-600",
        "text_color": "text-neutral-300"
    },
    {
        "name": "ice",
        "bg_color": "bg-cyan-600",
        "text_color": "text-neutral-300"
    },
    {
        "name": "dragon",
        "bg_color": "bg-red-800",
        "text_color": "text-neutral-300"
    },
    {
        "name": "dark",
        "bg_color": "bg-neutral-800",
        "text_color": "text-neutral-300"
    },
    {
        "name": "fairy",
        "bg_color": "bg-green-400",
        "text_color": "text-neutral-300"
    },
    {
        "name": "unknown",
        "bg_color": "bg-cyan-600",
        "text_color": "text-neutral-300"
    },
    {
        "name": "shadow",
        "bg_color": "bg-gray-600",
        "text_color": "text-neutral-300"
    }
]

export function matchType(type: string) {

    const match = types.find((item) => item.name === type);

    return match || {
        name: "pokemon",
        bg_color: "bg-cyan-600",
        text_color: "text-neutral-300"
    }
}