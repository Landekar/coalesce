import { useState, useEffect, useRef } from 'react'
import type { Genre } from '../data/genres'
import { genres, galleryImages, assetUrl } from '../data/genres'
import { getRelated, connectionReason } from '../data/graph'
import { useUserProfile } from '../hooks/useUserProfile'
import NavBar from '../components/NavBar'
import ImageGallery from '../components/ImageGallery'
import TonePlayer from '../components/TonePlayer'

type Tab = 'images' | 'sound' | 'palette' | 'typography' | 'materials' | 'shapes'

const TABS: { id: Tab; label: string }[] = [
  { id: 'images', label: 'Images' },
  { id: 'sound', label: 'Sound' },
  { id: 'palette', label: 'Palette' },
  { id: 'typography', label: 'Typography' },
  { id: 'materials', label: 'Materials' },
  { id: 'shapes', label: 'Shapes' },
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
  if (n.includes('tape') || n.includes('magnetic'))
    return 'linear-gradient(135deg, #1a1008, #2a1810, #0e0a04)'
  if (n.includes('fog') || n.includes('mist'))
    return 'linear-gradient(135deg, #2a3038, #3a4048, #1e2228)'
  if (n.includes('candle') || n.includes('wax'))
    return 'linear-gradient(135deg, #3a2a10, #5a4020, #2a1a08)'
  if (n.includes('vellum'))
    return 'linear-gradient(135deg, #d8c8a0, #c8b890, #e0d0b0)'
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
  if (n.includes('rect') || n.includes('panel') || n.includes('grid') || n.includes('rack') || n.includes('horizon'))
    return <svg width="48" height="48" viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="36" {...s}/><line x1="6" y1="24" x2="42" y2="24" {...s}/><line x1="24" y1="6" x2="24" y2="42" {...s}/></svg>
  if (n.includes('knot') || n.includes('weave') || n.includes('root') || n.includes('branch'))
    return <svg width="48" height="48" viewBox="0 0 48 48"><path d="M8 40 Q16 24 24 16 Q32 8 40 16 Q48 24 40 32 Q32 40 24 32 Q16 24 24 16" {...s}/></svg>
  if (n.includes('worn') || n.includes('smooth') || n.includes('natural') || n.includes('soft') || n.includes('dissolv'))
    return <svg width="48" height="48" viewBox="0 0 48 48"><path d="M10 34 Q14 28 20 26 Q28 22 34 26 Q40 30 38 36 Q34 42 24 40 Q14 38 10 34 Z" {...s}/></svg>
  if (n.includes('vertical'))
    return <svg width="48" height="48" viewBox="0 0 48 48"><line x1="24" y1="4" x2="24" y2="44" {...s}/><line x1="16" y1="8" x2="16" y2="40" {...s}/><line x1="32" y1="8" x2="32" y2="40" {...s}/></svg>
  if (n.includes('fracture') || n.includes('asymmetric') || n.includes('decay'))
    return <svg width="48" height="48" viewBox="0 0 48 48"><path d="M6 42 L18 28 L14 20 L26 14 L22 6 L42 6" {...s}/></svg>
  // default: diamond
  return <svg width="48" height="48" viewBox="0 0 48 48"><polygon points="24,6 42,24 24,42 6,24" {...s}/></svg>
}

export default function GenreWorld({ genre, onBack, onHome, onSelectGenre, onSearch }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('images')
  const [toneOpen, setToneOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { profile, recordVisit } = useUserProfile()

  useEffect(() => {
    setToneOpen(false)
    setActiveTab('images')
    scrollRef.current?.scrollTo(0, 0)
    recordVisit(genre.id)
  }, [genre.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const related = getRelated(genre.id, 3, profile.path, profile.visits)

  // Genre navigation: ordered list of all available genres
  const availableGenres = genres.filter(g => g.status === 'available')
  const currentIdx = availableGenres.findIndex(g => g.id === genre.id)
  const prevGenre = availableGenres[(currentIdx - 1 + availableGenres.length) % availableGenres.length]
  const nextGenre = availableGenres[(currentIdx + 1) % availableGenres.length]

  // Gallery images for this genre
  const genreImages = galleryImages.filter(img => img.genres.includes(genre.id))

  const gCard: React.CSSProperties = {
    padding: '20px',
    border: '1px solid var(--border-card)',
    background: 'var(--bg-card)',
    borderRadius: '8px',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      <NavBar onHome={onHome} onBack={onBack} backLabel="Catalog" onSearch={onSearch} />

      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div ref={scrollRef} style={{ height: '100%', overflowY: 'auto' as const, padding: '0 0 120px' }}>

          {/* COMPACT HERO — genre identity strip */}
          <div style={{
            position: 'relative',
            width: '100%',
            padding: '36px 48px',
            background: genre.heroImage
              ? `url(${assetUrl(genre.heroImage)}) center/cover no-repeat`
              : `linear-gradient(160deg, ${genre.coverColors[0]}, ${genre.coverColors[1]}, ${genre.coverColors.at(2) ?? genre.coverColors[1]})`,
            overflow: 'hidden',
            flexShrink: 0,
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, var(--overlay-heavy) 0%, var(--overlay-medium) 60%, var(--overlay-light) 100%)',
            }} />
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontSize: '10px', letterSpacing: '0.25em', color: 'var(--hero-label)', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Art Direction
                </div>
                <h1 style={{
                  fontSize: '38px',
                  fontWeight: 300,
                  fontFamily: 'Georgia, serif',
                  color: '#e8e8e8',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                  marginBottom: '8px',
                }}>
                  {genre.name}
                </h1>
                <p style={{ fontSize: '14px', color: 'var(--hero-text)', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                  {genre.tagline}
                </p>
              </div>

              {/* Nav + play controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
          </div>

          {/* Tone player */}
          <TonePlayer
            tracks={genre.setTheTone.tracks}
            open={toneOpen}
            onClose={() => setToneOpen(false)}
          />

          {/* TAB BAR */}
          <div style={{
            padding: '20px 48px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            gap: '0',
          }}>
            {TABS.map(tab => {
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
                    color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                    padding: '8px 20px',
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* TAB CONTENT */}
          <div style={{ paddingTop: '32px' }}>

            {/* IMAGES TAB — the default, image-first view */}
            {activeTab === 'images' && (
              <div>
                {/* Genre abstract — compact, above gallery */}
                {genre.abstract && (
                  <div style={{ padding: '0 48px', marginBottom: '32px' }}>
                    <p style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.8,
                      maxWidth: '720px',
                    }}>
                      {genre.description}
                    </p>
                  </div>
                )}

                <ImageGallery
                  images={genreImages}
                  genreId={genre.id}
                  onNavigateGenre={onSelectGenre}
                />
              </div>
            )}

            {/* SOUND TAB */}
            {activeTab === 'sound' && (
              <div style={{ padding: '0 48px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
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
                  {genre.sonic.avoidance && (
                    <div style={{ ...gCard, padding: '24px', borderColor: 'var(--border)' }}>
                      <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '12px' }}>Avoid</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-dim)', fontStyle: 'italic', lineHeight: 1.6 }}>{genre.sonic.avoidance}</div>
                    </div>
                  )}
                </div>
                {genre.sonic.reference && (
                  <div style={{ fontSize: '12px', color: 'var(--text-faint)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '24px' }}>
                    <span style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', marginRight: '8px' }}>Reference:</span>
                    {genre.sonic.reference}
                  </div>
                )}
              </div>
            )}

            {/* PALETTE TAB */}
            {activeTab === 'palette' && (
              <div style={{ padding: '0 48px' }}>
                <div style={{ ...gCard, padding: '32px', marginBottom: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${genre.color.palette.length}, 1fr)`, gap: '12px', marginBottom: '20px' }}>
                    {genre.color.palette.map((hex, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '100%', height: '120px', background: hex, borderRadius: '8px' }} />
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>{genre.color.labels[i]}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-faint)', fontFamily: 'monospace' }}>{hex}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.6, borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                    {genre.color.scheme}
                  </div>
                </div>
              </div>
            )}

            {/* TYPOGRAPHY TAB */}
            {activeTab === 'typography' && (
              <div style={{ padding: '0 48px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
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
            )}

            {/* MATERIALS TAB */}
            {activeTab === 'materials' && (
              <div style={{ padding: '0 48px' }}>
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
            )}

            {/* SHAPES TAB */}
            {activeTab === 'shapes' && (
              <div style={{ padding: '0 48px' }}>
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
            )}
          </div>

          {/* CONTINUE YOUR JOURNEY */}
          {related.length > 0 && (
            <div style={{ padding: '48px 48px 0', borderTop: '1px solid var(--border)', marginTop: '48px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.25em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '24px' }}>
                Continue your journey
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {related.map(relId => {
                  const relGenre = genres.find(g => g.id === relId)
                  if (!relGenre) return null
                  const reason = connectionReason(genre.id, relId)
                  const c = relGenre.coverColors
                  return (
                    <div
                      key={relId}
                      onClick={() => onSelectGenre(relId)}
                      style={{
                        position: 'relative',
                        height: '180px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        background: relGenre.heroImage
                          ? `url(${assetUrl(relGenre.heroImage)}) center/cover no-repeat`
                          : `linear-gradient(160deg, ${c[0]}, ${c[1]}, ${c.at(2) ?? c[1]})`,
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                        transition: 'background 0.2s',
                      }} />
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 18px' }}>
                        <div style={{ fontSize: '14px', color: '#e8e8e8', fontFamily: 'Georgia, serif', fontWeight: 300, marginBottom: '4px' }}>
                          {relGenre.name}
                        </div>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
                          {reason}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
