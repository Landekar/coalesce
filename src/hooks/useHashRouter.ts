import { useState, useEffect, useCallback } from 'react'

export interface Route {
  page: string
  params: Record<string, string>
}

function parseHash(hash: string): Route {
  // Remove leading #/ or # or /
  const raw = hash.replace(/^#\/?/, '')
  if (!raw) return { page: 'landing', params: {} }

  const [path, queryString] = raw.split('?')
  const params: Record<string, string> = {}

  if (queryString) {
    for (const pair of queryString.split('&')) {
      const [key, value] = pair.split('=')
      if (key) params[decodeURIComponent(key)] = decodeURIComponent(value ?? '')
    }
  }

  const segments = path.split('/')

  // #/genre/gothic-dark-fantasy → page = genre ID
  if (segments[0] === 'genre' && segments[1]) {
    return { page: segments[1], params }
  }

  // #/catalog, #/search, #/favorites, #/collections, etc.
  return { page: segments[0], params }
}

function buildHash(page: string, params?: Record<string, string>): string {
  // Landing
  if (page === 'landing' || page === '') return '#/'

  // Known top-level routes
  const topLevel = ['catalog', 'search', 'favorites', 'collections', 'compare']
  const isTopLevel = topLevel.includes(page)

  const path = isTopLevel ? page : `genre/${page}`

  if (params && Object.keys(params).length > 0) {
    const qs = Object.entries(params)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&')
    return `#/${path}?${qs}`
  }

  return `#/${path}`
}

export function useHashRouter() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHash(window.location.hash))
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback((page: string, params?: Record<string, string>) => {
    window.location.hash = buildHash(page, params)
  }, [])

  return { route, navigate }
}
