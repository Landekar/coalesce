import type { Genre } from '../data/genres'

type Props = {
  genre: Genre
  onBack: () => void
}

function ColorSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
      <div style={{
        width: '48px',
        height: '48px',
        backgroundColor: color,
        border: '1px solid #333',
      }} />
      <span style={{ fontSize: '10px', color: '#666', letterSpacing: '0.05em' }}>{label}</span>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 12px',
      border: '1px solid #333',
      fontSize: '12px',
      color: '#888',
      letterSpacing: '0.08em',
    }}>
      {children}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: '11px',
      letterSpacing: '0.2em',
      color: '#555',
      textTransform: 'uppercase',
      marginBottom: '20px',
      paddingBottom: '12px',
      borderBottom: '1px solid #1e1e1e',
    }}>
      {children}
    </div>
  )
}

export default function GenreWorld({ genre, onBack }: Props) {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 32px 120px' }}>

      {/* NAV */}
      <nav style={{
        padding: '24px 0',
        borderBottom: '1px solid #1a1a1a',
        marginBottom: '80px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '13px', letterSpacing: '0.25em', color: '#c8b89a' }}>LUMA</span>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#555',
            fontSize: '12px',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            padding: '0',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#888')}
          onMouseLeave={e => (e.currentTarget.style.color = '#555')}
        >
          ← CATALOG
        </button>
      </nav>

      {/* HERO */}
      <div style={{ marginBottom: '80px' }}>
        <div style={{
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: '#555',
          marginBottom: '24px',
        }}>
          GENRE WORLD
        </div>
        <h1 style={{
          fontSize: '52px',
          fontWeight: '300',
          letterSpacing: '0.15em',
          color: '#e8e8e8',
          lineHeight: 1.1,
          marginBottom: '32px',
          fontFamily: 'Georgia, serif',
          textTransform: 'uppercase',
        }}>
          {genre.name}
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#666',
          fontStyle: 'italic',
          marginBottom: '24px',
          fontFamily: 'Georgia, serif',
        }}>
          {genre.tagline}
        </p>
        <p style={{ fontSize: '15px', color: '#777', maxWidth: '600px', lineHeight: 1.8 }}>
          {genre.description}
        </p>
      </div>

      <div style={{ borderTop: '1px solid #1a1a1a', marginBottom: '80px' }} />

      {/* COLOR */}
      <div style={{ marginBottom: '72px' }}>
        <SectionLabel>Color</SectionLabel>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {genre.color.palette.map((c, i) => (
            <ColorSwatch key={c} color={c} label={genre.color.labels[i]} />
          ))}
        </div>
        <p style={{ fontSize: '13px', color: '#555', fontStyle: 'italic' }}>{genre.color.scheme}</p>
      </div>

      {/* TYPOGRAPHY */}
      <div style={{ marginBottom: '72px' }}>
        <SectionLabel>Typography</SectionLabel>
        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#444', letterSpacing: '0.1em', marginBottom: '8px' }}>PRIMARY</div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#c4a882', letterSpacing: '0.05em' }}>
              {genre.typography.primary}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#444', letterSpacing: '0.1em', marginBottom: '8px' }}>SECONDARY</div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#666', letterSpacing: '0.02em' }}>
              {genre.typography.secondary}
            </div>
          </div>
        </div>
        <p style={{ fontSize: '13px', color: '#555', fontStyle: 'italic', marginTop: '16px' }}>
          {genre.typography.character}
        </p>
      </div>

      {/* SHAPE LANGUAGE */}
      <div style={{ marginBottom: '72px' }}>
        <SectionLabel>Shape Language</SectionLabel>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {genre.shapeLanguage.forms.map(f => <Tag key={f}>{f}</Tag>)}
        </div>
        <p style={{ fontSize: '13px', color: '#555', fontStyle: 'italic' }}>{genre.shapeLanguage.principle}</p>
      </div>

      {/* MATERIALS */}
      <div style={{ marginBottom: '72px' }}>
        <SectionLabel>Materials</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {genre.materials.map(m => (
            <div key={m.name} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingBottom: '16px',
              borderBottom: '1px solid #161616',
              gap: '24px',
            }}>
              <span style={{ fontSize: '14px', color: '#c4a882', minWidth: '160px' }}>{m.name}</span>
              <span style={{ fontSize: '13px', color: '#555', fontStyle: 'italic', textAlign: 'right' }}>{m.quality}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SONIC PALETTE */}
      <div style={{ marginBottom: '72px' }}>
        <SectionLabel>Sonic Palette</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
          {genre.sonic.instruments.map(inst => (
            <div key={inst.name} style={{
              padding: '20px 24px',
              border: '1px solid #1e1e1e',
              background: '#0e0e0e',
            }}>
              <div style={{ fontSize: '13px', color: '#c8b89a', letterSpacing: '0.08em', marginBottom: '8px' }}>
                {inst.name.toUpperCase()}
              </div>
              <div style={{ fontSize: '13px', color: '#555', lineHeight: 1.7 }}>{inst.character}</div>
            </div>
          ))}
        </div>
        <div style={{
          padding: '16px 20px',
          border: '1px solid #1e1e1e',
          background: '#0c0c0c',
          marginBottom: '16px',
        }}>
          <span style={{ fontSize: '11px', color: '#444', letterSpacing: '0.1em' }}>AVOID — </span>
          <span style={{ fontSize: '13px', color: '#555', fontStyle: 'italic' }}>{genre.sonic.avoidance}</span>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: '#444', letterSpacing: '0.1em' }}>REFERENCE — </span>
          <span style={{ fontSize: '13px', color: '#666' }}>{genre.sonic.reference}</span>
        </div>
      </div>

      {/* ANALOGUES */}
      <div style={{ marginBottom: '72px' }}>
        <SectionLabel>Analogues</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {genre.analogues.map(a => (
            <div key={a.title} style={{
              padding: '20px',
              border: '1px solid #1e1e1e',
              background: '#0e0e0e',
            }}>
              <div style={{ fontSize: '14px', color: '#e8e8e8', marginBottom: '4px' }}>{a.title}</div>
              <div style={{ fontSize: '11px', color: '#444', letterSpacing: '0.1em', marginBottom: '12px' }}>{a.medium.toUpperCase()}</div>
              <div style={{ fontSize: '12px', color: '#555', lineHeight: 1.6, fontStyle: 'italic' }}>{a.note}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
