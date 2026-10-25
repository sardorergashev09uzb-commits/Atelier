import { Project, StudioSettings, StudioService } from '../types';

export const fallbackSettings: StudioSettings = {
  heroTitle: "Spaces shaped around the way you live.",
  heroSubtitle: "A refined interior architecture practice creating quiet residential and commercial environments characterized by generous proportion, tactile materiality, and natural daylight.",
  heroTagline: "Interior Architecture & Spatial Design",
  heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
  manifestoEyebrow: "Studio Manifesto",
  manifestoTitle: "Quiet architecture for thoughtful living.",
  manifestoLead: "We believe true luxury is not defined by excess, but by the thoughtful calibration of light, silence, and natural materiality.",
  manifestoBody: "Founded with studios in Milan, London, and Kyoto, ATELIER creates spaces that endure far beyond passing trends. Every commission is an unhurried investigation into spatial proportion, acoustic comfort, and tactile finishes that grow more beautiful with time.",
  primaryEmail: "inquire@atelier-studio.com",
  pressEmail: "press@atelier-studio.com",
  phoneMilan: "+39 02 8901 2345",
  phoneLondon: "+44 20 7946 0888",
  locationMilan: "Via Solferino 14, 20121 Milano, Italy",
  locationLondon: "42 Marylebone High St, London W1U 5HF, UK",
  locationKyoto: "Kamigyo Ward, Kyoto 602-0898, Japan",
  studioHours: "Mon – Fri, 09:00 – 18:30 CET",
};

export const fallbackServices: StudioService[] = [
  {
    id: "svc-1",
    number: "01",
    title: "Residential Architecture & Interiors",
    tagline: "Crafting private retreats that resonate with nature and personal ritual.",
    tag: "Custom Homes",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "From standalone coastal villas to penthouse transformations, we design homes through the lens of lived experience. We sculpt natural light, coordinate bespoke joinery, and design floor plans that breathe.",
    scope: [
      "Complete architectural space planning & structural modifications",
      "Bespoke kitchen, bathroom, and dressing room cabinetry design",
      "Architectural lighting schemes & integrated circadian control",
      "Curation of natural stone, plaster finishes, and hardwood flooring",
      "Full contractor coordination & site supervision"
    ]
  },
  {
    id: "svc-2",
    number: "02",
    title: "Commercial, Retail & Hospitality",
    tagline: "Atmospheric public spaces designed for lasting memory and community.",
    tag: "Public Spaces",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    description: "We conceive boutique hospitality venues, private executive offices, and editorial retail spaces that tell a cohesive brand story without resorting to superficial ornament.",
    scope: [
      "Brand atmosphere & sensory spatial identity",
      "Acoustic architecture & soft zoning",
      "High-traffic durable natural material selection",
      "Custom reception desks, banquette seating, and focal bars",
      "Compliance, accessibility, and mechanical integration"
    ]
  },
  {
    id: "svc-3",
    number: "03",
    title: "Historic Preservation & Adaptive Reuse",
    tagline: "Bridging heritage craftsmanship with contemporary spatial clarity.",
    tag: "Heritage",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80",
    description: "We hold deep reverence for historic structures. Our work delicately uncovers original ceiling timbers, stone masonry, and moldings, weaving them together with quiet modern interventions.",
    scope: [
      "Historical archival research & conservation permits",
      "Restoration of original plaster moldings, parquet, and stone",
      "Thermal envelope upgrades and hidden climate systems",
      "Seamless contemporary kitchen & bath insertions"
    ]
  },
  {
    id: "svc-4",
    number: "04",
    title: "Spatial Advisory & Material Consultation",
    tagline: "Targeted architectural counsel for discerning property owners.",
    tag: "Advisory",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    description: "For clients embarking on acquisitions, architectural competitions, or preliminary feasibility evaluations, we provide objective design critique, spatial audits, and material sourcing direction.",
    scope: [
      "Pre-acquisition architectural review & feasibility",
      "Sightline, natural illumination, and floor plan critique",
      "Quarry-direct stone and artisan timber procurement advice",
      "Curated vintage and contemporary design art sourcing"
    ]
  }
];

export const fallbackProjects: Project[] = [
  {
    id: "proj-1",
    slug: "the-quiet-residence",
    title: "The Quiet Residence",
    subtitle: "A sanctuary of natural timber, raw plaster, and shifting daylight.",
    category: "Residential",
    location: "Kyoto, Japan",
    year: "2024",
    area: "340 m²",
    isFeatured: true,
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Conceived as an urban retreat away from the cadence of the city, The Quiet Residence balances traditional Japanese architectural proportions with contemporary European materiality. The project places supreme emphasis on tactile calmness, indirect lighting, and spatial rhythm.",
    approach: "We stripped the interior back to its primary structural envelope, introducing handmade cedar joinery, acoustic lime-washed walls, and bespoke low-slung seating. Every transition between rooms is framed as a pause — a moment to observe the subtle interplay of light and shade across textured surfaces.",
    materials: [
      "Natural Hinoki Cedar",
      "Troweled Lime Plaster",
      "Honed Basalt Flooring",
      "Unlacquered Burnished Brass",
      "Woven Raw Linen"
    ]
  },
  {
    id: "proj-2",
    slug: "casa-terra",
    title: "Casa Terra",
    subtitle: "Sun-drenched coastal villa shaped by porous stone and earthy tones.",
    category: "Residential",
    location: "Mallorca, Spain",
    year: "2023",
    area: "520 m²",
    isFeatured: true,
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Set into the terraced hillside of western Mallorca, Casa Terra dissolves the barrier between interior sanctuary and Mediterranean landscape. The home utilizes local Santanyi limestone and continuous clay surfaces to maintain natural thermal equilibrium.",
    approach: "Large recessed sliding panels allow living areas to open entirely to private courtyards. We collaborated with local stonemasons to carve custom monolithic sinks and fireplace surrounds from single blocks of native stone.",
    materials: [
      "Santanyi Limestone",
      "Terra Cotta Tile",
      "Bleached Oak",
      "Textured Calce Stucco",
      "Weathered Bronze"
    ]
  },
  {
    id: "proj-3",
    slug: "the-olive-apartment",
    title: "The Olive Apartment",
    subtitle: "Classical Milanese proportions reimagined with muted tones and travertine.",
    category: "Renovation",
    location: "Milan, Italy",
    year: "2024",
    area: "195 m²",
    isFeatured: true,
    heroImage: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1800&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "A thoughtful restoration within an early 20th-century Liberty-style building in the Brera district. We retained the original ceiling cornices while creating an open, fluid sequence of rooms united by muted sage and warm ivory hues.",
    approach: "The custom kitchen features a dramatic monolithic Roman travertine island with concealed fluted cabinetry. Subtle olive-green millwork provides a delicate architectural counterpoint to the warm plaster backdrop.",
    materials: [
      "Roman Silver Travertine",
      "Muted Olive Lacquer",
      "Herringbone French Oak",
      "Textured Bouclé Fabric",
      "Aged Nickel Fixtures"
    ]
  },
  {
    id: "proj-4",
    slug: "northline-residence",
    title: "Northline Residence",
    subtitle: "Nordic restraint meets warm textural minimalism in a top-floor haven.",
    category: "Residential",
    location: "Stockholm, Sweden",
    year: "2023",
    area: "260 m²",
    isFeatured: false,
    heroImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Designed for a collector of Scandinavian ceramics and modern art, Northline Residence leverages soft northern natural light. High ceilings and custom built-in niches create a gallery-like atmosphere for daily living.",
    approach: "By orchestrating subtle gradations of warm grey and oatmeal tones, the spaces feel luminous even through dark winter months. Floor-to-ceiling pivot doors maintain architectural order.",
    materials: [
      "Dinesen Douglas Fir",
      "Gotland Sandstone",
      "Sheer Wool Drapery",
      "Matte Blackened Steel",
      "Natural Papercord"
    ]
  },
  {
    id: "proj-5",
    slug: "still-house",
    title: "Still House",
    subtitle: "A secluded forest pavilion crafted in dark oak, glass, and cast concrete.",
    category: "Residential",
    location: "Zurich, Switzerland",
    year: "2024",
    area: "410 m²",
    isFeatured: true,
    heroImage: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1800&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Nestled on a wooded incline overlooking the lake, Still House was designed to evoke a permanent sense of contemplation. The structure merges board-formed concrete walls with deep fumed oak cabinetry.",
    approach: "Expansive triple-glazed walls capture changing seasonal foliage. A central sunken hearth serves as the gathering core, grounding the open layout with warmth and intimacy.",
    materials: [
      "Board-Formed Architectural Concrete",
      "Fumed European Oak",
      "Nero Marquina Marble",
      "Brushed Gunmetal",
      "Cast Bronze Handles"
    ]
  },
  {
    id: "proj-6",
    slug: "the-courtyard-office",
    title: "The Courtyard Office",
    subtitle: "A peaceful creative studio organized around an open-air central garden.",
    category: "Commercial",
    location: "London, UK",
    year: "2024",
    area: "650 m²",
    isFeatured: false,
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Commissioned as the headquarters for an architectural publishing house in Marylebone, this workspace rethinks commercial environments through domestic proportions, soft acoustic felt, and abundant greenery.",
    approach: "Circulation wraps around a landscaped glass atrium that channels daylight deep into meeting spaces. Bespoke library shelving acts as both storage and soft spatial partitions.",
    materials: [
      "Reclaimed London Stock Brick",
      "Solid Ash Tables",
      "Recycled Felt Acoustic Panels",
      "Crittall Steel Glazing",
      "Plantation Greens"
    ]
  }
];
