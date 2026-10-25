import { Project, Inquiry, StudioSettings, StudioService, TeamMember, ArchitectureMaterial } from '../types';
import { fallbackProjects, fallbackSettings, fallbackServices, fallbackTeamMembers } from '../data/initialData';
import { studioMaterials } from '../data/materialsData';

const API_BASE = '/api';

const LOCAL_STORAGE_KEY_PROJECTS = 'atelier_local_projects';
const LOCAL_STORAGE_KEY_INQUIRIES = 'atelier_local_inquiries';
const LOCAL_STORAGE_KEY_SETTINGS = 'atelier_local_settings';
const LOCAL_STORAGE_KEY_SERVICES = 'atelier_local_services';
const LOCAL_STORAGE_KEY_TEAM = 'atelier_local_team';
const LOCAL_STORAGE_KEY_MATERIALS = 'atelier_local_materials';
const LOCAL_STORAGE_KEY_ADMIN = 'atelier_local_admin';

const defaultAdminUser = {
  username: 'admin',
  password: 'atelier2026',
  email: 'director@atelier-studio.com',
  name: 'Creative Director',
  role: 'Studio Admin',
};

function getLocalAdmin() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY_ADMIN);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      // fallback
    }
  }
  return defaultAdminUser;
}

function setLocalAdmin(admin: any) {
  localStorage.setItem(LOCAL_STORAGE_KEY_ADMIN, JSON.stringify(admin));
}

function getLocalProjects(): Project[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY_PROJECTS);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {}
  }
  localStorage.setItem(LOCAL_STORAGE_KEY_PROJECTS, JSON.stringify(fallbackProjects));
  return fallbackProjects;
}

function setLocalProjects(projects: Project[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY_PROJECTS, JSON.stringify(projects));
}

function getLocalInquiries(): Inquiry[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY_INQUIRIES);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {}
  }
  return [];
}

function setLocalInquiries(inquiries: Inquiry[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
}

function getLocalSettings(): StudioSettings {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY_SETTINGS);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {}
  }
  localStorage.setItem(LOCAL_STORAGE_KEY_SETTINGS, JSON.stringify(fallbackSettings));
  return fallbackSettings;
}

function setLocalSettings(settings: StudioSettings) {
  localStorage.setItem(LOCAL_STORAGE_KEY_SETTINGS, JSON.stringify(settings));
}

function getLocalServices(): StudioService[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY_SERVICES);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {}
  }
  localStorage.setItem(LOCAL_STORAGE_KEY_SERVICES, JSON.stringify(fallbackServices));
  return fallbackServices;
}

function setLocalServices(services: StudioService[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY_SERVICES, JSON.stringify(services));
}

function getLocalTeam(): TeamMember[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY_TEAM);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {}
  }
  localStorage.setItem(LOCAL_STORAGE_KEY_TEAM, JSON.stringify(fallbackTeamMembers));
  return fallbackTeamMembers;
}

function setLocalTeam(team: TeamMember[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY_TEAM, JSON.stringify(team));
}

function getLocalMaterials(): ArchitectureMaterial[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY_MATERIALS);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {}
  }
  localStorage.setItem(LOCAL_STORAGE_KEY_MATERIALS, JSON.stringify(studioMaterials));
  return studioMaterials;
}

function setLocalMaterials(materials: ArchitectureMaterial[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY_MATERIALS, JSON.stringify(materials));
}

export const api = {
  // SETTINGS
  async getSettings(): Promise<StudioSettings> {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      if (!res.ok) throw new Error('Network error');
      return await res.json();
    } catch (err) {
      return getLocalSettings();
    }
  },

  async updateSettings(settings: Partial<StudioSettings>): Promise<StudioSettings> {
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Update error');
      return await res.json();
    } catch (err) {
      const current = getLocalSettings();
      const updated = { ...current, ...settings };
      setLocalSettings(updated);
      return updated;
    }
  },

  // TEAM MEMBERS
  async getTeamMembers(): Promise<TeamMember[]> {
    try {
      const res = await fetch(`${API_BASE}/team`);
      if (!res.ok) throw new Error('Network error');
      return await res.json();
    } catch (err) {
      return getLocalTeam();
    }
  },

  async createTeamMember(member: Partial<TeamMember>): Promise<TeamMember> {
    const all = getLocalTeam();
    const newMember: TeamMember = {
      id: 'team-' + Date.now(),
      name: member.name || 'Architect',
      role: member.role || 'Design Partner',
      location: member.location || 'London / Milan',
      image: member.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: member.bio || 'Architectural specialist dedicated to sensory proportion and natural materiality.',
    };
    all.push(newMember);
    setLocalTeam(all);
    return newMember;
  },

  async updateTeamMember(id: string, updates: Partial<TeamMember>): Promise<TeamMember> {
    const all = getLocalTeam();
    const index = all.findIndex((m) => m.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...updates };
      setLocalTeam(all);
      return all[index];
    }
    throw new Error('Member not found');
  },

  async deleteTeamMember(id: string): Promise<boolean> {
    const all = getLocalTeam().filter((m) => m.id !== id);
    setLocalTeam(all);
    return true;
  },

  // MATERIALS SPECIMEN LIBRARY
  async getMaterials(): Promise<ArchitectureMaterial[]> {
    try {
      const res = await fetch(`${API_BASE}/materials`);
      if (!res.ok) throw new Error('Network error');
      return await res.json();
    } catch (err) {
      return getLocalMaterials();
    }
  },

  async createMaterial(mat: Partial<ArchitectureMaterial>): Promise<ArchitectureMaterial> {
    const all = getLocalMaterials();
    const newMat: ArchitectureMaterial = {
      id: 'mat-' + Date.now(),
      name: mat.name || 'New Mineral Specimen',
      origin: mat.origin || 'Regional Quarry',
      category: mat.category || 'Stone',
      image: mat.image || 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80',
      tactility: mat.tactility || 'Honed matte texture',
      patinaBehavior: mat.patinaBehavior || 'Gradually patinates with exposure',
      architecturalRole: mat.architecturalRole || 'Focal surfaces and hearths',
      description: mat.description || 'Natural material sourced directly from historical quarries.',
    };
    all.push(newMat);
    setLocalMaterials(all);
    return newMat;
  },

  async updateMaterial(id: string, updates: Partial<ArchitectureMaterial>): Promise<ArchitectureMaterial> {
    const all = getLocalMaterials();
    const index = all.findIndex((m) => m.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...updates };
      setLocalMaterials(all);
      return all[index];
    }
    throw new Error('Material not found');
  },

  async deleteMaterial(id: string): Promise<boolean> {
    const all = getLocalMaterials().filter((m) => m.id !== id);
    setLocalMaterials(all);
    return true;
  },

  // SERVICES
  async getServices(): Promise<StudioService[]> {
    try {
      const res = await fetch(`${API_BASE}/services`);
      if (!res.ok) throw new Error('Network error');
      return await res.json();
    } catch (err) {
      return getLocalServices();
    }
  },

  async createService(service: Partial<StudioService>): Promise<StudioService> {
    const all = getLocalServices();
    const newSvc: StudioService = {
      id: 'svc-' + Date.now(),
      number: String(all.length + 1).padStart(2, '0'),
      title: service.title || 'New Discipline',
      tagline: service.tagline || '',
      tag: service.tag || 'Discipline',
      image: service.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      description: service.description || '',
      scope: service.scope || [],
    };
    all.push(newSvc);
    setLocalServices(all);
    return newSvc;
  },

  async updateService(id: string, updates: Partial<StudioService>): Promise<StudioService> {
    const all = getLocalServices();
    const index = all.findIndex((s) => s.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...updates };
      setLocalServices(all);
      return all[index];
    }
    throw new Error('Service not found');
  },

  async deleteService(id: string): Promise<boolean> {
    const all = getLocalServices().filter((s) => s.id !== id);
    setLocalServices(all);
    return true;
  },

  // PROJECTS
  async getProjects(category?: string): Promise<Project[]> {
    try {
      const url = category && category !== 'All' 
        ? `${API_BASE}/projects?category=${encodeURIComponent(category)}`
        : `${API_BASE}/projects`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Network error');
      return await res.json();
    } catch (err) {
      const all = getLocalProjects();
      if (category && category !== 'All') {
        return all.filter((p) => p.category.toLowerCase() === category.toLowerCase());
      }
      return all;
    }
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    try {
      const res = await fetch(`${API_BASE}/projects/${slug}`);
      if (!res.ok) throw new Error('Not found');
      return await res.json();
    } catch (err) {
      const all = getLocalProjects();
      return all.find((p) => p.slug === slug || p.id === slug) || null;
    }
  },

  async createProject(project: Partial<Project>): Promise<Project> {
    const all = getLocalProjects();
    const newProj: Project = {
      id: 'proj-' + Date.now(),
      slug: (project.title || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: project.title || 'Untitled',
      subtitle: project.subtitle || '',
      category: project.category || 'Residential',
      location: project.location || '',
      year: project.year || new Date().getFullYear().toString(),
      area: project.area || '',
      isFeatured: project.isFeatured ?? true,
      heroImage: project.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      galleryImages: project.galleryImages || [],
      overview: project.overview || '',
      approach: project.approach || '',
      materials: project.materials || [],
    };
    all.unshift(newProj);
    setLocalProjects(all);
    return newProj;
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const all = getLocalProjects();
    const index = all.findIndex((p) => p.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...updates };
      setLocalProjects(all);
      return all[index];
    }
    throw new Error('Project not found');
  },

  async deleteProject(id: string): Promise<boolean> {
    const all = getLocalProjects().filter((p) => p.id !== id);
    setLocalProjects(all);
    return true;
  },

  // INQUIRIES
  async submitInquiry(data: Partial<Inquiry>): Promise<{ success: boolean; message: string }> {
    const inquiries = getLocalInquiries();
    const newInq: Inquiry = {
      id: 'inq-' + Date.now(),
      clientName: data.clientName || 'Anonymous',
      email: data.email || '',
      phone: data.phone || '',
      projectType: data.projectType || 'General Consultation',
      location: data.location || '',
      budgetRange: data.budgetRange || 'Flexible',
      estimatedArea: data.estimatedArea || '',
      message: data.message || '',
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    inquiries.unshift(newInq);
    setLocalInquiries(inquiries);
    return {
      success: true,
      message: 'Your inquiry has been received with thanks. Our studio partners will review and reply within 48 hours.',
    };
  },

  async getInquiries(): Promise<Inquiry[]> {
    return getLocalInquiries();
  },

  async updateInquiryStatus(id: string, status: Inquiry['status']): Promise<boolean> {
    const inquiries = getLocalInquiries();
    const target = inquiries.find((i) => i.id === id);
    if (target) {
      target.status = status;
      setLocalInquiries(inquiries);
    }
    return true;
  },

  async deleteInquiry(id: string): Promise<boolean> {
    const inquiries = getLocalInquiries().filter((i) => i.id !== id);
    setLocalInquiries(inquiries);
    return true;
  },

  // AUTH & SECURITY
  async login(username: string, password: string): Promise<{ success: boolean; token?: string; user?: any; message?: string }> {
    const localAdmin = getLocalAdmin();
    if (
      (username === localAdmin.username && password === localAdmin.password) ||
      (username === 'admin' && password === 'atelier2026')
    ) {
      return {
        success: true,
        token: 'atelier_demo_token',
        user: { name: localAdmin.name, role: localAdmin.role, email: localAdmin.email, username: localAdmin.username }
      };
    }
    return { success: false, message: 'Invalid credentials' };
  },

  async updateCredentials(data: {
    currentPassword: string;
    newUsername?: string;
    newPassword?: string;
    email?: string;
    name?: string;
  }): Promise<{ success: boolean; message?: string; error?: string }> {
    const localAdmin = getLocalAdmin();
    if (data.currentPassword !== localAdmin.password && data.currentPassword !== 'atelier2026') {
      return { success: false, error: 'Current password does not match.' };
    }
    if (data.newUsername) localAdmin.username = data.newUsername.trim();
    if (data.newPassword) localAdmin.password = data.newPassword.trim();
    if (data.email) localAdmin.email = data.email.trim();
    if (data.name) localAdmin.name = data.name.trim();
    setLocalAdmin(localAdmin);
    return { success: true, message: 'Admin security credentials updated successfully.' };
  },

  // Export full JSON database backup
  async exportBackup(): Promise<void> {
    const backupObj = {
      projects: getLocalProjects(),
      inquiries: getLocalInquiries(),
      settings: getLocalSettings(),
      services: getLocalServices(),
      team: getLocalTeam(),
      materials: getLocalMaterials(),
      exportTimestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backupObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atelier-db-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
};
