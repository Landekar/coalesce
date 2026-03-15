export type Genre = {
  id: string
  name: string
  tagline: string
  description: string
  status: 'available' | 'coming-soon'
  category: string
  coverColors: string[]
  heroImage?: string
  abstract?: string
  setTheTone: { tracks: Array<{ title: string; artist: string; audioFile?: string }> }
  variants?: string[]
  color: {
    palette: string[]
    labels: string[]
    scheme: string
  }
  typography: {
    primary: string
    secondary: string
    character: string
    specimenPhrase: string
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
  analogues: { title: string; medium: string; note: string; image?: string; images?: string[]; alsoIn?: string[] }[]
}

export const genres: Genre[] = [
  {
    id: 'gothic-dark-fantasy',
    name: 'Gothic Dark Fantasy',
    tagline: 'Ancient dread made beautiful. Decay as aesthetic.',
    description:
      'Gothic is not darkness for its own sake — it is the dignity of ruin, the beauty of impermanence, the weight of history pressing down on the present. When something feels Gothic, it carries the memory of something vast that has partially collapsed.',
    status: 'available',
    category: 'fantasy',
    heroImage: '/luma/images/gothic-dark-fantasy-hero.png',
    abstract: 'Gothic Dark Fantasy is composed of elements that evoke ancient grandeur in decline — architecture that reaches upward but crumbles, light that filters through ruin, sound that resonates in vast empty spaces. Its precedents span centuries: from the pointed arches and gargoyles of medieval cathedrals, through the literary darkness of Shelley and Stoker, to the visual worlds of Dark Souls, Castlevania, and Devil May Cry. The genre is defined not by horror alone but by the tension between beauty and decay — bone-pale stone against deep shadow, choral voices over grinding metal, serif letterforms carved with the weight of ritual. What makes Gothic distinct from generic "dark" aesthetics is its reverence: every element carries history, ceremony, and the suggestion that something sacred has fallen. Use this not to frighten, but to give your work the gravity of something ancient and half-remembered.',
    coverColors: ['#1a1210', '#3d2b22', '#c4a882'],
    setTheTone: { tracks: [
      { title: 'Castle Theme', artist: 'Devil May Cry OST', audioFile: '/luma/audio/gothic-dark-fantasy-01_DevilMayCry1.m4a' },
      { title: 'Firelink Shrine', artist: 'Motoi Sakuraba', audioFile: '/luma/audio/gothic-dark-fantasy-02_DarkSouls1.m4a' },
      { title: 'Circumradiant Dawn', artist: 'Dead Can Dance', audioFile: '/luma/audio/gothic-dark-fantasy-03_DeadCanDance1.m4a' },
    ]},
    variants: [],
    color: {
      palette: ['#1a1210', '#2c1f1a', '#3d2b22', '#8b6355', '#c4a882', '#e8ddd0'],
      labels: ['Void', 'Stone', 'Earth', 'Rust', 'Bone', 'Parchment'],
      scheme: 'Monochromatic warm darks. No pure black — always a trace of brown or red.',
    },
    typography: {
      primary: 'Cinzel',
      secondary: 'EB Garamond',
      character: 'Serif with weight. Capitals used deliberately. Spacing creates reverence.',
      specimenPhrase: 'Ancient dread made beautiful.',
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
      { title: 'Devil May Cry 1', medium: 'Game', note: 'Gothic architecture, demonic baroque, dramatic orchestral rock hybrid.' },
      { title: 'Devil May Cry 3', medium: 'Game', note: 'Heightened gothic theatrics — operatic, excessive, beautiful.' },
      { title: 'Binding of Isaac', medium: 'Game', note: 'Grotesque religious iconography, decay as visual language, biblical dread.' },
    ],
  },

  {
    id: 'retro-futurism',
    name: 'Retro-Futurism',
    tagline: 'The future as it was imagined before the future arrived.',
    description:
      'Retro-futurism is the optimism of a civilization that believed progress was infinite. It is the aesthetic of a tomorrow that never came — chrome and curves, atomic confidence, the sincere belief that humanity was heading somewhere beautiful. It does not feel nostalgic. It feels like a promise.',
    status: 'available',
    category: 'scifi',
    heroImage: '/luma/images/retrofuturism-hero.webp',
    abstract: 'Retro-futurism is what it\'s composed of: the optimism of mid-20th century space-age design, the sleek confidence of Googie architecture, the atomic-era conviction that the future would be chrome, curved, and clean. Its precedents are Syd Mead\'s concept art, the Jetsons, World\'s Fair pavilions, Fallout\'s irradiated Americana, and the Command & Conquer universe where the Cold War never ended but got cooler technology. The genre draws from real industrial design — streamlined locomotives, finned automobiles, vacuum-tube computers — and projects them into a tomorrow that was never built. What distinguishes retro-futurism from generic sci-fi is its sincerity: this is not dystopia, not warning. It is the genuine belief that progress would deliver beauty. The color is teal and cream, the shape is the aerodynamic curve, the sound is theremin over brass. Use this when you want your work to feel like a promise that was worth making.',
    coverColors: ['#1a2a3a', '#4db8c8', '#f0e4c2'],
    setTheTone: { tracks: [
      { title: 'Industrial Funk', artist: 'Frank Klepacki', audioFile: '/luma/audio/retro-futurism-01_RedAlert-1.m4a' },
      { title: 'H2O', artist: 'Surviving Mars OST', audioFile: '/luma/audio/retro-futurism-02_SurvivingMars1.m4a' },
    ]},
    variants: [],
    color: {
      palette: ['#1a2a3a', '#2e6b8a', '#4db8c8', '#f0e4c2', '#e8825a', '#d4af6a'],
      labels: ['Deep sky', 'Ocean', 'Turquoise', 'Cream', 'Coral', 'Gold'],
      scheme: 'Warm cream against cool aqua and turquoise. Chrome accents. Saturated but never harsh.',
    },
    typography: {
      primary: 'Josefin Sans',
      secondary: 'Nunito',
      character: 'Geometric sans-serif. Wide tracking. Confident horizontals. Nothing hand-drawn.',
      specimenPhrase: 'The future arrived ahead of schedule.',
    },
    shapeLanguage: {
      forms: ['Streamlined curves', 'Atomic symbols', 'Aerodynamic silhouettes', 'Circular motifs', 'Fin details'],
      principle: 'Speed and optimism frozen in form. Everything suggests forward motion even when static.',
    },
    materials: [
      { name: 'Polished chrome', quality: 'Reflective, cold, aspirational' },
      { name: 'Formica', quality: 'Smooth, synthetic, optimistically cheap' },
      { name: 'Fiberglass', quality: 'Lightweight, moulded, modern miracle' },
      { name: 'Neon tube', quality: 'Glowing, fragile, electrical warmth' },
      { name: 'Bakelite', quality: 'Early plastic, warm brown-black, Midcentury texture' },
    ],
    sonic: {
      instruments: [
        { name: 'Theremin', character: 'Eerie, singing, hovering — the sound of the impossible made real' },
        { name: 'Big band brass', character: 'Confident, wide, sweeping — collective optimism in unison' },
        { name: 'Space age lounge (vibraphone + muted trumpet)', character: 'Cool, sophisticated, cocktail-hour futurism' },
        { name: 'Orchestral strings (soaring)', character: 'Romantic momentum — the feeling of launch and ascent' },
        { name: 'Early analog synth (Moog theremin-style)', character: 'Wobbling, curious, innocent electronic wonder' },
        { name: 'Warm room reverb', character: 'Present, not vast — intimate optimism, not cosmic dread' },
      ],
      avoidance: 'Avoid heavy distortion, dark minor modes, or anything that implies dystopia or failure.',
      reference: 'Fallout OST — Inon Zur + licensed 1940s-50s tracks. Les Baxter, Juan Garcia Esquivel, Yuri Gagarin-era Soviet space music.',
    },
    analogues: [
      { title: 'Fallout series', medium: 'Game', note: 'Atomic-age aesthetic preserved in amber. Hope and ruin in equal measure.' },
      { title: 'Sid Mead', medium: 'Illustration', note: 'The definitive visual language of optimistic futurity. Chrome, curves, light.' },
      { title: 'Googie architecture', medium: 'Architecture', note: 'Diners and gas stations that looked like spacecraft. Earnest and wonderful.' },
      { title: 'The Jetsons / Space Age design', medium: 'Animation / Design', note: 'Domestic futurism. The future was supposed to be convenient and cheerful.' },
    ],
  },

  {
    id: 'analogism',
    name: 'Analogism',
    tagline: 'Warmth of imperfection. The machine with a heartbeat.',
    description:
      'Analogism is the aesthetic of physical signal — the hum of a transformer, the resistance of a knob, the warmth of tape saturation. It is not nostalgia for the past. It is reverence for the fact that something mechanical was once alive in a way that digital cannot replicate. Imperfection is not a flaw here. It is the proof of presence.',
    status: 'available',
    category: 'analog',
    heroImage: '/luma/images/analogism-hero.webp',
    abstract: 'Analogism is composed of the elements that define physical signal processing and pre-digital craft: the grain of film, the warmth of vacuum tubes, the tactile resistance of mechanical controls, the saturation of tape. Its precedents include the golden age of hi-fi audio, the analog synthesizer movement from Moog to Buchla, the photography of Saul Leiter, the industrial design of Braun under Dieter Rams, and the visual identity of labels like ECM and Blue Note. In games, it surfaces in the hand-drawn textures of Cuphead and the deliberate lo-fi grain of Signalis. What makes analogism a distinct direction — not just "vintage" — is its philosophical stance: imperfection is not a limitation to overcome but a quality to preserve. The wobble of a VHS tracking line, the crackle of vinyl, the uneven ink of a letterpress — these are evidence of a physical process, proof that a human hand was involved. Use this when you want your work to feel warm, present, and irreducibly real.',
    coverColors: ['#1a1510', '#5c4a30', '#c8a96e'],
    setTheTone: { tracks: [
      { title: 'Complex', artist: 'Dope', audioFile: '/luma/audio/analogism-01_DopeComplex.m4a' },
    ]},
    variants: [],
    color: {
      palette: ['#1a1510', '#2e2318', '#5c4a30', '#8a7355', '#c8a96e', '#f0ddb0'],
      labels: ['Console black', 'Dark panel', 'Worn casing', 'Aged metal', 'Amber glow', 'Phosphor'],
      scheme: 'Amber and warm brown dominance. The color of phosphor screens and worn plastic. No pure white — always tinted.',
    },
    typography: {
      primary: 'Courier Prime',
      secondary: 'IBM Plex Mono',
      character: 'Monospaced, typewriter-origin. Fixed width implies precision. Slightly worn at the edges.',
      specimenPhrase: 'Signal. Record. Transmit. Repeat.',
    },
    shapeLanguage: {
      forms: ['Rectangular panel layouts', 'Grid of knobs and switches', 'VU meter symmetry', 'Rack unit proportions', 'Patch cable curves'],
      principle: 'Form follows function absolutely. No decoration that does not do something. Beauty emerges from density of purpose.',
    },
    materials: [
      { name: 'Brushed aluminum', quality: 'Industrial, precise, fingerprint-prone' },
      { name: 'Black rubber', quality: 'Grip, resistance, tactile certainty' },
      { name: 'Worn ABS plastic', quality: 'Yellowed at edges, warm, time-marked' },
      { name: 'Phosphor screen', quality: 'Green-amber glow, slightly blurred, electric' },
      { name: 'Copper wiring', quality: 'Visible infrastructure, honest materiality' },
    ],
    sonic: {
      instruments: [
        { name: 'Moog monosynth lead', character: 'Fat, harmonically rich, slightly aggressive — the defining analog voice' },
        { name: 'Rhodes electric piano', character: 'Bell-like attack, warm sustain — mechanical beauty at its peak' },
        { name: 'Tape saturation (processing)', character: 'Compression, harmonic warmth, slight wow and flutter — imperfection as texture' },
        { name: 'Modular sequencer arpeggios', character: 'Mechanical, repetitive, hypnotic — the machine thinking out loud' },
        { name: 'Clavinet', character: 'Percussive, funky, physical — strings hit not plucked' },
        { name: 'Analog drum machine (CR-78, LM-1)', character: 'Slightly swinging, warm kick, human feel trapped in circuitry' },
      ],
      avoidance: 'Avoid pristine digital clarity. Avoid quantized perfection. Avoid anything that sounds like it was made after 1990.',
      reference: 'C&C Red Alert OST — Frank Klepacki. Tangerine Dream. Jean-Michel Jarre — Oxygène. Herbie Hancock — Thrust.',
    },
    analogues: [
      { title: 'Command & Conquer: Red Alert', medium: 'Game', note: 'Frank Klepacki\'s analog funk defined an entire era of game music. Low poly count, high soul.' },
      { title: 'Tangerine Dream', medium: 'Music', note: 'Modular synthesis as landscape painting. The machine discovering emotion.' },
      { title: 'Dieter Rams / Braun design', medium: 'Industrial Design', note: 'Less but better. Function so pure it becomes beauty.' },
      { title: 'Kraftwerk', medium: 'Music / Visual', note: 'The robot that felt. Analog precision as artistic identity.' },
      { title: 'C&C: Renegade', medium: 'Game', note: 'Functional military industrial — brutalist, utilitarian, cold concrete.' },
      { title: 'C&C: Tiberium Wars / KW', medium: 'Game', note: 'RTS tactical clarity meets analog military hardware. Signals and silos.' },
      { title: 'Half-Life 2', medium: 'Game', note: 'Combine brutalism — occupation architecture as totalitarian signal.' },
    ],
  },

  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    tagline: 'High tech. Low life. Neon over concrete.',
    description:
      'Cyberpunk is the aesthetic of systems that have outgrown their makers — technology so dense and pervasive it has become the environment itself. It is not about the future. It is about the present accelerated past its breaking point. Beauty here is accidental, found in the gap between corporate perfection and human survival.',
    status: 'available',
    category: 'scifi',
    heroImage: '/luma/images/cyberpunk-hero.jpg',
    abstract: 'Cyberpunk is composed of the tension between ubiquitous technology and human marginalization — neon signage bleeding through rain, megacorporate towers above street-level chaos, interfaces layered over interfaces until the physical world is just another screen. Its precedents are foundational: Ridley Scott\'s Blade Runner, William Gibson\'s Sprawl trilogy, Katsuhiro Otomo\'s Akira, Ghost in the Shell, and the visual identity of Cyberpunk 2077. The genre draws equally from real urbanism — the density of Hong Kong\'s Kowloon Walled City, the signage saturation of Shinjuku, the infrastructure brutalism of Soviet housing blocks — and from speculative technology extrapolated to its logical extreme. What separates cyberpunk from generic sci-fi is its class consciousness: the technology is advanced, but it has not liberated anyone. The rich live above the smog, the poor hack what they can. The color is neon on black, the shape is the exposed cable and the holographic overlay, the sound is distorted synth over industrial percussion. Use this when you want your work to feel like a system that has exceeded its human operators.',
    coverColors: ['#080810', '#1a0a2e', '#00fff0'],
    setTheTone: { tracks: [
      { title: 'Black Market', artist: 'Blue Stahli', audioFile: '/luma/audio/cyberpunk-01_CyberPunk1.m4a' },
    ]},
    variants: [],
    color: {
      palette: ['#080810', '#0d0d1a', '#1a0a2e', '#00fff0', '#ff2d78', '#7b2dff'],
      labels: ['Void', 'Night concrete', 'Deep violet', 'Cyan neon', 'Magenta neon', 'Electric violet'],
      scheme: 'Near-black backgrounds. Neon colors used as signals, not fills. High contrast. Color means danger or direction.',
    },
    typography: {
      primary: 'Exo 2',
      secondary: 'Share Tech Mono',
      character: 'Technical, condensed, angular. Type as infrastructure — signage, readout, warning label.',
      specimenPhrase: 'High tech. Low life. Neon over concrete.',
    },
    shapeLanguage: {
      forms: ['Vertical layered signage', 'Dense grid decay', 'Sharp beveled edges', 'Exposed structural elements', 'Rain-streak verticals'],
      principle: 'Compression. Every surface is occupied. Nothing is empty. Space is a resource that has run out.',
    },
    materials: [
      { name: 'Wet concrete', quality: 'Cold, reflective, enduring beneath everything' },
      { name: 'Holographic film', quality: 'Iridescent, cheap, beautiful, disposable' },
      { name: 'Chrome mesh', quality: 'Industrial barrier repurposed as fashion' },
      { name: 'Cracked acrylic signage', quality: 'Damaged but still glowing — persistence despite neglect' },
      { name: 'Carbon fiber panel', quality: 'Elite material in a collapsed world — aspirational decay' },
    ],
    sonic: {
      instruments: [
        { name: 'Industrial polysynth pads', character: 'Dense, detuned, cold — the city as harmonic mass' },
        { name: '808 sub bass', character: 'Physical, urban, dominant — felt in the chest before heard' },
        { name: 'Glitch / digital artifact textures', character: 'Corrupted, fragile systems — the sound of things breaking and continuing' },
        { name: 'Processed vocal (vocoder / pitch shift)', character: 'Human but translated — identity mediated through technology' },
        { name: 'Hard-quantized drum machine', character: 'Cold precision, mechanical perfection — no human swing' },
        { name: 'Deep reverb + sidechain compression', character: 'The pumping city breath — everything ducking under the kick' },
      ],
      avoidance: 'Avoid acoustic instruments, warm analog textures, anything pastoral or organic. Avoid major keys resolving happily.',
      reference: 'Blade Runner 2049 OST — Jóhann Jóhannsson / Hans Zimmer. Perturbator. Kavinsky. Carpenter Brut.',
    },
    analogues: [
      { title: 'Blade Runner 2049', medium: 'Film', note: 'The definitive visual grammar. Brutalist scale, neon reflection, human smallness.' },
      { title: 'Cyberpunk 2077', medium: 'Game', note: 'Corporate maximalism as environment. Every surface is an advertisement or a wound.' },
      { title: 'Ghost in the Shell (1995)', medium: 'Film / Animation', note: 'The philosophical core. Where does the human end and the system begin?' },
      { title: 'Syd Mead (Blade Runner design)', medium: 'Illustration', note: 'Industrial beauty. The city as machine that has forgotten it was built for people.' },
    ],
  },

  {
    id: 'pastoral-folk',
    name: 'Pastoral Folk',
    tagline: 'Rootedness. The world before speed.',
    description:
      'Pastoral Folk is the aesthetic of a world that grows rather than manufactures. It is slow time, seasonal rhythm, the knowledge that things take as long as they take. It does not romanticize poverty or ignore hardship — it finds dignity in proximity to the earth, in the weight of a tool that has been used for generations.',
    status: 'available',
    category: 'folk',
    heroImage: '/luma/images/pastoral-folk-hero.jpg',
    abstract: 'Pastoral Folk is composed of elements that root art direction in the land itself — hand-worked materials, seasonal color shifts, organic textures, and sounds drawn from acoustic instruments and natural ambience. Its precedents reach from the pastoral paintings of Constable and the Barbizon school, through the folk revival movements in music (Fairport Convention, Pentangle, Fleet Foxes), to the visual worlds of The Elder Scrolls IV: Oblivion, The Witcher 3\'s Toussaint, and Studio Ghibli\'s rural landscapes. The genre is informed by real craft traditions: blacksmithing, weaving, woodcarving, ceramic glazing — processes where the material dictates the form. What makes pastoral folk distinct from generic "fantasy medieval" is its groundedness: it is not about kingdoms and heroes, but about the rhythm of harvest, the weight of a hand-forged tool, the warmth of firelight on rough-hewn walls. The color is earth and moss, the shape is the irregular curve of something grown or worn smooth, the sound is strings and wind. Use this when you want your work to feel rooted, unhurried, and connected to something older than industry.',
    coverColors: ['#1e1a12', '#6b7c3a', '#d4c48a'],
    setTheTone: { tracks: [
      { title: 'Harvest Dawn (Classical Arrangement)', artist: 'Jeremy Soule', audioFile: '/luma/audio/pastoral-folk-01_Oblivion1.m4a' },
    ]},
    variants: [],
    color: {
      palette: ['#1e1a12', '#3d3220', '#6b7c3a', '#a8b86a', '#d4c48a', '#f0ead8'],
      labels: ['Rich soil', 'Dark bark', 'Moss', 'Meadow', 'Straw', 'Linen'],
      scheme: 'Earthy greens, warm ochres, undyed linens. Desaturated, natural, sun-faded. Nothing vivid or artificial.',
    },
    typography: {
      primary: 'Playfair Display',
      secondary: 'Lora',
      character: 'Warm serif. Slightly irregular — hand-press origin. Letters that feel like they were set with care, not generated.',
      specimenPhrase: 'The earth remembers what cities forget.',
    },
    shapeLanguage: {
      forms: ['Organic irregular curves', 'Hand-drawn quality', 'Knot and weave patterns', 'Root and branch structures', 'Worn smooth edges'],
      principle: 'Nothing is perfectly straight. Everything has been shaped by use, weather, or hand. Geometry that grew rather than was designed.',
    },
    materials: [
      { name: 'Rough-woven linen', quality: 'Textured, undyed, honest — labor made visible' },
      { name: 'Aged oak', quality: 'Dense, warm, grain-heavy — time stored in material' },
      { name: 'River stone', quality: 'Smooth from use, cold, permanent, humble' },
      { name: 'Dried wildflowers', quality: 'Fragile, preserved, faded color — transient beauty kept' },
      { name: 'Fired terracotta', quality: 'Warm, porous, earth-colored — made by hand in fire' },
    ],
    sonic: {
      instruments: [
        { name: 'Acoustic folk fiddle', character: 'Singing, slightly rough, human breath audible — community instrument' },
        { name: 'Fingerpicked acoustic guitar', character: 'Intimate, wooden resonance, no amp — the sound of one person in a room' },
        { name: 'Wooden flute / tin whistle', character: 'Breathy, modal, ancient — melody that has been sung before it was played' },
        { name: 'Hurdy-gurdy drone', character: 'Continuous, hypnotic, medieval — the wheel turning like seasons turning' },
        { name: 'Hand percussion (bodhrán, frame drum)', character: 'Earthy, non-metronomic, breathing — rhythm as ritual not grid' },
        { name: 'Small room reverb or dry', character: 'Intimate, present, honest — you are in the room with the musician' },
      ],
      avoidance: 'Avoid electronic production, quantized rhythm, polished compression. Avoid anything that removes the physical trace of a human making the sound.',
      reference: 'The Witcher 3 OST — Marcin Przybyłowicz. Lord of the Rings — Howard Shore. Heilung. Wardruna.',
    },
    analogues: [
      { title: 'The Witcher 3: Wild Hunt', medium: 'Game', note: 'Folk instrumentation used to define cultural identity across regions. Music as worldbuilding.' },
      { title: 'Studio Ghibli (Princess Mononoke / Nausicaä)', medium: 'Film / Animation', note: 'The natural world as protagonist. Reverence for what grows.' },
      { title: 'Millet / Brueghel the Elder', medium: 'Painting', note: 'Peasant labor depicted with full dignity. The beauty of work done close to the earth.' },
      { title: 'Lord of the Rings (Shire aesthetic)', medium: 'Film', note: 'Comfort, smallness, community. The world scaled to human proportion.' },
    ],
  },

  {
    id: 'digital-pastoral',
    name: 'Digital Pastoral',
    tagline: 'The world asked nothing of you. You built it anyway.',
    description:
      'Digital Pastoral is the pastoral tradition reborn inside a simulation. It is Minecraft\'s voxel dirt, Stardew Valley\'s first spring, the sound of rain on a roof you built yourself. It does not dramatize nature — it renders it as a space you inhabit slowly. The aesthetic of worlds that run while you sleep and wait quietly for you to return.',
    status: 'available',
    category: 'folk',
    heroImage: '/luma/images/digital-pastoral-hero.webp',
    abstract: 'Digital Pastoral is composed of the intersection between computational environments and the pastoral tradition — the pixelated meadow, the procedurally generated forest, the lo-fi ambient soundtrack that plays while you plant seeds in a world made of code. Its precedents are Minecraft\'s voxel landscapes, Stardew Valley\'s seasonal farming loops, Animal Crossing\'s gentle social simulation, Proteus\'s abstract nature walks, and the ambient electronic work of artists like C418, Lena Raine, and Brian Eno. The genre draws from real pastoral aesthetics — rolling hills, soft light, the sound of water over stone — but renders them through a digital lens that is self-aware of its own abstraction. What makes digital pastoral distinct from traditional pastoral is its comfort with artificiality: the sunrise is computed, the rain is a particle system, and that is not a flaw but a feature. It finds peace not in escaping technology but in building quiet spaces within it. The color is muted green and warm gold, the shape is the soft voxel and the rounded pixel, the sound is synthesizer pretending to be wind. Use this when you want your work to feel like a place someone built because they needed somewhere calm to exist.',
    coverColors: ['#1a2d1a', '#4a6b3a', '#c8b870'],
    setTheTone: { tracks: [
      { title: 'Subwoofer Lullaby', artist: 'C418', audioFile: '/luma/audio/pastoral-digital-01_Minecraft1.m4a' },
      { title: 'Harvest Dawn', artist: 'Jeremy Soule', audioFile: '/luma/audio/pastoral_digital-01_Oblivion1.m4a' },
    ]},
    variants: [],
    color: {
      palette: ['#1a2d1a', '#3d5c2a', '#6b8c4a', '#c8aa6a', '#9a7a50', '#dce8cc'],
      labels: ['Deep shade', 'Forest', 'Meadow', 'Wheat', 'Warm soil', 'Morning mist'],
      scheme: 'Earthy greens and warm browns anchored by morning mist. Colors shift with season — never vivid, always alive. No neon, no pure black.',
    },
    typography: {
      primary: 'Cabin',
      secondary: 'Merriweather',
      character: 'Rounded humanist shapes. Warm and approachable without being childish. Type that feels like a handwritten sign nailed to a fence post.',
      specimenPhrase: 'Plant it. Watch it grow.',
    },
    shapeLanguage: {
      forms: ['Voxel grid', 'Rounded hills', 'Horizon sweep', 'Stacked cubes', 'Organic scatter'],
      principle: 'Geometry that suggests growth, not engineering. The grid as garden bed — structure that life fills in over time.',
    },
    materials: [
      { name: 'Wood planks', quality: 'Warm grain, sawn flat — built by hand, not manufactured' },
      { name: 'Rough stone', quality: 'Irregular, gathered, heavy — accumulated not quarried' },
      { name: 'Topsoil', quality: 'Dark, fertile, earthy — potential stored in texture' },
      { name: 'Raw wool', quality: 'Undyed, textured — animal warmth preserved in fiber' },
      { name: 'River moss', quality: 'Soft, damp, living — nature reclaiming every surface given time' },
      { name: 'Handblown glass', quality: 'Clear but imperfect — transparency made by breath not machine' },
    ],
    sonic: {
      instruments: [
        { name: 'Solo piano (sparse)', character: 'Single notes with long decay — each note has space around it. Silence is the instrument.' },
        { name: 'Ambient texture pads', character: 'Low, warm, barely present — the hum of a world that exists whether you\'re in it or not.' },
        { name: 'Fingerpicked acoustic guitar', character: 'Seasonal warmth. Melodies you hum without noticing. Concerned Ape\'s Spring themes.' },
        { name: 'Field recordings', character: 'Rain, wind on leaves, running water — the world making sound entirely on its own terms.' },
        { name: 'Glockenspiel / soft bells', character: 'Childlike wonder without irony — the sound of finding something small and new.' },
      ],
      avoidance: 'Avoid anything that creates urgency or tension. No hard drum hits, no distortion, no musical phrases that demand resolution. If a sound makes you look up from what you\'re doing, it doesn\'t belong here.',
      reference: 'C418 — Minecraft Volume Alpha. Concerned Ape — Stardew Valley OST. Brian Eno — Ambient 1: Music for Airports.',
    },
    analogues: [
      { title: 'Minecraft', medium: 'Game', note: 'The defining text. Voxel world, no narrative, no stakes — just the act of making things. C418\'s music understands that silence is part of the composition.' },
      { title: 'Stardew Valley', medium: 'Game', note: 'Farming as intimacy. Every character has a history. Seasonal rhythm as the game\'s emotional architecture.' },
      { title: 'Animal Crossing', medium: 'Game', note: 'Real time, real seasons, no urgency. The game runs without you. That absence is the point.' },
      { title: 'Terraria', medium: 'Game', note: 'Same voxel logic but with stakes — exploration into darkness from a warm base you built yourself.' },
      { title: 'Valheim', medium: 'Game', note: 'Digital Pastoral with Norse mythology. Building a mead hall no one asked for is still Digital Pastoral.' },
      { title: 'Spiritfarer', medium: 'Game', note: 'The pastoral becomes elegiac — caring for others, building a boat-home, learning to let go.' },
      { title: 'A Short Hike', medium: 'Game', note: 'A mountain. A weekend. Nothing to do. The entire game is the feeling this genre is made of.' },
    ],
  },

  // ── Coming Soon ───────────────────────────────────────────

  // Fantasy
  {
    id: 'high-fantasy', name: 'High Fantasy',
    tagline: 'Kingdoms in full color. The world as it should have been.',
    description: 'Coming soon.',
    status: 'coming-soon' as const, category: 'fantasy',
    coverColors: ['#2a1e3a', '#5a4a2a'],
    setTheTone: { tracks: [] }, variants: [],
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '', specimenPhrase: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [], sonic: { instruments: [], avoidance: '', reference: '' }, analogues: [],
  },
  {
    id: 'dark-fairy-tale', name: 'Dark Fairy Tale',
    tagline: 'Innocence corrupted. The forest has teeth.',
    description: 'Coming soon.',
    status: 'coming-soon' as const, category: 'fantasy',
    coverColors: ['#1a1a2e', '#3a2a1a'],
    setTheTone: { tracks: [] }, variants: [],
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '', specimenPhrase: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [], sonic: { instruments: [], avoidance: '', reference: '' }, analogues: [],
  },
  {
    id: 'mythic-realism', name: 'Mythic Realism',
    tagline: 'Gods walk among us. The mundane made sacred.',
    description: 'Coming soon.',
    status: 'coming-soon' as const, category: 'fantasy',
    coverColors: ['#2a2a1a', '#4a3a2a'],
    setTheTone: { tracks: [] }, variants: [],
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '', specimenPhrase: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [], sonic: { instruments: [], avoidance: '', reference: '' }, analogues: [],
  },

  // Sci-Fi
  {
    id: 'military-scifi', name: 'Military Sci-Fi',
    tagline: 'War industrialized. The machine as soldier.',
    description: 'Coming soon.',
    status: 'coming-soon' as const, category: 'scifi',
    coverColors: ['#1a2a1a', '#2a3a2a'],
    setTheTone: { tracks: [] }, variants: [],
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '', specimenPhrase: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [], sonic: { instruments: [], avoidance: '', reference: '' }, analogues: [],
  },
  {
    id: 'solarpunk', name: 'Solarpunk',
    tagline: 'Optimism engineered. Technology in service of nature.',
    description: 'Coming soon.',
    status: 'coming-soon' as const, category: 'scifi',
    coverColors: ['#1a3a2a', '#3a5a2a'],
    setTheTone: { tracks: [] }, variants: [],
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '', specimenPhrase: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [], sonic: { instruments: [], avoidance: '', reference: '' }, analogues: [],
  },
  {
    id: 'post-apocalyptic', name: 'Post-Apocalyptic',
    tagline: 'After the fall. Beauty in what survives.',
    description: 'Coming soon.',
    status: 'coming-soon' as const, category: 'scifi',
    coverColors: ['#2a2a1a', '#4a3a1a'],
    setTheTone: { tracks: [] }, variants: [],
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '', specimenPhrase: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [], sonic: { instruments: [], avoidance: '', reference: '' }, analogues: [],
  },

  // Horror
  {
    id: 'cosmic-horror', name: 'Cosmic Horror',
    tagline: 'Insignificance as terror. The universe does not care.',
    description: 'Coming soon.',
    status: 'coming-soon' as const, category: 'horror',
    coverColors: ['#0a0a1a', '#1a1a3a'],
    setTheTone: { tracks: [] }, variants: [],
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '', specimenPhrase: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [], sonic: { instruments: [], avoidance: '', reference: '' }, analogues: [],
  },
  {
    id: 'survival-horror', name: 'Survival Horror',
    tagline: 'Resources dwindle. Every door is a decision.',
    description: 'Coming soon.',
    status: 'coming-soon' as const, category: 'horror',
    coverColors: ['#1a1a0a', '#2a1a0a'],
    setTheTone: { tracks: [] }, variants: [],
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '', specimenPhrase: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [], sonic: { instruments: [], avoidance: '', reference: '' }, analogues: [],
  },
  {
    id: 'gothic-horror', name: 'Gothic Horror',
    tagline: 'Decay with dignity. The mansion remembers.',
    description: 'Coming soon.',
    status: 'coming-soon' as const, category: 'horror',
    coverColors: ['#1a0a1a', '#2a1a2a'],
    setTheTone: { tracks: [] }, variants: [],
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '', specimenPhrase: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [], sonic: { instruments: [], avoidance: '', reference: '' }, analogues: [],
  },

  // Analog / Industrial
  {
    id: 'steampunk', name: 'Steampunk',
    tagline: 'Brass and pressure. Victorian ambition made physical.',
    description: 'Coming soon.',
    status: 'coming-soon' as const, category: 'analog',
    coverColors: ['#2a1a0a', '#4a3a1a'],
    setTheTone: { tracks: [] }, variants: [],
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '', specimenPhrase: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [], sonic: { instruments: [], avoidance: '', reference: '' }, analogues: [],
  },
  {
    id: 'dieselpunk', name: 'Dieselpunk',
    tagline: 'Oil and iron. The roar of the 20th century.',
    description: 'Coming soon.',
    status: 'coming-soon' as const, category: 'analog',
    coverColors: ['#1a1a0a', '#3a2a0a'],
    setTheTone: { tracks: [] }, variants: [],
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '', specimenPhrase: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [], sonic: { instruments: [], avoidance: '', reference: '' }, analogues: [],
  },

  // Folk / Nature
  {
    id: 'wilderness-sublime', name: 'Wilderness Sublime',
    tagline: 'Scale that humbles. Nature as cathedral.',
    description: 'Coming soon.',
    status: 'coming-soon' as const, category: 'folk',
    coverColors: ['#0a1a0a', '#1a3a1a'],
    setTheTone: { tracks: [] }, variants: [],
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '', specimenPhrase: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [], sonic: { instruments: [], avoidance: '', reference: '' }, analogues: [],
  },

  // Historical / Period
  {
    id: 'medieval', name: 'Medieval',
    tagline: 'Stone, iron, parchment. The weight of a slower world.',
    description: 'Coming soon.',
    status: 'coming-soon' as const, category: 'historical',
    coverColors: ['#1a1a0a', '#3a2a1a'],
    setTheTone: { tracks: [] }, variants: [],
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '', specimenPhrase: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [], sonic: { instruments: [], avoidance: '', reference: '' }, analogues: [],
  },
  {
    id: 'art-deco', name: 'Art Deco',
    tagline: 'Geometry as luxury. The machine age made elegant.',
    description: 'Coming soon.',
    status: 'coming-soon' as const, category: 'historical',
    coverColors: ['#1a1a1a', '#3a2a0a'],
    setTheTone: { tracks: [] }, variants: [],
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '', specimenPhrase: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [], sonic: { instruments: [], avoidance: '', reference: '' }, analogues: [],
  },

  // Abstract / Experimental
  {
    id: 'vaporwave', name: 'Vaporwave',
    tagline: 'Nostalgia for a present that never existed.',
    description: 'Coming soon.',
    status: 'coming-soon' as const, category: 'abstract',
    coverColors: ['#2a1a3a', '#1a3a3a'],
    setTheTone: { tracks: [] }, variants: [],
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '', specimenPhrase: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [], sonic: { instruments: [], avoidance: '', reference: '' }, analogues: [],
  },
  // Ambient / Atmospheric
  {
    id: 'liminal', name: 'Liminal',
    tagline: 'The space between. Absence as presence.',
    description: 'Coming soon.',
    status: 'coming-soon' as const, category: 'ambient',
    coverColors: ['#1a1a1a', '#2a2a2a'],
    setTheTone: { tracks: [] }, variants: [],
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '', specimenPhrase: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [], sonic: { instruments: [], avoidance: '', reference: '' }, analogues: [],
  },
  {
    id: 'hauntology',
    name: 'Hauntology',
    tagline: 'The fog of half-remembered places. Memory as medium.',
    description:
      'Hauntology is the aesthetic of temporal dislocation — the feeling of revisiting a place through degraded memory, hearing a signal through tape hiss, seeing a landscape through fog that may be real or may be your own forgetting. It is not nostalgia, because nostalgia knows what it misses. Hauntology is the ache for something you cannot quite identify — a childhood game world revisited at midnight, a melody half-heard through a wall, a photograph of a room you may or may not have been in.',
    status: 'available',
    category: 'ambient',
    abstract: 'Hauntology as an aesthetic direction is composed of the elements that evoke temporal displacement — fog, tape degradation, reverb decay, the uncanny stillness of spaces that should be occupied but are not. Its precedents span music, games, and theory: The Caretaker\'s "An Empty Bliss Beyond This World" (ballroom recordings decomposing into dementia), Boards of Canada\'s childhood-broadcast nostalgia, the Ghost Box label\'s imaginary public information films. In games, it is Silent Hill\'s fog world — a town that is your memory of a town, where the architecture shifts because remembering is imprecise. It is Resident Evil\'s mansion corridors heard through ambient reimagining, Half-Life\'s Black Mesa as industrial archaeology, Minecraft\'s old worlds revisited years later when the grass has grown over what you built. Artists like Midwich Music, Survival Spheres, and OBSIDIAN SOUNDFIELDS have built entire channels around this: taking game soundscapes and rendering them as pure atmosphere, stripping away gameplay until only the feeling of having-been-there remains. What separates hauntology from generic ambient is its relationship to source material — it is always haunted by something specific, even if that something can no longer be named. The color is desaturated fog, the shape is the half-visible outline, the sound is reverb trailing into silence. Use this when you want your work to feel like a place someone visited in a dream and is trying to describe from memory.',
    coverColors: ['#1a1e22', '#2a3038', '#8a9098'],
    setTheTone: { tracks: [] },
    variants: [],
    color: {
      palette: ['#0e1114', '#1a1e22', '#2a3038', '#5a6068', '#8a9098', '#c0c4c8'],
      labels: ['Void', 'Fog Base', 'Concrete', 'Overcast', 'Static', 'Bleached'],
      scheme: 'Desaturated cool greys. No pure white — everything is filtered through haze. Occasional warm leak like a faded photograph.',
    },
    typography: {
      primary: 'EB Garamond',
      secondary: 'Courier Prime',
      character: 'Serif that feels inherited, monospace that feels like a log entry or a transcript. Spacing is loose — words float in negative space.',
      specimenPhrase: 'You have been here before.',
    },
    shapeLanguage: {
      forms: ['Soft edges', 'Dissolving outlines', 'Rectangular frames', 'Horizon lines'],
      principle: 'Nothing is fully resolved. Shapes emerge from fog and return to it. The rectangle — the screen, the window, the photograph — is the primary container.',
    },
    materials: [
      { name: 'Magnetic Tape', quality: 'Degraded, warm, hissing — the medium is decaying and that decay is the texture' },
      { name: 'Frosted Glass', quality: 'Translucent, diffusing, obscuring — you can see something through it but not clearly' },
      { name: 'Concrete', quality: 'Brutalist, stained, weather-worn — institutional surfaces that have absorbed decades' },
      { name: 'CRT Phosphor', quality: 'Glowing, scanlined, warm — the light source of remembered screens' },
      { name: 'Fog', quality: 'Volumetric, shifting, depth-obscuring — distance becomes uncertain' },
    ],
    sonic: {
      instruments: [
        { name: 'Tape Loop', character: 'Decaying repetition. The same phrase slightly different each time, wearing away.' },
        { name: 'Reverb Tail', character: 'Spaces larger than their source. A single note in a cathedral that was never there.' },
        { name: 'Field Recording', character: 'Rain, static, distant machinery — the ambient bed of a place with no people.' },
        { name: 'Detuned Piano', character: 'Slightly wrong pitch. The instrument has been sitting in an empty room for years.' },
      ],
      avoidance: 'Crisp digital production. Quantized beats. Anything that sounds "new" or precisely calibrated.',
      reference: 'The Caretaker, Boards of Canada, Midwich Music, Survival Spheres, OBSIDIAN SOUNDFIELDS, Grouper, William Basinski',
    },
    analogues: [
      { title: 'Silent Hill 2', medium: 'Game', note: 'The definitive hauntological game. A town made of guilt and fog, where every environment is a memory that cannot be trusted.', alsoIn: ['horror'] },
      { title: 'Resident Evil', medium: 'Game', note: 'The Spencer Mansion as ambient archaeology — corridors you learn by heart, rooms that feel different each time you return.' },
      { title: 'Half-Life', medium: 'Game', note: 'Black Mesa as industrial ruin. The resonance cascade as the moment a familiar place became permanently wrong.' },
      { title: 'Minecraft', medium: 'Game', note: 'Old survival worlds revisited. The half-finished house, the mine you forgot about. Digital pastoral turning hauntological through the passage of real time.' },
      { title: 'An Empty Bliss Beyond This World', medium: 'Album', note: 'The Caretaker. Ballroom recordings dissolving into static. Memory as a medium that degrades.' },
      { title: 'Music Has the Right to Children', medium: 'Album', note: 'Boards of Canada. Childhood television signals received through analog warmth and slight unease.' },
    ],
  },
  {
    id: 'dark-ambient', name: 'Dark Ambient',
    tagline: 'Pressure and void. The sound of a space that does not want you.',
    description: 'Coming soon.',
    status: 'coming-soon' as const, category: 'ambient',
    coverColors: ['#0a0a0e', '#1a1a22'],
    setTheTone: { tracks: [] }, variants: [],
    color: { palette: [], labels: [], scheme: '' },
    typography: { primary: '', secondary: '', character: '', specimenPhrase: '' },
    shapeLanguage: { forms: [], principle: '' },
    materials: [], sonic: { instruments: [], avoidance: '', reference: '' }, analogues: [],
  },
]

export type Category = {
  id: string
  name: string
  description: string
}

export const categories: Category[] = [
  { id: 'all', name: 'All Genres', description: 'Browse the complete library.' },
  { id: 'fantasy', name: 'Fantasy', description: 'Worlds built on myth, magic, and the weight of legend.' },
  { id: 'scifi', name: 'Sci-Fi / Future', description: 'Technology as environment. Systems that outgrow their makers.' },
  { id: 'horror', name: 'Horror', description: 'Dread as aesthetic. The beauty of what should not be.' },
  { id: 'analog', name: 'Analog / Industrial', description: 'Warmth of physical signal. The machine with a heartbeat.' },
  { id: 'folk', name: 'Folk / Nature', description: 'Rootedness. The world before speed.' },
  { id: 'historical', name: 'Historical / Period', description: 'Time as texture. Architecture as memory.' },
  { id: 'ambient', name: 'Ambient / Atmospheric', description: 'Atmosphere as the primary experience. Fog, memory, threshold.' },
  { id: 'abstract', name: 'Abstract / Experimental', description: 'Mood over meaning. Sensation over narrative.' },
]
