export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Residential' | 'Commercial' | 'Renovation';
  location: string;
  year: string;
  area: string;
  isFeatured: boolean;
  heroImage: string;
  galleryImages: string[];
  overview: string;
  approach: string;
  materials: string[];
  createdAt?: string;
}

export interface Inquiry {
  id: string;
  clientName: string;
  email: string;
  phone?: string;
  projectType: string;
  location?: string;
  budgetRange?: string;
  estimatedArea?: string;
  message: string;
  status: 'New' | 'Reviewing' | 'Contacted' | 'Completed';
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  location: string;
  image: string;
  bio: string;
}

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

export interface StudioSettings {
  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  heroImage: string;
  heroStatsLocations: string;
  heroStatsDiscipline: string;
  heroStatsMateriality: string;
  heroStatsEthos: string;

  // Manifesto
  manifestoEyebrow: string;
  manifestoTitle: string;
  manifestoLead: string;
  manifestoBody: string;

  // Studio Page Core Principles
  principle1Title: string;
  principle1Text: string;
  principle2Title: string;
  principle2Text: string;
  studioWorkspaceImage: string;

  // 4 Methodology Steps
  step1Title: string;
  step1Text: string;
  step2Title: string;
  step2Text: string;
  step3Title: string;
  step3Text: string;
  step4Title: string;
  step4Text: string;

  // Closing CTA
  ctaEyebrow: string;
  ctaTitle: string;
  ctaItalicSubtitle: string;
  ctaDescription: string;

  // Contact coordinates & Locations
  primaryEmail: string;
  pressEmail: string;
  phoneMilan: string;
  phoneLondon: string;
  locationMilan: string;
  locationLondon: string;
  locationKyoto: string;
  studioHours: string;
}

export interface StudioService {
  id: string;
  number: string;
  title: string;
  tagline: string;
  tag: string;
  image: string;
  description: string;
  scope: string[];
}

export interface User {
  name: string;
  role: string;
  email: string;
}
