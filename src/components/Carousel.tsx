import { useRef, useState, useEffect, useCallback } from 'react'

type Props = {
  title: string
  children: React.ReactNode
}

export default function Carousel({ title, children }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  // Drag state (refs to avoid re-renders)
  const isDragging = useRef(false)
  const didDrag = useRef(false)
  const startX = useRef(0)
  const startScrollLeft = useRef(0)

  const updateArrows = () => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 0)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }

  useEffect(() => {
    updateArrows()
  }, [children])

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })
    setTimeout(updateArrows, 350)
  }

  // Drag-to-scroll handlers
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current
    if (!el) return
    isDragging.current = true
    didDrag.current = false
    startX.current = e.clientX
    startScrollLeft.current = el.scrollLeft
    el.style.cursor = 'grabbing'
    el.style.userSelect = 'none'
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return
    const el = scrollRef.current
    if (!el) return
    const dx = e.clientX - startX.current
    if (Math.abs(dx) > 5) didDrag.current = true
    el.scrollLeft = startScrollLeft.current - dx
  }, [])

  const onMouseUp = useCallback(() => {
    isDragging.current = false
    const el = scrollRef.current
    if (el) {
      el.style.cursor = 'grab'
      el.style.userSelect = ''
    }
    updateArrows()
    // Reset didDrag after a tick so click handlers can check it
    setTimeout(() => { didDrag.current = false }, 0)
  }, [])

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (didDrag.current) {
      e.stopPropagation()
      e.preventDefault()
    }
  }, [])

  const arrowStyle = (active: boolean): React.CSSProperties => ({
    background: 'none',
    border: '1px solid ' + (active ? 'var(--text-dim)' : 'var(--border)'),
    color: active ? 'var(--text-secondary)' : 'var(--text-faint)',
    cursor: active ? 'pointer' : 'default',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    transition: 'all 0.15s',
  })

  return (
    <div style={{ marginBottom: '48px' }}>
      {/* Header row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        paddingBottom: '12px',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{
          fontSize: '11px',
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
        }}>
          {title}
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button style={arrowStyle(canLeft)} onClick={() => canLeft && scroll(-1)}>←</button>
          <button style={arrowStyle(canRight)} onClick={() => canRight && scroll(1)}>→</button>
        </div>
      </div>

      {/* Scrollable row — supports drag */}
      <div
        ref={scrollRef}
        className="no-scrollbar"
        onScroll={updateArrows}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onClickCapture={onClickCapture}
        style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '4px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          cursor: 'grab',
        } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  )
}
