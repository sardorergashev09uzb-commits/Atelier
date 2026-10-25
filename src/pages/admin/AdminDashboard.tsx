import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Project, Inquiry, StudioSettings, StudioService, TeamMember, ArchitectureMaterial } from '../../types';
import { api } from '../../services/api';
import { fallbackSettings } from '../../data/initialData';
import { 
  Plus, Trash2, Edit3, Eye, LogOut, CheckCircle, Clock, ExternalLink, 
  Settings, Briefcase, FileText, Save, KeyRound, Download, Search, 
  Menu, X, Lock, AlertCircle, Users, Sparkles 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [settings, setSettings] = useState<StudioSettings>(fallbackSettings);
  const [services, setServices] = useState<StudioService[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [materials, setMaterials] = useState<ArchitectureMaterial[]>([]);

  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries' | 'services' | 'team' | 'materials' | 'settings' | 'security'>('projects');
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Search & Filter States
  const [projectSearch, setProjectSearch] = useState('');
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('All');

  // Security Form State
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newUsername: 'admin',
    newPassword: '',
    confirmPassword: '',
    name: 'Creative Director',
    email: 'director@atelier-studio.com',
  });
  const [securityStatus, setSecurityStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [securityLoading, setSecurityLoading] = useState(false);

  // Project Modal State
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    subtitle: '',
    category: 'Residential',
    location: '',
    year: '2025',
    area: '300 m²',
    isFeatured: true,
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: '',
    approach: '',
    materials: ['Natural Timber', 'Lime Plaster', 'Honed Stone'],
  });
  const [materialInput, setMaterialInput] = useState('');

  // Service Modal State
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<Partial<StudioService>>({
    number: '05',
    title: '',
    tagline: '',
    tag: 'Discipline',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: '',
    scope: ['Space planning', 'Bespoke detailing'],
  });
  const [scopeInput, setScopeInput] = useState('');

  // Team Member Modal State
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [teamForm, setTeamForm] = useState<Partial<TeamMember>>({
    name: '',
    role: '',
    location: 'Milan',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: '',
  });

  // Material Specimen Modal State
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(null);
  const [materialForm, setMaterialForm] = useState<Partial<ArchitectureMaterial>>({
    name: '',
    origin: '',
    category: 'Stone',
    image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80',
    tactility: '',
    patinaBehavior: '',
    architecturalRole: '',
    description: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('atelier_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    const [pData, iData, sData, svData, tData, mData] = await Promise.all([
      api.getProjects(),
      api.getInquiries(),
      api.getSettings(),
      api.getServices(),
      api.getTeamMembers(),
      api.getMaterials(),
    ]);
    setProjects(pData);
    setInquiries(iData);
    if (sData) setSettings(sData);
    if (svData) setServices(svData);
    if (tData) setTeam(tData);
    if (mData) setMaterials(mData);
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('atelier_token');
    navigate('/admin/login');
  };

  // --- Security ---
  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityStatus(null);
    if (securityForm.newPassword && securityForm.newPassword !== securityForm.confirmPassword) {
      setSecurityStatus({ type: 'error', message: 'New password and confirm password do not match.' });
      return;
    }
    if (securityForm.newPassword && securityForm.newPassword.length < 6) {
      setSecurityStatus({ type: 'error', message: 'New password must be at least 6 characters long.' });
      return;
    }

    setSecurityLoading(true);
    const res = await api.updateCredentials({
      currentPassword: securityForm.currentPassword,
      newUsername: securityForm.newUsername,
      newPassword: securityForm.newPassword || undefined,
      email: securityForm.email,
      name: securityForm.name,
    });
    setSecurityLoading(false);

    if (res.success) {
      setSecurityStatus({ type: 'success', message: res.message || 'Credentials successfully updated!' });
      setSecurityForm((prev) => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } else {
      setSecurityStatus({ type: 'error', message: res.error || 'Failed to update credentials. Please check current password.' });
    }
  };

  // --- Projects ---
  const openNewProjectModal = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: '',
      subtitle: '',
      category: 'Residential',
      location: '',
      year: new Date().getFullYear().toString(),
      area: '250 m²',
      isFeatured: true,
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
      ],
      overview: 'A thoughtful architectural interior focusing on daylight and tactile materials.',
      approach: 'Constructed using bespoke joinery, soft indirect lighting, and neutral stone.',
      materials: ['Natural Timber', 'Lime Plaster', 'Honed Stone'],
    });
    setShowProjectModal(true);
  };

  const openEditProjectModal = (project: Project) => {
    setEditingProjectId(project.id);
    setProjectForm(project);
    setShowProjectModal(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProjectId) {
      await api.updateProject(editingProjectId, projectForm);
    } else {
      await api.createProject(projectForm);
    }
    setShowProjectModal(false);
    loadData();
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"?`)) {
      await api.deleteProject(id);
      loadData();
    }
  };

  // --- Inquiries ---
  const handleStatusChange = async (inquiryId: string, status: Inquiry['status']) => {
    await api.updateInquiryStatus(inquiryId, status);
    loadData();
  };

  const handleDeleteInquiry = async (inquiryId: string) => {
    if (window.confirm('Delete this inquiry record?')) {
      await api.deleteInquiry(inquiryId);
      loadData();
    }
  };

  // --- Settings ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.updateSettings(settings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // --- Services ---
  const openNewServiceModal = () => {
    setEditingServiceId(null);
    setServiceForm({
      number: String(services.length + 1).padStart(2, '0'),
      title: '',
      tagline: '',
      tag: 'Discipline',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      description: '',
      scope: ['Architectural design', 'On-site craft supervision'],
    });
    setShowServiceModal(true);
  };

  const openEditServiceModal = (svc: StudioService) => {
    setEditingServiceId(svc.id);
    setServiceForm(svc);
    setShowServiceModal(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingServiceId) {
      await api.updateService(editingServiceId, serviceForm);
    } else {
      await api.createService(serviceForm);
    }
    setShowServiceModal(false);
    loadData();
  };

  const handleDeleteService = async (id: string, title: string) => {
    if (window.confirm(`Delete discipline "${title}"?`)) {
      await api.deleteService(id);
      loadData();
    }
  };

  // --- Team ---
  const openNewTeamModal = () => {
    setEditingTeamId(null);
    setTeamForm({
      name: '',
      role: '',
      location: 'Milan / London',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: '',
    });
    setShowTeamModal(true);
  };

  const openEditTeamModal = (m: TeamMember) => {
    setEditingTeamId(m.id);
    setTeamForm(m);
    setShowTeamModal(true);
  };

  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeamId) {
      await api.updateTeamMember(editingTeamId, teamForm);
    } else {
      await api.createTeamMember(teamForm);
    }
    setShowTeamModal(false);
    loadData();
  };

  const handleDeleteTeam = async (id: string, name: string) => {
    if (window.confirm(`Delete team member "${name}"?`)) {
      await api.deleteTeamMember(id);
      loadData();
    }
  };

  // --- Materials ---
  const openNewMaterialModal = () => {
    setEditingMaterialId(null);
    setMaterialForm({
      name: '',
      origin: '',
      category: 'Stone',
      image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80',
      tactility: '',
      patinaBehavior: '',
      architecturalRole: '',
      description: '',
    });
    setShowMaterialModal(true);
  };

  const openEditMaterialModal = (mat: ArchitectureMaterial) => {
    setEditingMaterialId(mat.id);
    setMaterialForm(mat);
    setShowMaterialModal(true);
  };

  const handleSaveMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMaterialId) {
      await api.updateMaterial(editingMaterialId, materialForm);
    } else {
      await api.createMaterial(materialForm);
    }
    setShowMaterialModal(false);
    loadData();
  };

  const handleDeleteMaterial = async (id: string, name: string) => {
    if (window.confirm(`Delete material specimen "${name}"?`)) {
      await api.deleteMaterial(id);
      loadData();
    }
  };

  const addScopeItem = () => {
    if (scopeInput.trim()) {
      setServiceForm({
        ...serviceForm,
        scope: [...(serviceForm.scope || []), scopeInput.trim()],
      });
      setScopeInput('');
    }
  };

  const removeScopeItem = (index: number) => {
    const list = [...(serviceForm.scope || [])];
    list.splice(index, 1);
    setServiceForm({ ...serviceForm, scope: list });
  };

  const addMaterialTag = () => {
    if (materialInput.trim()) {
      setProjectForm({
        ...projectForm,
        materials: [...(projectForm.materials || []), materialInput.trim()],
      });
      setMaterialInput('');
    }
  };

  const removeMaterialTag = (index: number) => {
    const list = [...(projectForm.materials || [])];
    list.splice(index, 1);
    setProjectForm({ ...projectForm, materials: list });
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
    p.location.toLowerCase().includes(projectSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(projectSearch.toLowerCase())
  );

  const filteredInquiries = inquiries.filter((i) => {
    const matchQuery =
      i.clientName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      i.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      i.projectType.toLowerCase().includes(inquirySearch.toLowerCase());
    const matchStatus = inquiryStatusFilter === 'All' || i.status === inquiryStatusFilter;
    return matchQuery && matchStatus;
  });

  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;

  return (
    <div className="min-h-screen bg-atelier-ivory text-atelier-charcoal flex">
      {/* ---------------- SIDEBAR (DESKTOP) ---------------- */}
      <aside className="hidden lg:flex w-64 bg-atelier-cream border-r border-atelier-charcoal/10 flex-col justify-between shrink-0 sticky top-0 h-screen">
        <div>
          <div className="p-6 border-b border-atelier-charcoal/10">
            <Link to="/" className="group flex flex-col items-start focus:outline-none">
              <span className="font-serif tracking-[0.24em] text-xl font-normal text-atelier-charcoal">
                ATELIER
              </span>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-[9px] tracking-editorial uppercase text-atelier-muted">
                  Control Suite
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-atelier-olive" />
              </div>
            </Link>
          </div>

          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs tracking-editorial uppercase transition-all rounded ${
                activeTab === 'projects'
                  ? 'bg-atelier-charcoal text-atelier-ivory font-medium'
                  : 'text-atelier-muted hover:text-atelier-charcoal hover:bg-atelier-sand/40'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4 shrink-0" />
                <span>Projects</span>
              </div>
              <span className="text-[10px] font-mono">{projects.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs tracking-editorial uppercase transition-all rounded ${
                activeTab === 'inquiries'
                  ? 'bg-atelier-charcoal text-atelier-ivory font-medium'
                  : 'text-atelier-muted hover:text-atelier-charcoal hover:bg-atelier-sand/40'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Inquiries</span>
              </div>
              {newInquiriesCount > 0 ? (
                <span className="text-[10px] bg-atelier-olive text-atelier-ivory px-2 py-0.5 rounded-full font-mono font-medium">
                  {newInquiriesCount} New
                </span>
              ) : (
                <span className="text-[10px] text-atelier-muted font-mono">{inquiries.length}</span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs tracking-editorial uppercase transition-all rounded ${
                activeTab === 'services'
                  ? 'bg-atelier-charcoal text-atelier-ivory font-medium'
                  : 'text-atelier-muted hover:text-atelier-charcoal hover:bg-atelier-sand/40'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Briefcase className="w-4 h-4 shrink-0" />
                <span>Disciplines</span>
              </div>
              <span className="text-[10px] text-atelier-muted font-mono">{services.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs tracking-editorial uppercase transition-all rounded ${
                activeTab === 'team'
                  ? 'bg-atelier-charcoal text-atelier-ivory font-medium'
                  : 'text-atelier-muted hover:text-atelier-charcoal hover:bg-atelier-sand/40'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 shrink-0" />
                <span>Team Members</span>
              </div>
              <span className="text-[10px] text-atelier-muted font-mono">{team.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('materials')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs tracking-editorial uppercase transition-all rounded ${
                activeTab === 'materials'
                  ? 'bg-atelier-charcoal text-atelier-ivory font-medium'
                  : 'text-atelier-muted hover:text-atelier-charcoal hover:bg-atelier-sand/40'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Materials Library</span>
              </div>
              <span className="text-[10px] text-atelier-muted font-mono">{materials.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs tracking-editorial uppercase transition-all rounded ${
                activeTab === 'settings'
                  ? 'bg-atelier-charcoal text-atelier-ivory font-medium'
                  : 'text-atelier-muted hover:text-atelier-charcoal hover:bg-atelier-sand/40'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Settings className="w-4 h-4 shrink-0" />
                <span>Master Settings</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs tracking-editorial uppercase transition-all rounded ${
                activeTab === 'security'
                  ? 'bg-atelier-charcoal text-atelier-ivory font-medium'
                  : 'text-atelier-muted hover:text-atelier-charcoal hover:bg-atelier-sand/40'
              }`}
            >
              <div className="flex items-center space-x-3">
                <KeyRound className="w-4 h-4 shrink-0" />
                <span>Security & Password</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-atelier-charcoal/10 space-y-2 bg-atelier-cream">
          <button
            onClick={() => api.exportBackup()}
            className="w-full flex items-center space-x-2 px-3 py-2 text-[11px] uppercase tracking-wider text-atelier-muted hover:text-atelier-charcoal hover:bg-atelier-sand/40 transition-colors rounded"
          >
            <Download className="w-3.5 h-3.5 text-atelier-olive" />
            <span>Export Database (.json)</span>
          </button>

          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center space-x-2 px-3 py-2 text-[11px] uppercase tracking-wider text-atelier-muted hover:text-atelier-charcoal hover:bg-atelier-sand/40 transition-colors rounded"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </Link>

          <div className="pt-2 border-t border-atelier-charcoal/10 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-atelier-charcoal truncate max-w-[120px]">
                {securityForm.name}
              </span>
              <span className="text-[9px] text-atelier-muted truncate max-w-[120px]">
                {securityForm.email}
              </span>
            </div>
            <button onClick={handleLogout} className="p-1.5 text-atelier-muted hover:text-red-700" title="Sign Out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ---------------- MOBILE DRAWER ---------------- */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="w-64 bg-atelier-cream border-r border-atelier-charcoal/10 flex flex-col justify-between p-4 z-50">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-atelier-charcoal/10 mb-4">
                <span className="font-serif tracking-[0.22em] text-lg">ATELIER</span>
                <button onClick={() => setMobileSidebarOpen(false)} className="p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-1.5">
                {[
                  { tab: 'projects', label: 'Projects', icon: FileText, count: projects.length },
                  { tab: 'inquiries', label: 'Inquiries', icon: Clock, count: inquiries.length },
                  { tab: 'services', label: 'Disciplines', icon: Briefcase, count: services.length },
                  { tab: 'team', label: 'Team', icon: Users, count: team.length },
                  { tab: 'materials', label: 'Materials', icon: Sparkles, count: materials.length },
                  { tab: 'settings', label: 'Settings', icon: Settings },
                  { tab: 'security', label: 'Security', icon: KeyRound },
                ].map((item: any) => (
                  <button
                    key={item.tab}
                    onClick={() => { setActiveTab(item.tab); setMobileSidebarOpen(false); }}
                    className="w-full text-left p-2.5 text-xs uppercase tracking-wider flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && <span className="font-mono text-[10px]">{item.count}</span>}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-atelier-charcoal/10 space-y-2">
              <button onClick={() => api.exportBackup()} className="w-full text-left text-xs uppercase text-atelier-olive py-2">
                Export Database
              </button>
              <button onClick={handleLogout} className="w-full text-left text-xs uppercase text-red-700 py-2">
                Sign Out
              </button>
            </div>
          </div>
          <div onClick={() => setMobileSidebarOpen(false)} className="flex-1 bg-atelier-dark/50" />
        </div>
      )}

      {/* ---------------- MAIN CONTENT AREA ---------------- */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden bg-atelier-cream border-b border-atelier-charcoal/10 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <button onClick={() => setMobileSidebarOpen(true)} className="p-1">
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-serif tracking-[0.2em] text-base font-normal">ATELIER PORTAL</span>
          </div>
          <Link to="/" target="_blank" className="p-1.5 text-atelier-muted">
            <ExternalLink className="w-4 h-4" />
          </Link>
        </header>

        <main className="p-6 md:p-10 max-w-6xl w-full mx-auto">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-atelier-cream p-4 border border-atelier-charcoal/10">
              <span className="text-[9px] tracking-editorial uppercase text-atelier-muted block">Projects</span>
              <div className="font-serif text-2xl text-atelier-charcoal mt-1">{projects.length}</div>
            </div>
            <div className="bg-atelier-cream p-4 border border-atelier-charcoal/10">
              <span className="text-[9px] tracking-editorial uppercase text-atelier-muted block">Inquiries</span>
              <div className="font-serif text-2xl text-atelier-charcoal mt-1">{inquiries.length}</div>
            </div>
            <div className="bg-atelier-cream p-4 border border-atelier-charcoal/10">
              <span className="text-[9px] tracking-editorial uppercase text-atelier-muted block">Team Members</span>
              <div className="font-serif text-2xl text-atelier-charcoal mt-1">{team.length}</div>
            </div>
            <div className="bg-atelier-cream p-4 border border-atelier-charcoal/10">
              <span className="text-[9px] tracking-editorial uppercase text-atelier-muted block">Material Specimens</span>
              <div className="font-serif text-2xl text-atelier-charcoal mt-1">{materials.length}</div>
            </div>
          </div>

          {/* ================= TAB: PROJECTS ================= */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-atelier-charcoal/10 gap-4">
                <div>
                  <h1 className="font-serif text-2xl md:text-3xl text-atelier-charcoal">Portfolio Case Studies</h1>
                  <p className="text-xs text-atelier-muted mt-1">Manage architectural case studies, galleries, and specifications.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-atelier-muted" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      className="pl-8 pr-3 py-2 bg-atelier-cream border border-atelier-charcoal/15 text-xs focus:outline-none w-48"
                    />
                  </div>
                  <button
                    onClick={openNewProjectModal}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-atelier-charcoal text-atelier-ivory text-[11px] tracking-editorial uppercase hover:bg-atelier-dark transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Project</span>
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="py-20 text-center text-atelier-muted font-serif italic">Loading portfolio...</div>
              ) : (
                <div className="overflow-x-auto border border-atelier-charcoal/10 bg-atelier-cream">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-atelier-charcoal/10 bg-atelier-sand/30 text-[10px] tracking-editorial uppercase text-atelier-muted">
                        <th className="p-4">Visual</th>
                        <th className="p-4">Title & Subtitle</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Year</th>
                        <th className="p-4">Featured</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-atelier-charcoal/10">
                      {filteredProjects.map((proj) => (
                        <tr key={proj.id} className="hover:bg-atelier-ivory/50">
                          <td className="p-4">
                            <img src={proj.heroImage} alt={proj.title} className="w-16 h-12 object-cover bg-atelier-sand" />
                          </td>
                          <td className="p-4">
                            <span className="font-serif text-sm font-medium text-atelier-charcoal block">{proj.title}</span>
                            <span className="text-atelier-muted line-clamp-1 max-w-xs text-[11px]">{proj.subtitle}</span>
                          </td>
                          <td className="p-4">
                            <span className="inline-block px-2 py-0.5 bg-atelier-sand/50 text-[10px] uppercase tracking-wider text-atelier-olive">
                              {proj.category}
                            </span>
                          </td>
                          <td className="p-4 text-atelier-muted">{proj.location}</td>
                          <td className="p-4 text-atelier-muted">{proj.year}</td>
                          <td className="p-4">
                            {proj.isFeatured ? (
                              <span className="text-atelier-olive font-medium flex items-center space-x-1">
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Yes</span>
                              </span>
                            ) : (
                              <span className="text-atelier-muted">No</span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Link to={`/projects/${proj.slug}`} target="_blank" className="p-1.5 text-atelier-muted hover:text-atelier-charcoal" title="Live Preview">
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button onClick={() => openEditProjectModal(proj)} className="p-1.5 text-atelier-muted hover:text-atelier-charcoal" title="Edit">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDeleteProject(proj.id, proj.title)} className="p-1.5 text-atelier-muted hover:text-red-700" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB: INQUIRIES ================= */}
          {activeTab === 'inquiries' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-atelier-charcoal/10 gap-4">
                <div>
                  <h1 className="font-serif text-2xl md:text-3xl text-atelier-charcoal">Client Inquiries & Consultation Leads</h1>
                  <p className="text-xs text-atelier-muted mt-1">Review incoming consultation requests and update project status.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={inquiryStatusFilter}
                    onChange={(e) => setInquiryStatusFilter(e.target.value)}
                    className="bg-atelier-cream border border-atelier-charcoal/15 text-xs px-3 py-2 focus:outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">Status: New</option>
                    <option value="Reviewing">Status: Reviewing</option>
                    <option value="Contacted">Status: Contacted</option>
                    <option value="Completed">Status: Completed</option>
                  </select>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-atelier-muted" />
                    <input
                      type="text"
                      placeholder="Search inquiries..."
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="pl-8 pr-3 py-2 bg-atelier-cream border border-atelier-charcoal/15 text-xs focus:outline-none w-44"
                    />
                  </div>
                </div>
              </div>

              {filteredInquiries.length === 0 ? (
                <div className="bg-atelier-cream p-12 text-center text-atelier-muted border border-atelier-charcoal/10">
                  No consultation inquiries match your current filters.
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredInquiries.map((inq) => (
                    <div key={inq.id} className="bg-atelier-cream p-6 border border-atelier-charcoal/10">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-atelier-charcoal/10 mb-4 gap-2">
                        <div>
                          <h3 className="font-serif text-lg text-atelier-charcoal font-medium">{inq.clientName}</h3>
                          <div className="text-[12px] text-atelier-muted space-x-3 mt-0.5">
                            <span>{inq.email}</span>
                            {inq.phone && <span>· {inq.phone}</span>}
                            {inq.location && <span>· {inq.location}</span>}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                            className="bg-atelier-ivory border border-atelier-charcoal/20 text-xs px-2.5 py-1 focus:outline-none font-medium"
                          >
                            <option value="New">Status: New</option>
                            <option value="Reviewing">Status: Reviewing</option>
                            <option value="Contacted">Status: Contacted</option>
                            <option value="Completed">Status: Completed</option>
                          </select>
                          <button onClick={() => handleDeleteInquiry(inq.id)} className="text-atelier-muted hover:text-red-700 p-1" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mb-4">
                        <div>
                          <span className="text-atelier-muted block uppercase text-[9px] tracking-wider">Project Scope</span>
                          <span className="font-medium text-atelier-charcoal">{inq.projectType}</span>
                        </div>
                        <div>
                          <span className="text-atelier-muted block uppercase text-[9px] tracking-wider">Budget Guidance</span>
                          <span className="font-medium text-atelier-charcoal">{inq.budgetRange}</span>
                        </div>
                        <div>
                          <span className="text-atelier-muted block uppercase text-[9px] tracking-wider">Estimated Area</span>
                          <span className="font-medium text-atelier-charcoal">{inq.estimatedArea || 'Not specified'}</span>
                        </div>
                      </div>

                      <div className="bg-atelier-ivory p-4 text-xs leading-relaxed text-atelier-charcoal/90 border border-atelier-charcoal/5 whitespace-pre-line">
                        <span className="block text-[9px] uppercase tracking-wider text-atelier-muted mb-1 font-mono">
                          Client Note:
                        </span>
                        {inq.message}
                      </div>

                      <div className="mt-4 flex items-center justify-between text-[10px] text-atelier-muted">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Submitted: {new Date(inq.createdAt).toLocaleString()}</span>
                        </span>
                        <a
                          href={`mailto:${inq.email}?subject=RE: Atelier Architectural Consultation — ${inq.projectType}`}
                          className="text-atelier-olive hover:underline font-medium uppercase tracking-wider"
                        >
                          Reply via Email →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB: SERVICES ================= */}
          {activeTab === 'services' && (
            <div>
              <div className="flex justify-between items-center pb-6 mb-6 border-b border-atelier-charcoal/10">
                <div>
                  <h1 className="font-serif text-2xl md:text-3xl text-atelier-charcoal">Studio Disciplines</h1>
                  <p className="text-xs text-atelier-muted mt-1">Configure service offerings and engagement scopes.</p>
                </div>
                <button
                  onClick={openNewServiceModal}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-atelier-charcoal text-atelier-ivory text-[11px] tracking-editorial uppercase hover:bg-atelier-dark transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Discipline</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((svc) => (
                  <div key={svc.id} className="bg-atelier-cream p-6 border border-atelier-charcoal/10 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="font-mono text-sm text-atelier-muted">{svc.number}</span>
                        <div className="flex space-x-2">
                          <button onClick={() => openEditServiceModal(svc)} className="p-1 text-atelier-muted hover:text-atelier-charcoal">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteService(svc.id, svc.title)} className="p-1 text-atelier-muted hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <h3 className="font-serif text-xl text-atelier-charcoal mb-1">{svc.title}</h3>
                      <span className="text-[10px] uppercase tracking-editorial text-atelier-olive block mb-3">{svc.tag}</span>
                      <p className="text-xs text-atelier-muted mb-4">{svc.tagline}</p>

                      <div className="aspect-[16/9] overflow-hidden bg-atelier-sand mb-4">
                        <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
                      </div>

                      <div className="space-y-1 text-[11px] text-atelier-charcoal/80">
                        {svc.scope?.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <span className="w-1 h-1 bg-atelier-olive rounded-full" />
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB: TEAM MEMBERS (YANGI!) ================= */}
          {activeTab === 'team' && (
            <div>
              <div className="flex justify-between items-center pb-6 mb-6 border-b border-atelier-charcoal/10">
                <div>
                  <h1 className="font-serif text-2xl md:text-3xl text-atelier-charcoal">Studio Team Members ({team.length})</h1>
                  <p className="text-xs text-atelier-muted mt-1">Manage founders, principal architects, and interior stylists shown on `/studio`.</p>
                </div>
                <button
                  onClick={openNewTeamModal}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-atelier-charcoal text-atelier-ivory text-[11px] tracking-editorial uppercase hover:bg-atelier-dark transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((m) => (
                  <div key={m.id} className="bg-atelier-cream p-4 border border-atelier-charcoal/10 flex flex-col justify-between">
                    <div>
                      <div className="aspect-[4/5] overflow-hidden bg-atelier-sand mb-3 relative">
                        <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 flex space-x-1 bg-atelier-dark/70 p-1 rounded">
                          <button onClick={() => openEditTeamModal(m)} className="text-atelier-ivory hover:text-atelier-sand p-1">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteTeam(m.id, m.name)} className="text-atelier-ivory hover:text-red-400 p-1">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-serif text-base text-atelier-charcoal font-medium">{m.name}</h4>
                      <span className="text-[10px] tracking-editorial uppercase text-atelier-olive block mt-0.5">{m.role}</span>
                      <span className="text-[10px] text-atelier-muted block mb-2">{m.location}</span>
                      <p className="text-[11px] text-atelier-charcoal/80 leading-relaxed line-clamp-3">{m.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB: MATERIALS LIBRARY (YANGI!) ================= */}
          {activeTab === 'materials' && (
            <div>
              <div className="flex justify-between items-center pb-6 mb-6 border-b border-atelier-charcoal/10">
                <div>
                  <h1 className="font-serif text-2xl md:text-3xl text-atelier-charcoal">Architectural Material Library ({materials.length})</h1>
                  <p className="text-xs text-atelier-muted mt-1">Configure tactile specimens, stone quarries, and timber patinas for the Material Inspector.</p>
                </div>
                <button
                  onClick={openNewMaterialModal}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-atelier-charcoal text-atelier-ivory text-[11px] tracking-editorial uppercase hover:bg-atelier-dark transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Material Specimen</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {materials.map((mat) => (
                  <div key={mat.id} className="bg-atelier-cream p-5 border border-atelier-charcoal/10 flex flex-col justify-between">
                    <div>
                      <div className="aspect-[16/10] overflow-hidden bg-atelier-sand mb-3 relative">
                        <img src={mat.image} alt={mat.name} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-atelier-dark/80 text-atelier-ivory px-2 py-0.5 text-[9px] uppercase tracking-wider">
                          {mat.category}
                        </span>
                        <div className="absolute top-2 right-2 flex space-x-1 bg-atelier-dark/70 p-1 rounded">
                          <button onClick={() => openEditMaterialModal(mat)} className="text-atelier-ivory hover:text-atelier-sand p-1">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteMaterial(mat.id, mat.name)} className="text-atelier-ivory hover:text-red-400 p-1">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="font-serif text-lg text-atelier-charcoal font-medium">{mat.name}</h4>
                      <span className="text-[10px] text-atelier-olive block mb-2">{mat.origin}</span>
                      <p className="text-[11px] text-atelier-charcoal/80 leading-relaxed mb-3 line-clamp-2">{mat.description}</p>
                      
                      <div className="text-[10px] text-atelier-muted border-t border-atelier-charcoal/10 pt-2 space-y-1">
                        <div><strong className="text-atelier-charcoal">Feel:</strong> {mat.tactility}</div>
                        <div><strong className="text-atelier-charcoal">Role:</strong> {mat.architecturalRole}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB: MASTER SETTINGS (HOMEPAGE & STUDIO) ================= */}
          {activeTab === 'settings' && (
            <div className="bg-atelier-cream p-8 border border-atelier-charcoal/10">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-atelier-charcoal/10">
                <div>
                  <h1 className="font-serif text-2xl md:text-3xl text-atelier-charcoal">
                    Studio Master Settings
                  </h1>
                  <p className="text-xs text-atelier-muted mt-1">
                    Control all homepage text blocks, hero metadata, methodology steps, and physical office coordinates.
                  </p>
                </div>
                {saveSuccess && (
                  <span className="text-xs bg-atelier-olive text-atelier-ivory px-3 py-1.5 font-medium flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Published Live!</span>
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-8 text-xs">
                {/* 1. HERO SECTION & STATS */}
                <div className="space-y-4 pb-6 border-b border-atelier-charcoal/10">
                  <span className="text-[11px] tracking-editorial uppercase text-atelier-olive font-semibold block">
                    1. Hero Section & Metadata Bar
                  </span>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-atelier-charcoal mb-1">Hero Tagline</label>
                    <input
                      type="text"
                      value={settings.heroTagline || ''}
                      onChange={(e) => setSettings({ ...settings, heroTagline: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-atelier-charcoal mb-1">Main Hero Headline (Serif)</label>
                    <input
                      type="text"
                      value={settings.heroTitle || ''}
                      onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3 py-2 text-sm focus:outline-none font-serif"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-atelier-charcoal mb-1">Hero Subtitle</label>
                    <textarea
                      rows={2}
                      value={settings.heroSubtitle || ''}
                      onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 p-3 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-atelier-charcoal mb-1">Hero Background Image URL</label>
                    <input
                      type="url"
                      value={settings.heroImage || ''}
                      onChange={(e) => setSettings({ ...settings, heroImage: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>

                  {/* 4 Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div>
                      <label className="block text-[9px] uppercase text-atelier-muted mb-1">Metadata: Locations</label>
                      <input
                        type="text"
                        value={settings.heroStatsLocations || ''}
                        onChange={(e) => setSettings({ ...settings, heroStatsLocations: e.target.value })}
                        className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-2.5 py-1.5 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase text-atelier-muted mb-1">Metadata: Discipline</label>
                      <input
                        type="text"
                        value={settings.heroStatsDiscipline || ''}
                        onChange={(e) => setSettings({ ...settings, heroStatsDiscipline: e.target.value })}
                        className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-2.5 py-1.5 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase text-atelier-muted mb-1">Metadata: Materiality</label>
                      <input
                        type="text"
                        value={settings.heroStatsMateriality || ''}
                        onChange={(e) => setSettings({ ...settings, heroStatsMateriality: e.target.value })}
                        className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-2.5 py-1.5 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase text-atelier-muted mb-1">Metadata: Ethos</label>
                      <input
                        type="text"
                        value={settings.heroStatsEthos || ''}
                        onChange={(e) => setSettings({ ...settings, heroStatsEthos: e.target.value })}
                        className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-2.5 py-1.5 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. MANIFESTO & PRINCIPLES */}
                <div className="space-y-4 pb-6 border-b border-atelier-charcoal/10">
                  <span className="text-[11px] tracking-editorial uppercase text-atelier-olive font-semibold block">
                    2. Studio Manifesto & Core Principles
                  </span>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-atelier-charcoal mb-1">Manifesto Headline</label>
                    <input
                      type="text"
                      value={settings.manifestoTitle || ''}
                      onChange={(e) => setSettings({ ...settings, manifestoTitle: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3 py-2 text-sm focus:outline-none font-serif"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-atelier-charcoal mb-1">Lead Thought (Italic)</label>
                    <textarea
                      rows={2}
                      value={settings.manifestoLead || ''}
                      onChange={(e) => setSettings({ ...settings, manifestoLead: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 p-3 text-xs focus:outline-none font-serif italic"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-atelier-charcoal mb-1">Detailed Narrative</label>
                    <textarea
                      rows={3}
                      value={settings.manifestoBody || ''}
                      onChange={(e) => setSettings({ ...settings, manifestoBody: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 p-3 text-xs focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-[10px] uppercase text-atelier-muted mb-1">Principle 1 Title</label>
                      <input
                        type="text"
                        value={settings.principle1Title || ''}
                        onChange={(e) => setSettings({ ...settings, principle1Title: e.target.value })}
                        className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none mb-2 font-medium"
                      />
                      <textarea
                        rows={2}
                        value={settings.principle1Text || ''}
                        onChange={(e) => setSettings({ ...settings, principle1Text: e.target.value })}
                        className="w-full bg-atelier-ivory border border-atelier-charcoal/20 p-2 text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase text-atelier-muted mb-1">Principle 2 Title</label>
                      <input
                        type="text"
                        value={settings.principle2Title || ''}
                        onChange={(e) => setSettings({ ...settings, principle2Title: e.target.value })}
                        className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none mb-2 font-medium"
                      />
                      <textarea
                        rows={2}
                        value={settings.principle2Text || ''}
                        onChange={(e) => setSettings({ ...settings, principle2Text: e.target.value })}
                        className="w-full bg-atelier-ivory border border-atelier-charcoal/20 p-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-atelier-charcoal mb-1">Studio Atmosphere Wide Image URL</label>
                    <input
                      type="url"
                      value={settings.studioWorkspaceImage || ''}
                      onChange={(e) => setSettings({ ...settings, studioWorkspaceImage: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* 3. METHODOLOGY 4 STEPS */}
                <div className="space-y-4 pb-6 border-b border-atelier-charcoal/10">
                  <span className="text-[11px] tracking-editorial uppercase text-atelier-olive font-semibold block">
                    3. Methodology (4 Spatial Phases)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-atelier-ivory p-3.5 border border-atelier-charcoal/10">
                      <span className="text-[10px] font-mono text-atelier-muted block mb-1">Step 01 (Dialogue)</span>
                      <input
                        type="text"
                        value={settings.step1Title || ''}
                        onChange={(e) => setSettings({ ...settings, step1Title: e.target.value })}
                        className="w-full bg-atelier-cream border border-atelier-charcoal/15 px-2.5 py-1.5 text-xs focus:outline-none mb-2 font-serif font-medium"
                      />
                      <textarea
                        rows={2}
                        value={settings.step1Text || ''}
                        onChange={(e) => setSettings({ ...settings, step1Text: e.target.value })}
                        className="w-full bg-atelier-cream border border-atelier-charcoal/15 p-2 text-xs focus:outline-none"
                      />
                    </div>

                    <div className="bg-atelier-ivory p-3.5 border border-atelier-charcoal/10">
                      <span className="text-[10px] font-mono text-atelier-muted block mb-1">Step 02 (Concept)</span>
                      <input
                        type="text"
                        value={settings.step2Title || ''}
                        onChange={(e) => setSettings({ ...settings, step2Title: e.target.value })}
                        className="w-full bg-atelier-cream border border-atelier-charcoal/15 px-2.5 py-1.5 text-xs focus:outline-none mb-2 font-serif font-medium"
                      />
                      <textarea
                        rows={2}
                        value={settings.step2Text || ''}
                        onChange={(e) => setSettings({ ...settings, step2Text: e.target.value })}
                        className="w-full bg-atelier-cream border border-atelier-charcoal/15 p-2 text-xs focus:outline-none"
                      />
                    </div>

                    <div className="bg-atelier-ivory p-3.5 border border-atelier-charcoal/10">
                      <span className="text-[10px] font-mono text-atelier-muted block mb-1">Step 03 (Materiality)</span>
                      <input
                        type="text"
                        value={settings.step3Title || ''}
                        onChange={(e) => setSettings({ ...settings, step3Title: e.target.value })}
                        className="w-full bg-atelier-cream border border-atelier-charcoal/15 px-2.5 py-1.5 text-xs focus:outline-none mb-2 font-serif font-medium"
                      />
                      <textarea
                        rows={2}
                        value={settings.step3Text || ''}
                        onChange={(e) => setSettings({ ...settings, step3Text: e.target.value })}
                        className="w-full bg-atelier-cream border border-atelier-charcoal/15 p-2 text-xs focus:outline-none"
                      />
                    </div>

                    <div className="bg-atelier-ivory p-3.5 border border-atelier-charcoal/10">
                      <span className="text-[10px] font-mono text-atelier-muted block mb-1">Step 04 (Realization)</span>
                      <input
                        type="text"
                        value={settings.step4Title || ''}
                        onChange={(e) => setSettings({ ...settings, step4Title: e.target.value })}
                        className="w-full bg-atelier-cream border border-atelier-charcoal/15 px-2.5 py-1.5 text-xs focus:outline-none mb-2 font-serif font-medium"
                      />
                      <textarea
                        rows={2}
                        value={settings.step4Text || ''}
                        onChange={(e) => setSettings({ ...settings, step4Text: e.target.value })}
                        className="w-full bg-atelier-cream border border-atelier-charcoal/15 p-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. CLOSING CTA */}
                <div className="space-y-4 pb-6 border-b border-atelier-charcoal/10">
                  <span className="text-[11px] tracking-editorial uppercase text-atelier-olive font-semibold block">
                    4. Closing Consultation CTA Section
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase text-atelier-muted mb-1">CTA Eyebrow</label>
                      <input
                        type="text"
                        value={settings.ctaEyebrow || ''}
                        onChange={(e) => setSettings({ ...settings, ctaEyebrow: e.target.value })}
                        className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-atelier-muted mb-1">Main Heading</label>
                      <input
                        type="text"
                        value={settings.ctaTitle || ''}
                        onChange={(e) => setSettings({ ...settings, ctaTitle: e.target.value })}
                        className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none font-serif"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-atelier-muted mb-1">Italic Subtitle</label>
                    <input
                      type="text"
                      value={settings.ctaItalicSubtitle || ''}
                      onChange={(e) => setSettings({ ...settings, ctaItalicSubtitle: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none font-serif italic"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-atelier-muted mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={settings.ctaDescription || ''}
                      onChange={(e) => setSettings({ ...settings, ctaDescription: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 p-2.5 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* 5. LOCATIONS & COORDINATES */}
                <div className="space-y-4 pb-6">
                  <span className="text-[11px] tracking-editorial uppercase text-atelier-olive font-semibold block">
                    5. Office Coordinates & Contact
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase text-atelier-muted mb-1">Primary Email</label>
                      <input
                        type="email"
                        value={settings.primaryEmail || ''}
                        onChange={(e) => setSettings({ ...settings, primaryEmail: e.target.value })}
                        className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-atelier-muted mb-1">Press Email</label>
                      <input
                        type="email"
                        value={settings.pressEmail || ''}
                        onChange={(e) => setSettings({ ...settings, pressEmail: e.target.value })}
                        className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase text-atelier-muted mb-1">Milan Address</label>
                      <input
                        type="text"
                        value={settings.locationMilan || ''}
                        onChange={(e) => setSettings({ ...settings, locationMilan: e.target.value })}
                        className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-atelier-muted mb-1">London Address</label>
                      <input
                        type="text"
                        value={settings.locationLondon || ''}
                        onChange={(e) => setSettings({ ...settings, locationLondon: e.target.value })}
                        className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-atelier-muted mb-1">Kyoto Atelier</label>
                      <input
                        type="text"
                        value={settings.locationKyoto || ''}
                        onChange={(e) => setSettings({ ...settings, locationKyoto: e.target.value })}
                        className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center space-x-2 px-8 py-3.5 bg-atelier-charcoal text-atelier-ivory text-[11px] tracking-editorial uppercase hover:bg-atelier-dark transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Publish Master Settings</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================= TAB: SECURITY ================= */}
          {activeTab === 'security' && (
            <div className="max-w-2xl bg-atelier-cream p-8 border border-atelier-charcoal/10">
              <div className="pb-4 mb-6 border-b border-atelier-charcoal/10">
                <div className="flex items-center space-x-2.5 mb-1">
                  <Lock className="w-5 h-5 text-atelier-olive" />
                  <h1 className="font-serif text-2xl text-atelier-charcoal">
                    Admin Security & Access Credentials
                  </h1>
                </div>
                <p className="text-xs text-atelier-muted">
                  Update your studio login identifier, master password, and director contact profile.
                </p>
              </div>

              {securityStatus && (
                <div
                  className={`p-4 mb-6 text-xs flex items-center space-x-2.5 border ${
                    securityStatus.type === 'success'
                      ? 'bg-atelier-ivory border-atelier-olive/30 text-atelier-olive'
                      : 'bg-red-50 border-red-200 text-red-700'
                  }`}
                >
                  {securityStatus.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{securityStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleSecuritySubmit} className="space-y-5 text-xs">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-atelier-charcoal mb-1 font-medium">
                    Current Master Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter current password"
                    value={securityForm.currentPassword}
                    onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                    className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3.5 py-2.5 text-sm focus:outline-none focus:border-atelier-charcoal"
                  />
                  <span className="text-[10px] text-atelier-muted mt-1 block">
                    Required to authorize administrative credential modifications.
                  </span>
                </div>

                <div className="pt-2 border-t border-atelier-charcoal/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-atelier-charcoal mb-1 font-medium">
                      Admin Username / Login ID
                    </label>
                    <input
                      type="text"
                      required
                      value={securityForm.newUsername}
                      onChange={(e) => setSecurityForm({ ...securityForm, newUsername: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3.5 py-2.5 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-atelier-charcoal mb-1 font-medium">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={securityForm.name}
                      onChange={(e) => setSecurityForm({ ...securityForm, name: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3.5 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-atelier-charcoal mb-1 font-medium">
                      New Password (Optional)
                    </label>
                    <input
                      type="password"
                      placeholder="Leave blank to keep existing"
                      value={securityForm.newPassword}
                      onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3.5 py-2.5 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-atelier-charcoal mb-1 font-medium">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm matching new password"
                      value={securityForm.confirmPassword}
                      onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3.5 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-atelier-charcoal mb-1 font-medium">
                    Studio Notification Email
                  </label>
                  <input
                    type="email"
                    value={securityForm.email}
                    onChange={(e) => setSecurityForm({ ...securityForm, email: e.target.value })}
                    className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-3.5 py-2.5 text-sm focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-atelier-charcoal/10 flex items-center justify-between">
                  <span className="text-[10px] text-atelier-muted">
                    Session updates take immediate effect across browser instances.
                  </span>
                  <button
                    type="submit"
                    disabled={securityLoading}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-atelier-charcoal text-atelier-ivory text-[11px] tracking-editorial uppercase hover:bg-atelier-dark transition-all disabled:opacity-50"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>{securityLoading ? 'Securing...' : 'Save New Credentials'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD / EDIT PROJECT */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-atelier-dark/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-atelier-ivory max-w-2xl w-full p-8 border border-atelier-charcoal/20 shadow-xl my-8">
            <h3 className="font-serif text-2xl text-atelier-charcoal mb-6 pb-3 border-b border-atelier-charcoal/10">
              {editingProjectId ? 'Edit Project Case Study' : 'Curate New Architectural Project'}
            </h3>
            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-atelier-muted mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-atelier-muted mb-1">Category</label>
                  <select
                    value={projectForm.category || 'Residential'}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                    className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-sm focus:outline-none"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Renovation">Renovation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-atelier-muted mb-1">Subtitle *</label>
                <input
                  type="text"
                  required
                  value={projectForm.subtitle || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                  className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-atelier-muted mb-1">Location</label>
                  <input
                    type="text"
                    value={projectForm.location || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-atelier-muted mb-1">Year</label>
                  <input
                    type="text"
                    value={projectForm.year || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                    className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-atelier-muted mb-1">Area</label>
                  <input
                    type="text"
                    value={projectForm.area || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, area: e.target.value })}
                    className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-atelier-muted mb-1">Hero Image URL</label>
                <input
                  type="url"
                  value={projectForm.heroImage || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, heroImage: e.target.value })}
                  className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-atelier-muted mb-1">Overview</label>
                <textarea
                  rows={3}
                  value={projectForm.overview || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, overview: e.target.value })}
                  className="w-full bg-atelier-cream border border-atelier-charcoal/20 p-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-atelier-muted mb-1">Approach</label>
                <textarea
                  rows={3}
                  value={projectForm.approach || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, approach: e.target.value })}
                  className="w-full bg-atelier-cream border border-atelier-charcoal/20 p-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-atelier-muted mb-1">Materials</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={materialInput}
                    onChange={(e) => setMaterialInput(e.target.value)}
                    placeholder="e.g. Travertine"
                    className="flex-1 bg-atelier-cream border border-atelier-charcoal/20 px-3 py-1.5 text-xs focus:outline-none"
                  />
                  <button type="button" onClick={addMaterialTag} className="px-3 py-1.5 bg-atelier-charcoal text-atelier-ivory text-[10px] uppercase">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {projectForm.materials?.map((m, idx) => (
                    <span key={idx} className="bg-atelier-sand/60 px-2.5 py-1 text-[11px] flex items-center space-x-1">
                      <span>{m}</span>
                      <button type="button" onClick={() => removeMaterialTag(idx)} className="hover:text-red-700 ml-1">×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={projectForm.isFeatured || false}
                  onChange={(e) => setProjectForm({ ...projectForm, isFeatured: e.target.checked })}
                  className="accent-atelier-charcoal"
                />
                <label htmlFor="isFeatured" className="text-xs text-atelier-charcoal">
                  Feature prominently on studio homepage
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-atelier-charcoal/10">
                <button type="button" onClick={() => setShowProjectModal(false)} className="px-5 py-2.5 border border-atelier-charcoal/20 text-atelier-charcoal text-[11px] uppercase tracking-wider">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 bg-atelier-charcoal text-atelier-ivory text-[11px] uppercase tracking-wider hover:bg-atelier-dark">
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT SERVICE */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 bg-atelier-dark/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-atelier-ivory max-w-xl w-full p-8 border border-atelier-charcoal/20 shadow-xl my-8">
            <h3 className="font-serif text-2xl text-atelier-charcoal mb-6 pb-3 border-b border-atelier-charcoal/10">
              {editingServiceId ? 'Edit Discipline' : 'Add New Discipline'}
            </h3>
            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-atelier-muted mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.title || ''}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-atelier-muted mb-1">Tag</label>
                  <input
                    type="text"
                    value={serviceForm.tag || ''}
                    onChange={(e) => setServiceForm({ ...serviceForm, tag: e.target.value })}
                    className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-atelier-muted mb-1">Tagline</label>
                <input
                  type="text"
                  value={serviceForm.tagline || ''}
                  onChange={(e) => setServiceForm({ ...serviceForm, tagline: e.target.value })}
                  className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-atelier-muted mb-1">Image URL</label>
                <input
                  type="url"
                  value={serviceForm.image || ''}
                  onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                  className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-atelier-muted mb-1">Description</label>
                <textarea
                  rows={3}
                  value={serviceForm.description || ''}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full bg-atelier-cream border border-atelier-charcoal/20 p-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-atelier-muted mb-1">Scope Items</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={scopeInput}
                    onChange={(e) => setScopeInput(e.target.value)}
                    placeholder="e.g. Quarry inspection"
                    className="flex-1 bg-atelier-cream border border-atelier-charcoal/20 px-3 py-1.5 text-xs focus:outline-none"
                  />
                  <button type="button" onClick={addScopeItem} className="px-3 py-1.5 bg-atelier-charcoal text-atelier-ivory text-[10px] uppercase">
                    Add
                  </button>
                </div>
                <div className="space-y-1">
                  {serviceForm.scope?.map((sc, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-atelier-sand/40 px-3 py-1 text-xs">
                      <span>{sc}</span>
                      <button type="button" onClick={() => removeScopeItem(idx)} className="text-atelier-muted hover:text-red-700 font-bold ml-2">×</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-atelier-charcoal/10">
                <button type="button" onClick={() => setShowServiceModal(false)} className="px-5 py-2.5 border border-atelier-charcoal/20 text-atelier-charcoal text-[11px] uppercase tracking-wider">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 bg-atelier-charcoal text-atelier-ivory text-[11px] uppercase tracking-wider hover:bg-atelier-dark">
                  Save Discipline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT TEAM MEMBER */}
      {showTeamModal && (
        <div className="fixed inset-0 z-50 bg-atelier-dark/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-atelier-ivory max-w-lg w-full p-8 border border-atelier-charcoal/20 shadow-xl my-8">
            <h3 className="font-serif text-2xl text-atelier-charcoal mb-6 pb-3 border-b border-atelier-charcoal/10">
              {editingTeamId ? 'Edit Team Member' : 'Add Team Member'}
            </h3>
            <form onSubmit={handleSaveTeam} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-atelier-muted mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={teamForm.name || ''}
                    onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                    className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-atelier-muted mb-1">Role / Job Title *</label>
                  <input
                    type="text"
                    required
                    value={teamForm.role || ''}
                    onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                    className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-atelier-muted mb-1">Location Base</label>
                  <input
                    type="text"
                    value={teamForm.location || ''}
                    onChange={(e) => setTeamForm({ ...teamForm, location: e.target.value })}
                    placeholder="e.g. Milan / Kyoto"
                    className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-atelier-muted mb-1">Portrait Photo URL</label>
                  <input
                    type="url"
                    value={teamForm.image || ''}
                    onChange={(e) => setTeamForm({ ...teamForm, image: e.target.value })}
                    className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-atelier-muted mb-1">Architectural Bio & Background</label>
                <textarea
                  rows={3}
                  value={teamForm.bio || ''}
                  onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                  placeholder="Academic training, materials focus, or project heritage..."
                  className="w-full bg-atelier-cream border border-atelier-charcoal/20 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-atelier-charcoal/10">
                <button type="button" onClick={() => setShowTeamModal(false)} className="px-5 py-2.5 border border-atelier-charcoal/20 text-atelier-charcoal text-[11px] uppercase tracking-wider">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 bg-atelier-charcoal text-atelier-ivory text-[11px] uppercase tracking-wider hover:bg-atelier-dark">
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT MATERIAL SPECIMEN */}
      {showMaterialModal && (
        <div className="fixed inset-0 z-50 bg-atelier-dark/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-atelier-ivory max-w-xl w-full p-8 border border-atelier-charcoal/20 shadow-xl my-8">
            <h3 className="font-serif text-2xl text-atelier-charcoal mb-6 pb-3 border-b border-atelier-charcoal/10">
              {editingMaterialId ? 'Edit Material Specimen' : 'Add Material Specimen'}
            </h3>
            <form onSubmit={handleSaveMaterial} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-atelier-muted mb-1">Material Name *</label>
                  <input
                    type="text"
                    required
                    value={materialForm.name || ''}
                    onChange={(e) => setMaterialForm({ ...materialForm, name: e.target.value })}
                    placeholder="e.g. Roman Silver Travertine"
                    className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-atelier-muted mb-1">Category</label>
                  <select
                    value={materialForm.category || 'Stone'}
                    onChange={(e) => setMaterialForm({ ...materialForm, category: e.target.value as any })}
                    className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-sm focus:outline-none"
                  >
                    <option value="Stone">Stone</option>
                    <option value="Timber">Timber</option>
                    <option value="Plaster">Plaster</option>
                    <option value="Metal">Metal</option>
                    <option value="Fabric">Fabric</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-atelier-muted mb-1">Origin / Quarry</label>
                  <input
                    type="text"
                    value={materialForm.origin || ''}
                    onChange={(e) => setMaterialForm({ ...materialForm, origin: e.target.value })}
                    placeholder="e.g. Tivoli, Italy"
                    className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-atelier-muted mb-1">Texture Image URL</label>
                  <input
                    type="url"
                    value={materialForm.image || ''}
                    onChange={(e) => setMaterialForm({ ...materialForm, image: e.target.value })}
                    className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-atelier-muted mb-1">Tactile & Sensory Feel</label>
                <input
                  type="text"
                  value={materialForm.tactility || ''}
                  onChange={(e) => setMaterialForm({ ...materialForm, tactility: e.target.value })}
                  placeholder="e.g. Velvety matte with subtle grain"
                  className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-atelier-muted mb-1">Patina Behavior</label>
                <input
                  type="text"
                  value={materialForm.patinaBehavior || ''}
                  onChange={(e) => setMaterialForm({ ...materialForm, patinaBehavior: e.target.value })}
                  placeholder="e.g. Oxidizes gracefully with touch"
                  className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-atelier-muted mb-1">Primary Architectural Role</label>
                <input
                  type="text"
                  value={materialForm.architecturalRole || ''}
                  onChange={(e) => setMaterialForm({ ...materialForm, architecturalRole: e.target.value })}
                  placeholder="e.g. Kitchen islands and fireplace hearths"
                  className="w-full bg-atelier-cream border border-atelier-charcoal/20 px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-atelier-muted mb-1">Detailed Description</label>
                <textarea
                  rows={2}
                  value={materialForm.description || ''}
                  onChange={(e) => setMaterialForm({ ...materialForm, description: e.target.value })}
                  className="w-full bg-atelier-cream border border-atelier-charcoal/20 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-atelier-charcoal/10">
                <button type="button" onClick={() => setShowMaterialModal(false)} className="px-5 py-2.5 border border-atelier-charcoal/20 text-atelier-charcoal text-[11px] uppercase tracking-wider">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 bg-atelier-charcoal text-atelier-ivory text-[11px] uppercase tracking-wider hover:bg-atelier-dark">
                  Save Specimen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
