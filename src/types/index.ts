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

export interface StudioSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  heroImage: string;
  manifestoEyebrow: string;
  manifestoTitle: string;
  manifestoLead: string;
  manifestoBody: string;
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
