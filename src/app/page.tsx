import Head from './components/sections/Head'
import List from './components/sections/List'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12 bg-neutral min-h-screen">
      <Head />
      <List />
    </main>
  )
}