import { matchType } from '@/utils/helpers/typePokemon'
import React from 'react'

export default function LabelTypePokemon({
    children,
    typePokemon
}: {
    children: React.ReactNode
    typePokemon: string
}) {

    const {bg_color, text_color} = matchType(typePokemon)
    
    return (
        <div className={`badge font-semibold text-xs capitalize ${bg_color} ${text_color}`}>{children}</div>
    )
}
