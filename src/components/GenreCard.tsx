import { useState } from 'react'
import type { Genre } from '../data/genres'

const CATEGORY_LABELS: Record<string, string> = {
  fantasy: 'Fantasy',
  scifi: 'Sci-Fi',
  horror: 'Horror',
  analog: 'Analog',
  folk: 'Folk',
  historical: 'Historical',
  abstract: 'Abstract',
}

type Props = {
  genre: Genre
  onClick: () => void
  compact?: boolean
}

export default function GenreCard({ genre, onClick, compact }: Props) {
  const [hovered, setHovered] = useState(false)
  const c = genre.coverColors
  const gradient = `linear-gradient(160deg, ${c[0]}, ${c[1]}, ${c.at(2) ?? c[1]})`
  const comingSoon = genre.status === 'coming-soon'

  return (
    <div
      onClick={comingSoon ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: compact ? '4/3' : '3/4',
        cursor: comingSoon ? 'default' : 'pointer',
        background: gradient,
        backgroundImage: genre.heroImage ? `url(${genre.heroImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px',
        transform: !comingSoon && hovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.2s ease',
        opacity: comingSoon ? 0.45 : 1,
      }}
    >
      {/* Category badge */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        fontSize: '9px',
        letterSpacing: '0.2em',
        color: 'rgba(255,255,255,0.6)',
        background: 'rgba(0,0,0,0.45)',
        padding: '3px 8px',
        textTransform: 'uppercase',
      }}>
        {CATEGORY_LABELS[genre.category] ?? genre.category}
      </div>

      {/* Coming soon overlay */}
      {comingSoon && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontSize: '10px',
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            background: 'rgba(0,0,0,0.4)',
            padding: '6px 16px',
            borderRadius: '4px',
          }}>
            Coming Soon
          </span>
        </div>
      )}

      {/* Bottom overlay */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '32px 16px 20px',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.88))',
      }}>
        <div style={{
          fontSize: compact ? '14px' : '17px',
          color: '#e8e8e8',
          fontFamily: 'Georgia, serif',
          fontWeight: 300,
          letterSpacing: '0.04em',
          marginBottom: compact ? 0 : '4px',
        }}>
          {genre.name}
        </div>
        {!compact && (
          <div style={{
            fontSize: '11px',
            color: '#888',
            fontStyle: 'italic',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}>
            {genre.tagline}
          </div>
        )}
      </div>
    </div>
  )
}
