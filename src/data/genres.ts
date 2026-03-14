export type Genre = {
  id: string
  name: string
  tagline: string
  description: string
  status: 'available' | 'coming-soon'
  color: {
    palette: string[]
    labels: string[]
    scheme: string
  }
  typography: {
    primary: string
    secondary: string
    character: string
  }
  shapeLanguage: {
    forms: string[]
    principle: string
  }
  materials: { name: string; quality: string }[]
  sonic: {
    instruments: { name: string; character: string }[]
    avoidance: string
    reference: string
  }
  analogues: { title: string; medium: string; note: string }[]
}

export const genres: Genre[] = [
  {
    id: 'gothic-dark-fantasy',
    name: 'Gothic Dark Fantasy',
    tagline: 'Ancient dread made beautiful. Decay as aesthetic.',
    description:
      'Gothic is not darkness for its own sake — it is the dignity of ruin, the beauty of impermanence, the weight of history pressing down on the present. When something feels Gothic, it carries the memory of something vast that has partially collapsed.',
    status: 'available',
    color: {
      palette: ['#1a1210', '#2c1f1a', '#3d2b22', '#8b6355', '#c4a882', '#e8ddd0'],
      labels: ['Void', 'Stone', 'Earth', 'Rust', 'Bone', 'Parchment'],
      scheme: 'Monochromatic warm darks. No pure black — always a trace of brown or red.',
    },
    typography: {
      primary: 'Trajan Pro / Cinzel',
      secondary: 'Garamond / EB Garamond',
      character: 'Serif with weight. Capitals used deliberately. Spacing creates reverence.',
    },
    shapeLanguage: {
      forms: ['Pointed arches', 'Vertical emphasis', 'Asymmetric decay', 'Fractured geometry'],
      principle: 'Everything reaches upward and collapses inward simultaneously.',
    },
    materials: [
      { name: 'Weathered stone', quality: 'Cold, porous, ancient' },
      { name: 'Aged iron', quality: 'Oxidized, heavy, permanent' },
      { name: 'Dried leather', quality: 'Cracked, preserved, tactile' },
      { name: 'Candle wax', quality: 'Organic drip, warm decay' },
      { name: 'Vellum', quality: 'Translucent, fragile, precious' },
    ],
    sonic: {
      instruments: [
        { name: 'Pipe organ', character: 'Massive harmonic density, architectural — sacred and overwhelming' },
        { name: 'Cello section', character: 'Warm low mass, grounded — safe, resolved, serious' },
        { name: 'Gregorian chant', character: 'Monophonic, modal, resonant space — timeless, collective selflessness' },
        { name: 'French horn', character: 'Warm brass, echoing — noble, autumnal, distance' },
        { name: 'Cathedral reverb', character: 'Vast, decaying — eternal, overwhelmed, devotional' },
        { name: 'Timpani', character: 'Deep skin percussion — ceremonial gravity, impending' },
      ],
      avoidance: 'Avoid dry, electronic, or synthesized sounds. Avoid anything that feels manufactured or modern.',
      reference: 'Dark Souls OST — Motoi Sakuraba. Shadow of the Colossus — Kow Otani.',
    },
    analogues: [
      { title: 'Dark Souls', medium: 'Game', note: 'Live orchestra, choir, vast reverb. Decay as world-building.' },
      { title: 'Bloodborne', medium: 'Game', note: 'Victorian horror meets Lovecraftian dread. Strings become visceral.' },
      { title: 'Gothic cathedrals', medium: 'Architecture', note: 'The vertical reach. The weight. The light through stone.' },
      { title: 'Caspar David Friedrich', medium: 'Painting', note: 'Romantic ruin. The sublime figure before the abyss.' },
    ],
  },
  {
    id: 'retro-futurism',
    name: 'Retro-Futurism',
    tagline: 'The future as it was imagined before the future arrived.',
    description: 'Coming soon.',
    status: 'coming-soon',
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [],
    sonic: { instruments: [], avoidance: '', reference: '' },
    analogues: [],
  },
  {
    id: 'analogism',
    name: 'Analogism',
    tagline: 'Warmth of imperfection. The machine with a heartbeat.',
    description: 'Coming soon.',
    status: 'coming-soon',
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [],
    sonic: { instruments: [], avoidance: '', reference: '' },
    analogues: [],
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    tagline: 'High tech. Low life. Neon over concrete.',
    description: 'Coming soon.',
    status: 'coming-soon',
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [],
    sonic: { instruments: [], avoidance: '', reference: '' },
    analogues: [],
  },
  {
    id: 'pastoral-folk',
    name: 'Pastoral Folk',
    tagline: 'Rootedness. The world before speed.',
    description: 'Coming soon.',
    status: 'coming-soon',
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [],
    sonic: { instruments: [], avoidance: '', reference: '' },
    analogues: [],
  },
]
