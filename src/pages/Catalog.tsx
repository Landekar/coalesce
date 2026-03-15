import { useState } from 'react'
import { genres, categories } from '../data/genres'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar'
import GenreCard from '../components/GenreCard'

function getStoredDensity(): number {
  try { return parseInt(localStorage.getItem('luma_catalog_density') ?? '5') || 5 } catch { return 5 }
}

type Props = {
  onSelect: (id: string) => void
  onHome: () => void
  onSearch: (query: string) => void
  selectedCategory: string
  onSelectCategory: (id: string) => void
}

const DENSITY_OPTIONS = [2, 3, 4, 5]

// Categories that have at least one genre (excluding 'all')
const activeCats = categories.filter(c => c.id !== 'all' && genres.some(g => g.category === c.id))

export default function Catalog({ onSelect, onHome, onSearch, selectedCategory, onSelectCategory }: Props) {
  const [density, setDensity] = useState(getStoredDensity)

  const changeDensity = (n: number) => {
    setDensity(n)
    try { localStorage.setItem('luma_catalog_density', String(n)) } catch {}
  }

  const currentCategory = categories.find(c => c.id === selectedCategory)
  const isAll = selectedCategory === 'all'

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

        <div style={{ flex: 1, overflowY: 'auto' as const, padding: '32px 48px 80px' }}>
          {/* Heading */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '8px' }}>
              {isAll ? 'All Genres' : 'Category'}
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 300, fontFamily: 'Georgia, serif', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
              {currentCategory?.name ?? 'All Genres'}
            </h1>
            {currentCategory?.description && (
              <p style={{ fontSize: '14px', color: 'var(--text-dim)', marginTop: '8px', fontStyle: 'italic' }}>
                {currentCategory.description}
              </p>
            )}
          </div>

          {/* Category pills + density control */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px', gap: '8px' }}>
            {/* Pills */}
            <div className="no-scrollbar" style={{
              display: 'flex',
              gap: '8px',
              flex: 1,
              overflowX: 'auto',
              paddingBottom: '2px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            } as React.CSSProperties}>
              {categories.map(cat => {
                const active = selectedCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    style={{
                      background: active ? 'var(--bg-pill-active)' : 'none',
                      border: `1px solid ${active ? 'var(--bg-pill-active)' : 'var(--border)'}`,
                      color: active ? 'var(--text-on-pill)' : 'var(--text-pill-inactive)',
                      fontSize: '11px',
                      letterSpacing: '0.06em',
                      padding: '6px 16px',
                      borderRadius: '100px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s',
                    }}
                  >
                    {cat.name}
                  </button>
                )
              })}
            </div>

            {/* Density */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, marginLeft: '16px' }}>
              <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'var(--text-faint)', textTransform: 'uppercase', marginRight: '4px' }}>
                Columns
              </span>
              {DENSITY_OPTIONS.map(n => (
                <button
                  key={n}
                  onClick={() => changeDensity(n)}
                  style={{
                    background: density === n ? 'var(--accent-subtle)' : 'none',
                    border: `1px solid ${density === n ? 'var(--accent-dim)' : 'var(--border)'}`,
                    color: density === n ? 'var(--accent)' : 'var(--text-faint)',
                    width: '28px',
                    height: '28px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s',
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Grouped "All" view */}
          {isAll && activeCats.map(cat => {
            const catGenres = genres.filter(g => g.category === cat.id)
            if (catGenres.length === 0) return null
            return (
              <div key={cat.id} style={{ marginBottom: '48px' }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 300,
                  fontFamily: 'Georgia, serif',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.04em',
                  marginBottom: '20px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--border)',
                }}>
                  {cat.name}
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${density}, 1fr)`,
                  gap: density >= 4 ? '10px' : '16px',
                }}>
                  {catGenres.map(genre => (
                    <GenreCard key={genre.id} genre={genre} onClick={() => onSelect(genre.id)} compact={density >= 4} />
                  ))}
                </div>
              </div>
            )
          })}

          {/* Filtered single-category view */}
          {!isAll && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${density}, 1fr)`,
              gap: density >= 4 ? '10px' : '16px',
            }}>
              {genres.filter(g => g.category === selectedCategory).map(genre => (
                <GenreCard key={genre.id} genre={genre} onClick={() => onSelect(genre.id)} compact={density >= 4} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
