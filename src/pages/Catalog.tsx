import { useState, useEffect } from 'react'
import { genres, categories, galleryImages, graphicalStyles, type GalleryImage } from '../data/genres'
import NavBar from '../components/NavBar'

function getStoredColumns(): number {
  try { return parseInt(localStorage.getItem('coalesce_catalog_density') ?? '4') || 4 } catch { return 4 }
}

type Props = {
  onSelect: (id: string) => void
  onHome: () => void
  onSearch: (query: string) => void
  selectedCategory: string
  onSelectCategory: (id: string) => void
}

const COLUMN_OPTIONS = [3, 4, 5]

function navigableGenre(img: GalleryImage): string {
  return (
    img.genres.find(gid => genres.find(g => g.id === gid)?.status === 'available') ??
    img.genres[0]
  )
}

function MasonryTile({ img, onClick }: { img: GalleryImage; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  const primaryGenreId = navigableGenre(img)
  const primaryGenre = genres.find(g => g.id === primaryGenreId)
  const styleObj = graphicalStyles.find(s => s.id === img.style)

  const crossGenres = img.genres
    .filter(gid => gid !== primaryGenreId)
    .map(gid => ({ id: gid, genre: genres.find(g => g.id === gid) }))
    .filter(({ genre }) => genre !== undefined)

  return (
    <div
      className="masonry-tile"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        background: 'var(--bg-card)',
        overflow: 'hidden',
      }}
    >
      <img
        src={img.src}
        alt={img.title ?? primaryGenre?.name ?? ''}
        style={{ width: '100%', display: 'block' }}
        loading="lazy"
      />

      {/* Hover overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.18s ease',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 14px 14px',
        }}>
          {/* Genre name */}
          <div style={{
            fontSize: '13px',
            fontFamily: 'Georgia, serif',
            color: '#e8e8e8',
            marginBottom: styleObj ? '6px' : '0',
            lineHeight: 1.3,
          }}>
            {primaryGenre?.name ?? primaryGenreId}
          </div>

          {/* Style badge */}
          {styleObj && (
            <div style={{
              display: 'inline-block',
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--tag-text)',
              background: 'var(--tag-bg)',
              padding: '3px 8px',
              borderRadius: '3px',
              marginBottom: crossGenres.length > 0 ? '8px' : '0',
            }}>
              {styleObj.name}
            </div>
          )}

          {/* Cross-genre "Also in" */}
          {crossGenres.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
              <span style={{ fontSize: '9px', color: 'var(--tag-text)', letterSpacing: '0.08em', textTransform: 'uppercase', alignSelf: 'center' }}>
                Also in
              </span>
              {crossGenres.map(({ id, genre }) => {
                const available = genre!.status === 'available'
                return (
                  <span
                    key={id}
                    style={{
                      fontSize: '9px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: available ? 'var(--accent)' : 'var(--text-faint)',
                      opacity: available ? 1 : 0.5,
                      padding: '2px 6px',
                      border: `1px solid ${available ? 'var(--accent-dim)' : 'var(--border)'}`,
                      borderRadius: '3px',
                    }}
                  >
                    {genre!.name}
                  </span>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Catalog({ onSelect, onHome, onSearch, selectedCategory, onSelectCategory }: Props) {
  const [columns, setColumns] = useState(getStoredColumns)
  const [styleFilter, setStyleFilter] = useState('all')

  // Reset style filter when category changes
  useEffect(() => {
    setStyleFilter('all')
  }, [selectedCategory])

  const changeColumns = (n: number) => {
    setColumns(n)
    try { localStorage.setItem('coalesce_catalog_density', String(n)) } catch {}
  }

  const currentCategory = categories.find(c => c.id === selectedCategory)

  // Images visible under current category filter
  const categoryFiltered = galleryImages.filter(img =>
    selectedCategory === 'all' ||
    img.genres.some(gid => genres.find(g => g.id === gid)?.category === selectedCategory)
  )

  // Style pills available for current category
  const availableStyleIds = ['all', ...new Set(
    categoryFiltered
      .map(img => img.style)
      .filter((s): s is string => Boolean(s))
  )]

  // Final visible images — category + style, featured first
  const visible = categoryFiltered
    .filter(img => styleFilter === 'all' || img.style === styleFilter)
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      <NavBar onHome={onHome} onSearch={onSearch} />

      <div style={{ flex: 1, overflowY: 'auto' as const, padding: '32px 48px 80px' }}>

        {/* Heading */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '8px' }}>
            {selectedCategory === 'all' ? 'All Genres' : 'Category'}
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

        {/* Category pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div className="no-scrollbar" style={{
            display: 'flex', gap: '8px', flex: 1, overflowX: 'auto',
            paddingBottom: '2px', scrollbarWidth: 'none', msOverflowStyle: 'none',
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
                    fontSize: '11px', letterSpacing: '0.06em',
                    padding: '6px 16px', borderRadius: '100px',
                    cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
                  }}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Style pills + column control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <div className="no-scrollbar" style={{
            display: 'flex', gap: '6px', flex: 1, overflowX: 'auto',
            paddingBottom: '2px', scrollbarWidth: 'none', msOverflowStyle: 'none',
          } as React.CSSProperties}>
            {availableStyleIds.map(sid => {
              const active = styleFilter === sid
              const label = sid === 'all'
                ? 'All Styles'
                : (graphicalStyles.find(s => s.id === sid)?.name ?? sid)
              return (
                <button
                  key={sid}
                  onClick={() => setStyleFilter(sid)}
                  style={{
                    background: active ? 'var(--accent-subtle)' : 'none',
                    border: `1px solid ${active ? 'var(--accent-dim)' : 'var(--border)'}`,
                    color: active ? 'var(--accent)' : 'var(--text-pill-inactive)',
                    fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '5px 14px', borderRadius: '100px',
                    cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Column count toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, marginLeft: '16px' }}>
            <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'var(--text-faint)', textTransform: 'uppercase', marginRight: '4px' }}>
              Columns
            </span>
            {COLUMN_OPTIONS.map(n => (
              <button
                key={n}
                onClick={() => changeColumns(n)}
                style={{
                  background: columns === n ? 'var(--accent-subtle)' : 'none',
                  border: `1px solid ${columns === n ? 'var(--accent-dim)' : 'var(--border)'}`,
                  color: columns === n ? 'var(--accent)' : 'var(--text-faint)',
                  width: '28px', height: '28px', borderRadius: '4px',
                  cursor: 'pointer', fontSize: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry wall */}
        {visible.length > 0 ? (
          <div className="masonry-wall" style={{ columns }}>
            {visible.map(img => (
              <MasonryTile
                key={img.id}
                img={img}
                onClick={() => onSelect(navigableGenre(img))}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-faint)', fontSize: '13px', fontStyle: 'italic' }}>
            No images match this combination.
          </div>
        )}
      </div>
    </div>
  )
}
