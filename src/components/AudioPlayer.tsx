import { useRef, useEffect } from 'react'

type Track = { title: string; artist: string; url: string }

type Props = {
  track: Track | null
  playing: boolean
  onPlayPause: () => void
}

export default function AudioPlayer({ track, playing, onPlayPause }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio()
    return () => { audioRef.current?.pause() }
  }, [])

  useEffect(() => {
    if (!audioRef.current || !track) return
    audioRef.current.src = track.url
    if (playing) audioRef.current.play().catch(() => {})
  }, [track])

  useEffect(() => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }, [playing])

  if (!track) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '60px',
      background: '#0d0d0d',
      borderTop: '1px solid #1e1e1e',
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
      gap: '20px',
      zIndex: 100,
    }}>
      {/* Set the Tone label */}
      <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#333', textTransform: 'uppercase' }}>
        Now Playing
      </span>

      {/* Track info */}
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: '13px', color: '#c8b89a', marginRight: '8px' }}>{track.title}</span>
        <span style={{ fontSize: '12px', color: '#444' }}>— {track.artist}</span>
      </div>

      {/* Play/pause */}
      <button
        onClick={onPlayPause}
        style={{
          background: 'none',
          border: '1px solid #333',
          color: '#888',
          cursor: 'pointer',
          padding: '6px 16px',
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          transition: 'all 0.15s',
        }}
      >
        {playing ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}
