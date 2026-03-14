import { useState } from 'react'
import './index.css'
import Catalog from './pages/Catalog'
import GenreWorld from './pages/GenreWorld'
import { genres } from './data/genres'

export default function App() {
  const [currentPage, setCurrentPage] = useState<string | null>(null)

  const selectedGenre = genres.find(g => g.id === currentPage)

  if (selectedGenre) {
    return <GenreWorld genre={selectedGenre} onBack={() => setCurrentPage(null)} />
  }

  return <Catalog onSelect={(id) => setCurrentPage(id)} />
}
