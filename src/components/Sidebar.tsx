import type { Category, Genre } from '../data/genres'

type Props = {
  mode: 'catalog' | 'genre'
  categories?: Category[]
  selectedCategory?: string
  onSelectCategory?: (id: string) => void
  genres?: Genre[]
  currentGenreId?: string
  onSelectGenre?: (id: string) => void
}

export default function Sidebar({
  mode,
  categories,
  selectedCategory,
  onSelectCategory,
  genres,
  currentGenreId,
  onSelectGenre,
}: Props) {
  return (
    <div style={{
      width: '220px',
      flexShrink: 0,
      borderRight: '1px solid var(--border)',
      overflowY: 'auto' as const,
      padding: '40px 0',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        fontSize: '10px',
        letterSpacing: '0.2em',
        color: 'var(--text-faint)',
        textTransform: 'uppercase',
        padding: '0 24px',
        marginBottom: '20px',
      }}>
        {mode === 'catalog' ? 'Categories' : 'In this category'}
      </div>

      {mode === 'catalog' && categories?.map(cat => {
        const active = selectedCategory === cat.id
        return (
          <div
            key={cat.id}
            onClick={() => onSelectCategory?.(cat.id)}
            style={{
              padding: '10px 24px',
              fontSize: '13px',
              cursor: 'pointer',
              color: active ? 'var(--text-primary)' : 'var(--text-muted)',
              borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
              transition: 'all 0.15s',
              letterSpacing: '0.02em',
            }}
          >
            {cat.name}
          </div>
        )
      })}

      {mode === 'genre' && genres?.map(g => {
        const active = g.id === currentGenreId
        return (
          <div
            key={g.id}
            onClick={() => onSelectGenre?.(g.id)}
            style={{
              padding: '10px 24px',
              fontSize: '13px',
              cursor: 'pointer',
              color: active ? 'var(--text-primary)' : 'var(--text-muted)',
              borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
              transition: 'all 0.15s',
              letterSpacing: '0.02em',
            }}
          >
            {g.name}
          </div>
        )
      })}
    </div>
  )
}
