import { useState, useCallback } from 'react'

type UserProfile = {
  visits: Record<string, number> // genreId → visit count
  path: string[]                 // last 10 genre IDs visited, in order
}

const STORAGE_KEY = 'coalesce_profile'

const defaultProfile: UserProfile = { visits: {}, path: [] }

function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProfile
    return JSON.parse(raw) as UserProfile
  } catch {
    return defaultProfile
  }
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(loadProfile)

  const recordVisit = useCallback((genreId: string) => {
    setProfile(prev => {
      const next: UserProfile = {
        visits: { ...prev.visits, [genreId]: (prev.visits[genreId] ?? 0) + 1 },
        path: [...prev.path.slice(-9), genreId],
      }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* quota */ }
      return next
    })
  }, [])

  return { profile, recordVisit }
}
