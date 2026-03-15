import { genres } from '../data/genres'
import ThemeToggle from '../components/ThemeToggle'

type Props = {
  onEnter: () => void
}

export default function Landing({ onEnter }: Props) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      maxWidth: '960px',
      margin: '0 auto',
      padding: '0 32px',
    }}>

      {/* NAV */}
      <nav style={{
        padding: '24px 0',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '13px', letterSpacing: '0.25em', color: 'var(--accent)' }}>LUMA</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-faint)', letterSpacing: '0.1em' }}>KONSTRUKT</span>
          <ThemeToggle />
        </div>
      </nav>

      {/* CENTER CONTENT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingBottom: '80px' }}>

        <div className="anim-fade-up anim-delay-3" style={{
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: 'var(--text-dim)',
          marginBottom: '40px',
        }}>
          AUDIOVISUAL CORRESPONDENCE RESOURCE
        </div>

        <h1 className="anim-fade-up anim-delay-1" style={{
          fontSize: 'clamp(64px, 10vw, 120px)',
          fontWeight: '300',
          letterSpacing: '0.2em',
          color: 'var(--text-primary)',
          lineHeight: 1,
          marginBottom: '48px',
          fontFamily: 'Georgia, serif',
        }}>
          LUMA
        </h1>

        <p className="anim-fade-up anim-delay-2" style={{
          fontSize: '17px',
          color: 'var(--text-tertiary)',
          maxWidth: '480px',
          lineHeight: 1.9,
          marginBottom: '64px',
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
        }}>
          Sound has shape. Color has pitch. Every aesthetic world has a sonic counterpart —
          and every sonic palette casts a visual shadow. Luma is where those correspondences live.
        </p>

        <div className="anim-fade-up anim-delay-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={onEnter}
            style={{
              background: 'none',
              border: '1px solid var(--text-dim)',
              color: 'var(--accent)',
              fontSize: '12px',
              letterSpacing: '0.2em',
              padding: '14px 48px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              borderRadius: '100px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.background = 'var(--accent-hover)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--text-dim)'
              e.currentTarget.style.background = 'none'
            }}
          >
            ENTER LUMA
          </button>
          <span style={{ fontSize: '11px', color: 'var(--text-faint)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            {genres.filter(g => g.status === 'available').length} genre worlds
          </span>
        </div>

      </div>

      {/* FOOTER */}
      <div style={{
        padding: '24px 0',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '11px', color: 'var(--text-ghost)', letterSpacing: '0.1em' }}>
          IMMERSIVE EXPERIENCE DESIGN
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-ghost)', letterSpacing: '0.1em' }}>
          KONSTRUKT © 2026
        </span>
      </div>

    </div>
  )
}
