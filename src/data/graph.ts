import { genres, galleryImages } from './genres'

// Weighted adjacency map: genreId → { neighborId → weight }
// Computed once at module load from static data.
export const genreGraph: Record<string, Record<string, number>> = {}

// 1. Shared gallery images (+3 per shared image)
for (const img of galleryImages) {
  for (let i = 0; i < img.genres.length; i++) {
    for (let j = i + 1; j < img.genres.length; j++) {
      const a = img.genres[i], b = img.genres[j]
      genreGraph[a] ??= {}
      genreGraph[b] ??= {}
      genreGraph[a][b] = (genreGraph[a][b] ?? 0) + 3
      genreGraph[b][a] = (genreGraph[b][a] ?? 0) + 3
    }
  }
}

// 2. Shared graphical styles via images (+2 per shared style)
const styleToGenres: Record<string, Set<string>> = {}
for (const img of galleryImages) {
  if (!img.style) continue
  styleToGenres[img.style] ??= new Set()
  img.genres.forEach(g => styleToGenres[img.style!].add(g))
}
for (const genreSet of Object.values(styleToGenres)) {
  const arr = [...genreSet]
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const a = arr[i], b = arr[j]
      genreGraph[a] ??= {}
      genreGraph[b] ??= {}
      genreGraph[a][b] = (genreGraph[a][b] ?? 0) + 2
      genreGraph[b][a] = (genreGraph[b][a] ?? 0) + 2
    }
  }
}

// 3. Explicit editorial cross-refs via analogues.alsoIn (+5, strongest signal)
for (const genre of genres) {
  for (const analogue of genre.analogues ?? []) {
    for (const otherId of analogue.alsoIn ?? []) {
      genreGraph[genre.id] ??= {}
      genreGraph[otherId] ??= {}
      genreGraph[genre.id][otherId] = (genreGraph[genre.id][otherId] ?? 0) + 5
      genreGraph[otherId][genre.id] = (genreGraph[otherId][genre.id] ?? 0) + 5
    }
  }
}

// 4. Same category (+1, weak background signal)
for (let i = 0; i < genres.length; i++) {
  for (let j = i + 1; j < genres.length; j++) {
    if (genres[i].category === genres[j].category) {
      const a = genres[i].id, b = genres[j].id
      genreGraph[a] ??= {}
      genreGraph[b] ??= {}
      genreGraph[a][b] = (genreGraph[a][b] ?? 0) + 1
      genreGraph[b][a] = (genreGraph[b][a] ?? 0) + 1
    }
  }
}

// Normalize each node's edges to 0–1
for (const id of Object.keys(genreGraph)) {
  const neighbors = genreGraph[id]
  const max = Math.max(...Object.values(neighbors))
  if (max > 0) {
    for (const nid of Object.keys(neighbors)) {
      neighbors[nid] = neighbors[nid] / max
    }
  }
}

// Returns a human-readable reason string for why two genres are related.
// Used as annotation on "Continue your journey" cards.
export function connectionReason(fromId: string, toId: string): string {
  // Check shared styles
  for (const [style, genreSet] of Object.entries(styleToGenres)) {
    if (genreSet.has(fromId) && genreSet.has(toId)) {
      const styleName = style.replace(/-/g, ' ')
      return `Shares ${styleName} aesthetic`
    }
  }
  // Check same category
  const from = genres.find(g => g.id === fromId)
  const to = genres.find(g => g.id === toId)
  if (from && to && from.category === to.category) {
    return `Same ${from.category} lineage`
  }
  return 'Aesthetic resonance'
}

// Returns top N related genre IDs for a given genre.
// Applies visit penalty (already-explored = 0.3×) and profile boost.
export function getRelated(
  genreId: string,
  count = 3,
  visited: string[] = [],
  profile: Record<string, number> = {}
): string[] {
  const neighbors = genreGraph[genreId] ?? {}
  const available = genres.filter(g => g.status === 'available' && g.id !== genreId)

  return available
    .map(g => {
      const graphWeight = neighbors[g.id] ?? 0
      const visitPenalty = visited.includes(g.id) ? 0.3 : 1
      const profileBoost = 1 + (profile[g.id] ?? 0) * 0.1
      return { id: g.id, score: graphWeight * visitPenalty * profileBoost }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(x => x.id)
}
