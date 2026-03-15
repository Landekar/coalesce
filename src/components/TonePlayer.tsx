import { useState, useRef, useEffect, useCallback } from 'react'

export type ToneTrack = {
  title: string
  artist: string
  audioFile?: string
}

type Props = {
  tracks: ToneTrack[]
  open: boolean
  onClose: () => void
}

function getStoredVolume(): number {
  try { return parseFloat(localStorage.getItem('luma_volume') ?? '0.6') } catch { return 0.6 }
}

export default function TonePlayer({ tracks, open, onClose }: Props) {
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(getStoredVolume)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeRef = useRef<number | null>(null)

  const track = tracks[idx]
  const hasAudio = !!track?.audioFile

  // Sync volume to audio element and localStorage
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
    try { localStorage.setItem('luma_volume', String(volume)) } catch {}
  }, [volume])

  // Auto-play when opened, stop when closed
  useEffect(() => {
    if (open && hasAudio) {
      playTrack()
    } else if (!open) {
      stopAudio()
    }
    return () => stopAudio()
  }, [open])

  // Auto-play on track switch while open
  useEffect(() => {
    if (open && hasAudio) {
      playTrack()
    }
  }, [idx])

  const stopAudio = useCallback(() => {
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setPlaying(false)
  }, [])

  const fadeOut = (audio: HTMLAudioElement, duration = 500): Promise<void> => {
    return new Promise(resolve => {
      const startVol = audio.volume
      const startTime = performance.now()
      const tick = () => {
        const elapsed = performance.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        audio.volume = startVol * (1 - progress)
        if (progress < 1) {
          fadeRef.current = requestAnimationFrame(tick)
        } else {
          audio.pause()
          audio.currentTime = 0
          resolve()
        }
      }
      fadeRef.current = requestAnimationFrame(tick)
    })
  }

  const playTrack = useCallback(async () => {
    if (!track?.audioFile) return

    // Fade out current if playing
    if (audioRef.current) {
      await fadeOut(audioRef.current)
    }

    const audio = new Audio(track.audioFile)
    audio.volume = 0
    audio.loop = true
    audioRef.current = audio

    audio.addEventListener('canplay', () => {
      audio.play().then(() => {
        // Fade in
        const targetVol = volume
        const startTime = performance.now()
        const duration = 500
        const tick = () => {
          const elapsed = performance.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          audio.volume = targetVol * progress
          if (progress < 1) {
            fadeRef.current = requestAnimationFrame(tick)
          }
        }
        fadeRef.current = requestAnimationFrame(tick)
        setPlaying(true)
      }).catch(() => {
        setPlaying(false)
      })
    }, { once: true })
  }, [track, volume])

  const togglePlay = useCallback(() => {
    if (playing) {
      stopAudio()
    } else {
      playTrack()
    }
  }, [playing, playTrack, stopAudio])

  const changeTrack = useCallback((dir: number) => {
    setIdx(i => (i + dir + tracks.length) % tracks.length)
  }, [tracks.length])

  if (!open || !track) return null

  const btnStyle: React.CSSProperties = {
    background: 'none',
    border: '1px solid var(--border-card)',
    color: 'var(--text-muted)',
    borderRadius: '4px',
    width: '28px',
    height: '28px',
    cursor: 'pointer',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <div style={{
      padding: '16px 48px',
      background: 'var(--bg-panel)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    }}>
      {/* Close */}
      <button
        onClick={() => { stopAudio(); onClose() }}
        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '16px', padding: '4px' }}
      >{'\u2715'}</button>

      {/* Play/Pause */}
      <button
        onClick={hasAudio ? togglePlay : undefined}
        style={{
          ...btnStyle,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          fontSize: '13px',
          border: `1px solid ${hasAudio ? 'var(--accent-dim)' : 'var(--border)'}`,
          color: hasAudio ? 'var(--accent)' : 'var(--text-faint)',
          cursor: hasAudio ? 'pointer' : 'default',
        }}
      >
        {playing ? '\u23F8' : '\u25B6'}
      </button>

      {/* Track info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.08em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {track.title} — <span style={{ color: 'var(--text-muted)' }}>{track.artist}</span>
        </div>
        {!hasAudio && (
          <div style={{ fontSize: '10px', color: 'var(--text-faint)', fontStyle: 'italic', marginTop: '2px' }}>
            audio coming soon
          </div>
        )}
      </div>

      {/* Track navigation */}
      {tracks.length > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button onClick={() => changeTrack(-1)} style={btnStyle}>{'\u2190'}</button>
          <span style={{ fontSize: '10px', color: 'var(--text-faint)', minWidth: '28px', textAlign: 'center' }}>
            {idx + 1}/{tracks.length}
          </span>
          <button onClick={() => changeTrack(1)} style={btnStyle}>{'\u2192'}</button>
        </div>
      )}

      {/* Volume */}
      {hasAudio && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-faint)' }}>
            {volume === 0 ? '\uD83D\uDD07' : volume < 0.5 ? '\uD83D\uDD09' : '\uD83D\uDD0A'}
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={e => {
              const v = parseFloat(e.target.value)
              setVolume(v)
              if (audioRef.current) audioRef.current.volume = v
            }}
            style={{
              width: '80px',
              accentColor: 'var(--accent)',
              cursor: 'pointer',
            }}
          />
        </div>
      )}
    </div>
  )
}
