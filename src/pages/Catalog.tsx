import { genres } from '../data/genres'

type Props = {
  onSelect: (id: string) => void
}

export default function Catalog({ onSelect }: Props) {
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
        <span style={{ fontSize: '12px', color: '#444', letterSpacing: '0.1em' }}>GENRE WORLDS</span>
      </nav>

      {/* HEADER */}
      <div style={{ marginBottom: '80px' }}>
        <div style={{
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: '#555',
          marginBottom: '24px',
        }}>
          CATALOG
        </div>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '300',
          letterSpacing: '0.1em',
          color: '#e8e8e8',
          lineHeight: 1.1,
          marginBottom: '24px',
          fontFamily: 'Georgia, serif',
        }}>
          Genre Worlds
        </h1>
        <p style={{ fontSize: '15px', color: '#555', maxWidth: '520px', lineHeight: 1.8 }}>
          Each genre world is a complete art direction — color, typography, shape language,
          materials, and sonic palette unified into a single coherent aesthetic.
        </p>
      </div>

      {/* DIVIDER */}
      <div style={{ borderTop: '1px solid #1a1a1a', marginBottom: '48px' }} />

      {/* GENRE LIST */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {genres.map((genre, index) => (
          <div
            key={genre.id}
            onClick={() => genre.status === 'available' && onSelect(genre.id)}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              padding: '28px 0',
              borderBottom: '1px solid #161616',
              cursor: genre.status === 'available' ? 'pointer' : 'default',
              gap: '24px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              if (genre.status === 'available') {
                (e.currentTarget as HTMLDivElement).style.paddingLeft = '12px'
              }
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.paddingLeft = '0px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '32px' }}>
              <span style={{
                fontSize: '11px',
                color: '#333',
                letterSpacing: '0.1em',
                minWidth: '32px',
              }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '300',
                  color: genre.status === 'available' ? '#e8e8e8' : '#444',
                  letterSpacing: '0.05em',
                  fontFamily: 'Georgia, serif',
                  marginBottom: '4px',
                }}>
                  {genre.name}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#444',
                  fontStyle: 'italic',
                }}>
                  {genre.tagline}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
              {genre.status === 'coming-soon' && (
                <span style={{
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  color: '#333',
                  border: '1px solid #222',
                  padding: '3px 8px',
                }}>
                  SOON
                </span>
              )}
              {genre.status === 'available' && (
                <span style={{ fontSize: '18px', color: '#555' }}>→</span>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
