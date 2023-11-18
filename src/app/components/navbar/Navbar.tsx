'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    
    const pathname = usePathname()

    const isHome = pathname === '/'

    const backButton = (
        <a href="/">
            <button className="btn capitalize btn-neutral">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
                Back to Home
            </button>
        </a>
    )

    return (
        <div className="navbar bg-base-300">
            <div className="navbar-start">
                {!isHome && backButton}
            </div>
            <div className="navbar-center">
                <a href="/" className="btn btn-ghost normal-case text-xl">PokeWiki</a>
            </div>
            <div className="navbar-end">
            </div>
        </div>
    )
}
