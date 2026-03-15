import { useState } from 'react'
import './index.css'
import Landing from './pages/Landing'
import Catalog from './pages/Catalog'
import GenreWorld from './pages/GenreWorld'
import SearchResults from './pages/SearchResults'
import { genres } from './data/genres'
import { useHashRouter } from './hooks/useHashRouter'

export default function App() {
  const { route, navigate } = useHashRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleSearch = (q: string) => {
    navigate('search', { q })
  }

  const goHome = () => navigate('landing')
  const goCatalog = () => navigate('catalog')
  const goGenre = (id: string) => navigate(id)

  const { page, params } = route

  const selectedGenre = genres.find(g => g.id === page)

  if (selectedGenre) {
    return (
      <GenreWorld
        genre={selectedGenre}
        onBack={goCatalog}
        onHome={goHome}
        onSelectGenre={goGenre}
        onSearch={handleSearch}
      />
    )
  }

  if (page === 'search') {
    return (
      <SearchResults
        query={params.q ?? ''}
        onSelect={goGenre}
        onHome={goHome}
        onSearch={handleSearch}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
    )
  }

  if (page === 'catalog') {
    return (
      <Catalog
        onSelect={goGenre}
        onHome={goHome}
        onSearch={handleSearch}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
    )
  }

  return <Landing onEnter={goCatalog} />
}
