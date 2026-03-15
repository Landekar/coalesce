import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

type Props = {
  backLabel?: string
  onBack?: () => void
  onHome: () => void
  onSearch: (query: string) => void
}

export default function NavBar({ backLabel, onBack, onHome, onSearch }: Props) {
  const [query, setQuery] = useState('')

  return (
    <div style={{
      display: 'flex',
      height: '52px',
      borderBottom: '1px solid var(--border)',
      flexShrink: 0,
      background: 'var(--bg)',
    }}>
      {/* Left: logo + LUMA (aligned with sidebar width) */}
      <div
        onClick={onHome}
        style={{
          width: '220px',
          flexShrink: 0,
          borderRight: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '0 24px',
          cursor: 'pointer',
        }}
      >
        <div style={{
          width: '16px',
          height: '16px',
          border: '1px solid var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: '8px', color: 'var(--accent)', lineHeight: 1 }}>✕</span>
        </div>
        <span style={{ fontSize: '13px', letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase' }}>
          Luma
        </span>
      </div>

      {/* Right: back link + search + theme toggle */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
      }}>
        <div>
          {onBack && (
            <span
              onClick={onBack}
              style={{
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              ← {backLabel ?? 'Back'}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && query.trim()) {
                onSearch(query.trim())
                setQuery('')
              }
            }}
            placeholder="Search genres..."
            style={{
              background: 'none',
              border: 'none',
              borderBottom: '1px solid var(--border-strong)',
              color: 'var(--text-secondary)',
              fontSize: '12px',
              letterSpacing: '0.1em',
              padding: '4px 8px',
              outline: 'none',
              width: '200px',
            }}
          />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
