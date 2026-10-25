export interface ArchitectureMaterial {
  id: string;
  name: string;
  origin: string;
  category: 'Stone' | 'Timber' | 'Plaster' | 'Metal' | 'Fabric';
  image: string;
  tactility: string;
  patinaBehavior: string;
  architecturalRole: string;
  description: string;
}

export const studioMaterials: ArchitectureMaterial[] = [
  {
    id: "mat-1",
    name: "Santanyi Limestone",
    origin: "Mallorca, Spain",
    category: "Stone",
    image: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80",
    tactility: "Porous, velvety matte with subtle fossilized grain",
    patinaBehavior: "Gathers soft golden amber warmth when exposed to Mediterranean sunlight",
    architecturalRole: "Monolithic sinks, exterior-to-interior courtyard thresholds, cantilevered stairs",
    description: "Quarried directly from coastal Mallorcan deposits, Santanyi stone maintains natural thermal inertia while establishing a timeless dialog with regional earth tones."
  },
  {
    id: "mat-2",
    name: "Natural Hinoki Cedar",
    origin: "Kiso Valley, Nagano, Japan",
    category: "Timber",
    image: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80",
    tactility: "Silky, warm to bare feet, naturally fragrant",
    patinaBehavior: "Matures into a dignified silvery-amber hue over decades",
    architecturalRole: "Concealed structural screens, soaking tubs, ceremonial transition portals",
    description: "A revered sacred timber celebrated for straight grain and organic insect resistance. Hand-planed without chemical varnishes to preserve its breathability and tactile aroma."
  },
  {
    id: "mat-3",
    name: "Roman Silver Travertine",
    origin: "Tivoli Quarries, Rome, Italy",
    category: "Stone",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    tactility: "Cross-cut, vein-matched honed finish with micro-cavities",
    patinaBehavior: "Extremely resilient, develops an unforced antique sheen with gentle maintenance",
    architecturalRole: "Kitchen focal islands, continuous slab flooring, fireplace hearth surrounds",
    description: "The quintessential medium of classical Roman architecture, cross-cut silver travertine balances cool grey sedimentary banding with warm ivory undercurrents."
  },
  {
    id: "mat-4",
    name: "Troweled Lime Plaster (Calce)",
    origin: "Veneto, Italy",
    category: "Plaster",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    tactility: "Soft chalky texture, diffuse light scatter without gloss",
    patinaBehavior: "Carbonates over time to become harder than ordinary drywall, absorbing room acoustics",
    architecturalRole: "Seamless wall-to-ceiling wraps, shadow gaps, organic vaulted alcoves",
    description: "Formulated with aged slaked lime and fine Carrara marble dust. Applied in multiple ultra-thin layers using Japanese trowels to diffuse daylight into a serene ambient glow."
  },
  {
    id: "mat-5",
    name: "Fumed European Oak",
    origin: "Burgundy, France",
    category: "Timber",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    tactility: "Deep wire-brushed grain, dense and grounding",
    patinaBehavior: "Natural ammonia fuming reacts with internal tannins, creating rich dark tones that run through the entire depth",
    architecturalRole: "Library cabinetry, bespoke pivot doors, concealed pantry wall paneling",
    description: "Unlike surface stains, fuming changes the cellular chemistry of the oak, producing nuanced smoke-charcoal tones with extraordinary depth and resistance to scuffs."
  },
  {
    id: "mat-6",
    name: "Unlacquered Burnished Brass",
    origin: "Milan, Italy",
    category: "Metal",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    tactility: "Heavy solid mass, hand-burnished directional brush lines",
    patinaBehavior: "Gradually deepens through human touch, oxidizing into an organic mottled patina",
    architecturalRole: "Custom cabinet pulls, recessed light trims, bathroom water fittings",
    description: "Left entirely uncoated by protective lacquer so that the metal actively records the life and rituals of the residence, growing more intimate with each touch."
  },
  {
    id: "mat-7",
    name: "Honed Basalt Flooring",
    origin: "Sicily, Italy",
    category: "Stone",
    image: "https://images.unsplash.com/photo-1598887142487-3c854d51d2c7?auto=format&fit=crop&w=800&q=80",
    tactility: "Ultra-fine crystalline matte texture, cool and steady",
    patinaBehavior: "Impervious to water and thermal shock, maintains solemn dark grey tone",
    architecturalRole: "Spa zones, entrance vestibules, open-air gallery corridors",
    description: "Cut from ancient volcanic basalt flows. When honed, it reveals minute grey-blue mineral inclusions that ground open minimalist spaces with geological weight."
  },
  {
    id: "mat-8",
    name: "Woven Raw Belgian Linen",
    origin: "Flanders, Belgium",
    category: "Fabric",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    tactility: "Loose textured slub, heavy drape, airy breathability",
    patinaBehavior: "Softens naturally with atmospheric humidity and laundering",
    architecturalRole: "Floor-to-ceiling sheer acoustic drapery, bespoke upholstered low daybeds",
    description: "Unbleached and un-dyed organic flax, celebrating natural variations in oat and wheat hues. Gently filters direct sunlight while softening room acoustic reflections."
  }
];
