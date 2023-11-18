import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'PokeWiki',
    description: 'My Pokemon',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="max-w-screen-md bg-neutral py-12 mx-auto flex flex-col gap-8 min-h-screen">
            {children}
        </main>
    )
}
