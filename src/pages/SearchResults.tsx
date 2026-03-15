import { useState } from 'react'
import type { Genre } from '../data/genres'
import { genres, categories } from '../data/genres'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar'
import GenreCard from '../components/GenreCard'

type ReferenceMatch = { genre: Genre; analogue: { title: string; medium: string; note: string } }

type Props = {
  query: string
  onSelect: (id: string) => void
  onHome: () => void
  onSearch: (query: string) => void
  selectedCategory: string
  onSelectCategory: (id: string) => void
}

const sectionLabel: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '0.2em',
  color: 'var(--text-faint)',
  textTransform: 'uppercase',
  marginBottom: '20px',
  paddingBottom: '12px',
  borderBottom: '1px solid var(--border)',
}

function getStoredDensity(): number {
  try { return parseInt(localStorage.getItem('luma_catalog_density') ?? '5') || 5 } catch { return 5 }
}

export default function SearchResults({ query, onSelect, onHome, onSearch, selectedCategory, onSelectCategory }: Props) {
  const [density] = useState(getStoredDensity)
  const q = query.toLowerCase()

  const genreMatches = genres.filter(g =>
    g.name.toLowerCase().includes(q) ||
    g.tagline.toLowerCase().includes(q) ||
    g.description.toLowerCase().includes(q) ||
    g.category.toLowerCase().includes(q)
  )
  const genreMatchIds = new Set(genreMatches.map(g => g.id))

  const referenceMatches: ReferenceMatch[] = []
  genres.forEach(g => {
    if (genreMatchIds.has(g.id)) return
    g.analogues.forEach(a => {
      if (a.title.toLowerCase().includes(q)) {
        referenceMatches.push({ genre: g, analogue: a })
      }
    })
  })

  const totalResults = genreMatches.length + referenceMatches.length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      <NavBar onHome={onHome} onSearch={onSearch} />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar
          mode="catalog"
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />

        <div style={{ flex: 1, overflowY: 'auto' as const, padding: '40px 48px 80px' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '8px' }}>
              {totalResults > 0 ? `${totalResults} result${totalResults === 1 ? '' : 's'}` : 'No results'}
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 300, fontFamily: 'Georgia, serif', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
              {query}
            </h1>
          </div>

          {/* Art Directions — direct genre keyword matches */}
          {genreMatches.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <div style={sectionLabel}>Art Directions</div>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${density}, 1fr)`, gap: '16px' }}>
                {genreMatches.map(g => (
                  <GenreCard key={g.id} genre={g} onClick={() => onSelect(g.id)} />
                ))}
              </div>
            </div>
          )}

          {/* Referenced In — reverse lookup: game/work → genre */}
          {referenceMatches.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <div style={sectionLabel}>Referenced In</div>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${density}, 1fr)`, gap: '16px' }}>
                {referenceMatches.map(({ genre, analogue }, i) => (
                  <div key={`${genre.id}-${i}`}>
                    <GenreCard genre={genre} onClick={() => onSelect(genre.id)} />
                    <div style={{ marginTop: '10px', padding: '0 4px' }}>
                      <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                        via "{analogue.title}"
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-dim)', fontStyle: 'italic', lineHeight: 1.6 }}>
                        {analogue.note}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {totalResults === 0 && (
            <p style={{ fontSize: '14px', color: 'var(--text-dim)', fontStyle: 'italic' }}>
              No genres matched. Try a different keyword.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
