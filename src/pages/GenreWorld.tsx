import { useState, useEffect, useRef } from 'react'
import type { Genre } from '../data/genres'
import { genres } from '../data/genres'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar'
import Carousel from '../components/Carousel'
import GenreCard from '../components/GenreCard'
import TonePlayer from '../components/TonePlayer'

type Section = 'all' | 'titles' | 'fonts' | 'color' | 'materials' | 'shapes' | 'music'

const SECTIONS: { id: Section; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'titles', label: 'Titles' },
  { id: 'fonts', label: 'Fonts' },
  { id: 'color', label: 'Color' },
  { id: 'materials', label: 'Materials' },
  { id: 'shapes', label: 'Shapes' },
  { id: 'music', label: 'Music' },
]

type Props = {
  genre: Genre
  onBack: () => void
  onHome: () => void
  onSelectGenre: (id: string) => void
  onSearch: (query: string) => void
}

function materialGradient(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('chrome') || n.includes('polish') || n.includes('metal') || n.includes('steel'))
    return 'linear-gradient(135deg, #6a6a6a, #c4c4c4, #5a5a5a, #d0d0d0)'
  if (n.includes('stone') || n.includes('concrete') || n.includes('granite'))
    return 'linear-gradient(135deg, #3a3a3a, #252525, #424242)'
  if (n.includes('wood') || n.includes('oak') || n.includes('timber'))
    return 'linear-gradient(160deg, #5c3a1e, #8b5e2a, #4a2e14)'
  if (n.includes('leather') || n.includes('hide') || n.includes('parch'))
    return 'linear-gradient(135deg, #3d2510, #5c3520, #2a1a0a)'
  if (n.includes('bone') || n.includes('ivory') || n.includes('parchment'))
    return 'linear-gradient(135deg, #e8dcc0, #d4c49a, #c8b888)'
  if (n.includes('velvet') || n.includes('silk') || n.includes('fabric'))
    return 'linear-gradient(135deg, #1a0a2e, #2a1040, #120820)'
  if (n.includes('formica') || n.includes('plastic') || n.includes('synthetic') || n.includes('fiberglass'))
    return 'linear-gradient(135deg, #c8c8b0, #d8d8c0, #b8b8a0)'
  if (n.includes('neon') || n.includes('tube'))
    return 'linear-gradient(135deg, #001825, #002a3a, #003050)'
  if (n.includes('bakelite') || n.includes('amber'))
    return 'linear-gradient(135deg, #3a2010, #5a3418, #2a1808)'
  if (n.includes('moss') || n.includes('lichen') || n.includes('bark') || n.includes('branch'))
    return 'linear-gradient(135deg, #2a3a1a, #3a4a28, #1e2c12)'
  if (n.includes('linen') || n.includes('hemp') || n.includes('woven'))
    return 'linear-gradient(135deg, #c4b89a, #d4c8aa, #b4a888)'
  if (n.includes('rust') || n.includes('iron'))
    return 'linear-gradient(135deg, #5a3520, #3a2010, #6a4028)'
  if (n.includes('rubber') || n.includes('black'))
    return 'linear-gradient(135deg, #1a1a1a, #2a2a2a, #111)'
  if (n.includes('alumin') || n.includes('brushed'))
    return 'linear-gradient(135deg, #888, #b0b0b0, #787878, #c0c0c0)'
  if (n.includes('phosphor') || n.includes('screen') || n.includes('glow'))
    return 'linear-gradient(135deg, #001a10, #003020, #002818)'
  if (n.includes('glass') || n.includes('crystal'))
    return 'linear-gradient(135deg, #1a2530, #2a3540, #101820)'
  return 'linear-gradient(135deg, #1a1a1a, #2a2a2a, #141414)'
}

function waveformBars(name: string): number[] {
  const seed = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return Array.from({ length: 14 }, (_, i) => 15 + ((seed * (i + 3) * 13 + i * 7) % 70))
}

function ShapeIcon({ form }: { form: string }) {
  const n = form.toLowerCase()
  const s = { stroke: 'var(--accent)', strokeWidth: 1.5, fill: 'none' } as const
  if (n.includes('arch') || n.includes('spire') || n.includes('pointed') || n.includes('gothic'))
    return <svg width="48" height="48" viewBox="0 0 48 48"><path d="M8 44 L8 24 Q8 6 24 6 Q40 6 40 24 L40 44" {...s}/></svg>
  if (n.includes('circle') || n.includes('sphere') || n.includes('round') || n.includes('circular') || n.includes('orbit'))
    return <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="18" {...s}/></svg>
  if (n.includes('spiral'))
    return <svg width="48" height="48" viewBox="0 0 48 48"><path d="M24 24 Q30 18 30 24 Q30 34 20 34 Q10 34 10 24 Q10 12 24 12 Q38 12 38 24" {...s}/></svg>
  if (n.includes('triangle') || n.includes('angular') || n.includes('pyramid'))
    return <svg width="48" height="48" viewBox="0 0 48 48"><polygon points="24,6 42,42 6,42" {...s}/></svg>
  if (n.includes('wave') || n.includes('organic') || n.includes('irregular') || n.includes('hand'))
    return <svg width="48" height="48" viewBox="0 0 48 48"><path d="M4 24 Q12 10 20 24 Q28 38 36 24 Q40 17 44 24" {...s}/></svg>
  if (n.includes('cross') || n.includes('cruciform'))
    return <svg width="48" height="48" viewBox="0 0 48 48"><line x1="24" y1="6" x2="24" y2="42" {...s}/><line x1="6" y1="24" x2="42" y2="24" {...s}/></svg>
  if (n.includes('stream') || n.includes('aerodyn') || n.includes('fin') || n.includes('curve'))
    return <svg width="48" height="48" viewBox="0 0 48 48"><path d="M6 24 Q20 8 42 24 Q20 40 6 24 Z" {...s}/></svg>
  if (n.includes('atomic') || n.includes('symbol'))
    return <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="4" {...s}/><ellipse cx="24" cy="24" rx="20" ry="8" {...s}/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(60 24 24)" {...s}/></svg>
  if (n.includes('rect') || n.includes('panel') || n.includes('grid') || n.includes('rack'))
    return <svg width="48" height="48" viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="36" {...s}/><line x1="6" y1="24" x2="42" y2="24" {...s}/><line x1="24" y1="6" x2="24" y2="42" {...s}/></svg>
  if (n.includes('knot') || n.includes('weave') || n.includes('root') || n.includes('branch'))
    return <svg width="48" height="48" viewBox="0 0 48 48"><path d="M8 40 Q16 24 24 16 Q32 8 40 16 Q48 24 40 32 Q32 40 24 32 Q16 24 24 16" {...s}/></svg>
  if (n.includes('worn') || n.includes('smooth') || n.includes('natural'))
    return <svg width="48" height="48" viewBox="0 0 48 48"><path d="M10 34 Q14 28 20 26 Q28 22 34 26 Q40 30 38 36 Q34 42 24 40 Q14 38 10 34 Z" {...s}/></svg>
  // default: diamond
  return <svg width="48" height="48" viewBox="0 0 48 48"><polygon points="24,6 42,24 24,42 6,24" {...s}/></svg>
}

export default function GenreWorld({ genre, onBack, onHome, onSelectGenre, onSearch }: Props) {
  const [activeSection, setActiveSection] = useState<Section>('all')
  const [toneOpen, setToneOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setToneOpen(false)
    setActiveSection('all')
    scrollRef.current?.scrollTo(0, 0)
  }, [genre.id])

  const sameCategory = genres.filter(g => g.category === genre.category && g.id !== genre.id)
  const others = genres.filter(g => g.category !== genre.category)
  const continueGenres = [...sameCategory, ...others].slice(0, 3)

  // Genre navigation: ordered list of all available genres
  const availableGenres = genres.filter(g => g.status === 'available')
  const currentIdx = availableGenres.findIndex(g => g.id === genre.id)
  const prevGenre = availableGenres[(currentIdx - 1 + availableGenres.length) % availableGenres.length]
  const nextGenre = availableGenres[(currentIdx + 1) % availableGenres.length]

  // Game titles only for the titles section
  const gameTitles = genre.analogues.filter(a => a.medium === 'Game')

  const isAll = activeSection === 'all'

  const cardStyle: React.CSSProperties = {
    flexShrink: 0,
    padding: '20px',
    border: '1px solid var(--border-card)',
    background: 'var(--bg-card)',
    minWidth: '180px',
    borderRadius: '8px',
  }

  const gCard: React.CSSProperties = {
    padding: '20px',
    border: '1px solid var(--border-card)',
    background: 'var(--bg-card)',
    borderRadius: '8px',
  }

  function GalleryTitle({ children }: { children: string }) {
    return (
      <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '20px' }}>
        {children}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      <NavBar onHome={onHome} onBack={onBack} backLabel="Catalog" onSearch={onSearch} />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar
          mode="genre"
          genres={sameCategory.length > 0 ? sameCategory : genres.filter(g => g.id !== genre.id).slice(0, 6)}
          currentGenreId={genre.id}
          onSelectGenre={onSelectGenre}
        />

        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto' as const, padding: '0 0 120px' }}>

          {/* HERO */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '420px',
            background: genre.heroImage
              ? `url(${genre.heroImage}) center/cover no-repeat`
              : `linear-gradient(160deg, ${genre.coverColors[0]}, ${genre.coverColors[1]}, ${genre.coverColors.at(2) ?? genre.coverColors[1]})`,
            overflow: 'hidden',
            flexShrink: 0,
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, var(--overlay-medium) 0%, var(--overlay-light) 55%, transparent 100%)',
            }} />
            <div style={{ position: 'absolute', bottom: '48px', left: '48px', right: '45%' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'var(--hero-label)', textTransform: 'uppercase', marginBottom: '16px' }}>
                Genre World
              </div>
              <h1 style={{
                fontSize: '52px',
                fontWeight: 300,
                fontFamily: 'Georgia, serif',
                color: '#e8e8e8',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                marginBottom: '16px',
              }}>
                {genre.name}
              </h1>
              <p style={{ fontSize: '18px', color: 'var(--hero-text)', fontStyle: 'italic', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
                {genre.tagline}
              </p>
              <p style={{ fontSize: '14px', color: 'var(--hero-text-dim)', maxWidth: '480px', lineHeight: 1.8 }}>
                {genre.description}
              </p>
            </div>

            {/* Genre nav arrows + play button — top left of hero */}
            <div style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              zIndex: 2,
            }}>
              {/* Nav arrows */}
              {availableGenres.length > 1 && (
                <>
                  <button
                    onClick={() => onSelectGenre(prevGenre.id)}
                    style={{
                      background: 'rgba(0,0,0,0.4)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: 'rgba(255,255,255,0.6)',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                  >{'\u25C0'}</button>
                  <button
                    onClick={() => onSelectGenre(nextGenre.id)}
                    style={{
                      background: 'rgba(0,0,0,0.4)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: 'rgba(255,255,255,0.6)',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                  >{'\u25B6'}</button>
                </>
              )}

              {/* Play button */}
              {genre.setTheTone.tracks.length > 0 && (
                <button
                  onClick={() => setToneOpen(!toneOpen)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: `1px solid ${toneOpen ? 'var(--accent-dim)' : 'rgba(255,255,255,0.15)'}`,
                    background: toneOpen ? 'var(--accent-subtle)' : 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--accent)',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s',
                  }}
                >
                  {toneOpen ? '\u23F9' : '\u266B'}
                </button>
              )}
            </div>
          </div>

          {/* Atmospheric audio player — slides in below hero */}
          <TonePlayer
            tracks={genre.setTheTone.tracks}
            open={toneOpen}
            onClose={() => setToneOpen(false)}
          />

          <div style={{ padding: '0 48px' }}>

            {/* Constituents header + section filter pills */}
            <div style={{ paddingTop: '36px', marginBottom: '36px' }}>
              <div style={{
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: 'var(--text-faint)',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Constituents
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {SECTIONS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    style={{
                      background: activeSection === s.id ? 'var(--bg-pill-active)' : 'var(--bg-pill)',
                      border: activeSection === s.id ? '1px solid var(--bg-pill-active)' : '1px solid var(--border-strong)',
                      color: activeSection === s.id ? 'var(--text-on-pill)' : 'var(--text-pill-inactive)',
                      borderRadius: '999px',
                      padding: '10px 24px',
                      fontSize: '12px',
                      letterSpacing: '0.06em',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontWeight: activeSection === s.id ? 600 : 400,
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Abstract — visible only when "All" is selected */}
            {isAll && genre.abstract && (
              <div style={{ marginBottom: '48px' }}>
                <div style={{
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  color: 'var(--text-faint)',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--border)',
                }}>
                  Abstract
                </div>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.9,
                  maxWidth: '720px',
                }}>
                  {genre.abstract}
                </p>
              </div>
            )}

            {/* TITLES — video game titles, grouped with screenshots */}
            {(isAll || activeSection === 'titles') && gameTitles.length > 0 && (isAll ? (
              <Carousel title="Titles">
                {gameTitles.map((a, i) => {
                  const imgs = a.images ?? (a.image ? [a.image] : [])
                  return (
                    <div key={i} style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ fontSize: '12px', letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 500 }}>
                        {a.title}
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        {imgs.length > 0 ? imgs.map((img, j) => (
                          <div key={j} style={{
                            width: '540px',
                            height: '340px',
                            background: `url(${img}) center/cover no-repeat`,
                            borderRadius: '8px',
                            border: '1px solid var(--border-card)',
                          }} />
                        )) : (
                          <div style={{
                            width: '540px',
                            height: '340px',
                            background: `linear-gradient(135deg, ${genre.coverColors[0]}, ${genre.coverColors[1] ?? genre.coverColors[0]})`,
                            borderRadius: '8px',
                            border: '1px solid var(--border-card)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <span style={{ fontSize: '11px', color: 'var(--text-faint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>No screenshots</span>
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.6, maxWidth: `${Math.max(imgs.length, 1) * 552}px` }}>
                        {a.note}
                      </div>
                    </div>
                  )
                })}
              </Carousel>
            ) : (
              <div style={{ marginBottom: '48px' }}>
                <GalleryTitle>Titles</GalleryTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  {gameTitles.map((a, i) => {
                    const imgs = a.images ?? (a.image ? [a.image] : [])
                    return (
                      <div key={i}>
                        <div style={{ fontSize: '13px', letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 500, marginBottom: '16px' }}>
                          {a.title}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '12px' }}>
                          {imgs.length > 0 ? imgs.map((img, j) => (
                            <div key={j} style={{
                              width: '100%',
                              aspectRatio: '16 / 10',
                              background: `url(${img}) center/cover no-repeat`,
                              borderRadius: '10px',
                              border: '1px solid var(--border-card)',
                            }} />
                          )) : Array.from({ length: 4 }).map((_, j) => (
                            <div key={j} style={{
                              width: '100%',
                              aspectRatio: '16 / 10',
                              background: `linear-gradient(135deg, ${genre.coverColors[0]}, ${genre.coverColors[1] ?? genre.coverColors[0]})`,
                              borderRadius: '10px',
                              border: '1px solid var(--border-card)',
                            }} />
                          ))}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.6, maxWidth: '600px' }}>
                          {a.note}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {/* FONTS */}
            {(isAll || activeSection === 'fonts') && (isAll ? (
              <Carousel title="Fonts">
                {[
                  { font: genre.typography.primary, role: 'Primary' },
                  { font: genre.typography.secondary, role: 'Secondary' },
                ].map(({ font, role }) => (
                  <div key={role} style={{ ...cardStyle, minWidth: '260px', padding: '28px 24px' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '20px' }}>{role}</div>
                    <div style={{ fontSize: '26px', fontFamily: font, color: 'var(--text-primary)', letterSpacing: '0.04em', marginBottom: '10px', lineHeight: 1.1 }}>{font}</div>
                    <div style={{ fontSize: '14px', fontFamily: font, color: 'var(--text-tertiary)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '16px' }}>{genre.typography.specimenPhrase}</div>
                    <div style={{ fontSize: '10px', letterSpacing: '0.08em', color: 'var(--text-faint)', borderTop: '1px solid var(--border)', paddingTop: '12px', lineHeight: 1.5 }}>{genre.typography.character}</div>
                  </div>
                ))}
              </Carousel>
            ) : (
              <div style={{ marginBottom: '48px' }}>
                <GalleryTitle>Fonts</GalleryTitle>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {[
                    { font: genre.typography.primary, role: 'Primary' },
                    { font: genre.typography.secondary, role: 'Secondary' },
                  ].map(({ font, role }) => (
                    <div key={role} style={{ ...gCard, padding: '36px 32px' }}>
                      <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '24px' }}>{role}</div>
                      <div style={{ fontSize: '36px', fontFamily: font, color: 'var(--text-primary)', letterSpacing: '0.04em', marginBottom: '14px', lineHeight: 1.1 }}>{font}</div>
                      <div style={{ fontSize: '16px', fontFamily: font, color: 'var(--text-tertiary)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '20px' }}>{genre.typography.specimenPhrase}</div>
                      <div style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'var(--text-faint)', borderTop: '1px solid var(--border)', paddingTop: '14px', lineHeight: 1.6 }}>{genre.typography.character}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* COLOR */}
            {(isAll || activeSection === 'color') && (isAll ? (
              <Carousel title="Color">
                <div style={{ ...cardStyle, minWidth: '520px', padding: '24px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    {genre.color.palette.map((hex, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '100%', height: '80px', background: hex, borderRadius: '6px' }} />
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center' }}>{genre.color.labels[i]}</div>
                        <div style={{ fontSize: '9px', color: 'var(--text-faint)', fontFamily: 'monospace' }}>{hex}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.6, borderTop: '1px solid var(--border)', paddingTop: '12px' }}>{genre.color.scheme}</div>
                </div>
              </Carousel>
            ) : (
              <div style={{ marginBottom: '48px' }}>
                <GalleryTitle>Color</GalleryTitle>
                <div style={{ ...gCard, padding: '32px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${genre.color.palette.length}, 1fr)`, gap: '12px', marginBottom: '20px' }}>
                    {genre.color.palette.map((hex, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '100%', height: '120px', background: hex, borderRadius: '8px' }} />
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>{genre.color.labels[i]}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-faint)', fontFamily: 'monospace' }}>{hex}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.6, borderTop: '1px solid var(--border)', paddingTop: '16px' }}>{genre.color.scheme}</div>
                </div>
              </div>
            ))}

            {/* MATERIALS */}
            {(isAll || activeSection === 'materials') && (isAll ? (
              <Carousel title="Materials">
                {genre.materials.map((mat, i) => (
                  <div key={i} style={{ flexShrink: 0, minWidth: '200px', height: '180px', background: materialGradient(mat.name), borderRadius: '8px', position: 'relative', overflow: 'hidden', border: '1px solid var(--border-card)' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px' }}>
                      <div style={{ fontSize: '13px', color: '#e8e8e8', marginBottom: '4px' }}>{mat.name}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', lineHeight: 1.5 }}>{mat.quality}</div>
                    </div>
                  </div>
                ))}
              </Carousel>
            ) : (
              <div style={{ marginBottom: '48px' }}>
                <GalleryTitle>Materials</GalleryTitle>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {genre.materials.map((mat, i) => (
                    <div key={i} style={{ height: '240px', background: materialGradient(mat.name), borderRadius: '8px', position: 'relative', overflow: 'hidden', border: '1px solid var(--border-card)' }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px' }}>
                        <div style={{ fontSize: '14px', color: '#e8e8e8', marginBottom: '6px' }}>{mat.name}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', lineHeight: 1.5 }}>{mat.quality}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* SHAPE LANGUAGE */}
            {(isAll || activeSection === 'shapes') && (isAll ? (
              <Carousel title="Shape Language">
                {genre.shapeLanguage.forms.map((form, i) => (
                  <div key={i} style={{ ...cardStyle, minWidth: '140px', height: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
                    <ShapeIcon form={form} />
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', textAlign: 'center' }}>{form}</div>
                  </div>
                ))}
                <div style={{ ...cardStyle, minWidth: '240px' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '12px' }}>Principle</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.6 }}>{genre.shapeLanguage.principle}</div>
                </div>
              </Carousel>
            ) : (
              <div style={{ marginBottom: '48px' }}>
                <GalleryTitle>Shape Language</GalleryTitle>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {genre.shapeLanguage.forms.map((form, i) => (
                    <div key={i} style={{ ...gCard, height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '18px' }}>
                      <ShapeIcon form={form} />
                      <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', textAlign: 'center' }}>{form}</div>
                    </div>
                  ))}
                  <div style={{ ...gCard, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '28px' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '14px' }}>Principle</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.7 }}>{genre.shapeLanguage.principle}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* MUSIC / SOUND */}
            {(isAll || activeSection === 'music') && (isAll ? (
              <Carousel title="Music / Sound">
                {genre.sonic.instruments.map((inst, i) => (
                  <div key={i} style={{ ...cardStyle, minWidth: '220px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '48px', marginBottom: '16px' }}>
                      {waveformBars(inst.name).map((h, j) => (
                        <div key={j} style={{ flex: 1, height: `${h}%`, background: 'var(--waveform)', opacity: 'var(--waveform-opacity)' as unknown as number, borderRadius: '2px' }} />
                      ))}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>{inst.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{inst.character}</div>
                  </div>
                ))}
                <div style={{ ...cardStyle, minWidth: '220px', borderColor: 'var(--border)' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '8px' }}>Avoid</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-dim)', fontStyle: 'italic', lineHeight: 1.6 }}>{genre.sonic.avoidance}</div>
                </div>
              </Carousel>
            ) : (
              <div style={{ marginBottom: '48px' }}>
                <GalleryTitle>Music / Sound</GalleryTitle>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {genre.sonic.instruments.map((inst, i) => (
                    <div key={i} style={{ ...gCard, padding: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '56px', marginBottom: '18px' }}>
                        {waveformBars(inst.name).map((h, j) => (
                          <div key={j} style={{ flex: 1, height: `${h}%`, background: 'var(--waveform)', opacity: 'var(--waveform-opacity)' as unknown as number, borderRadius: '2px' }} />
                        ))}
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>{inst.name}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{inst.character}</div>
                    </div>
                  ))}
                  <div style={{ ...gCard, padding: '24px', borderColor: 'var(--border)' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '12px' }}>Avoid</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-dim)', fontStyle: 'italic', lineHeight: 1.6 }}>{genre.sonic.avoidance}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Exploring */}
            <div style={{ marginTop: '64px', paddingTop: '48px', borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '24px' }}>
                Continue Exploring
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {continueGenres.map(g => (
                  <GenreCard key={g.id} genre={g} onClick={() => onSelectGenre(g.id)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
