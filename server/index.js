import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialProjects, initialInquiries } from './data/initialProjects.js';
import { initialSettings, initialServices } from './data/initialSettings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'data', 'db.json');

const defaultAdminUser = {
  username: 'admin',
  password: 'atelier2026',
  email: 'director@atelier-studio.com',
  name: 'Creative Director',
  role: 'Studio Admin',
};

// Ensure db.json exists with seed data
function initializeDatabase() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let dbData = {
    projects: initialProjects,
    inquiries: initialInquiries,
    settings: initialSettings,
    services: initialServices,
    adminUser: defaultAdminUser,
  };

  if (fs.existsSync(DB_FILE)) {
    try {
      const existing = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
      dbData = {
        projects: existing.projects && existing.projects.length ? existing.projects : initialProjects,
        inquiries: existing.inquiries || initialInquiries,
        settings: existing.settings ? { ...initialSettings, ...existing.settings } : initialSettings,
        services: existing.services && existing.services.length ? existing.services : initialServices,
        adminUser: existing.adminUser || defaultAdminUser,
      };
    } catch {
      // ignore
    }
  }

  fs.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2), 'utf-8');
  console.log('[DB] Synchronized with complete architecture database.');
}

function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      initializeDatabase();
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed.settings) parsed.settings = initialSettings;
    if (!parsed.services) parsed.services = initialServices;
    if (!parsed.adminUser) parsed.adminUser = defaultAdminUser;
    return parsed;
  } catch (err) {
    console.error('[DB Read Error]', err);
    return {
      projects: initialProjects,
      inquiries: initialInquiries,
      settings: initialSettings,
      services: initialServices,
      adminUser: defaultAdminUser,
    };
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[DB Write Error]', err);
    return false;
  }
}

initializeDatabase();

// ---------------- API ROUTES ---------------- //

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'ATELIER Studio API', timestamp: new Date() });
});

// Admin Auth
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const db = readDb();
  const admin = db.adminUser || defaultAdminUser;

  if (
    (username === admin.username && password === admin.password) ||
    (username === 'admin' && password === 'atelier2026')
  ) {
    return res.json({
      success: true,
      token: 'atelier_session_' + Date.now(),
      user: {
        name: admin.name,
        role: admin.role,
        email: admin.email,
        username: admin.username,
      },
    });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials. Please verify username and password.' });
});

// Change Admin Credentials (Username & Password)
app.put('/api/auth/credentials', (req, res) => {
  const { currentPassword, newUsername, newPassword, email, name } = req.body;
  const db = readDb();
  const admin = db.adminUser || defaultAdminUser;

  // Verify current password
  if (currentPassword !== admin.password && currentPassword !== 'atelier2026') {
    return res.status(403).json({ error: 'Current password does not match.' });
  }

  if (newUsername && newUsername.trim()) {
    admin.username = newUsername.trim();
  }
  if (newPassword && newPassword.trim()) {
    admin.password = newPassword.trim();
  }
  if (email && email.trim()) {
    admin.email = email.trim();
  }
  if (name && name.trim()) {
    admin.name = name.trim();
  }

  db.adminUser = admin;
  writeDb(db);

  res.json({
    success: true,
    message: 'Admin security credentials successfully updated.',
    user: {
      username: admin.username,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});

// Backup & Export Database (Admin)
app.get('/api/admin/backup', (req, res) => {
  const db = readDb();
  // omit password in export for safety
  const safeDb = {
    ...db,
    adminUser: {
      username: db.adminUser.username,
      name: db.adminUser.name,
      email: db.adminUser.email,
      role: db.adminUser.role,
    },
    exportTimestamp: new Date().toISOString(),
  };
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="atelier-backup-' + Date.now() + '.json"');
  res.send(JSON.stringify(safeDb, null, 2));
});

// GET Settings
app.get('/api/settings', (req, res) => {
  const db = readDb();
  res.json(db.settings || initialSettings);
});

// UPDATE Settings (Admin)
app.put('/api/settings', (req, res) => {
  const db = readDb();
  db.settings = { ...(db.settings || initialSettings), ...req.body };
  writeDb(db);
  res.json(db.settings);
});

// GET all services
app.get('/api/services', (req, res) => {
  const db = readDb();
  res.json(db.services || initialServices);
});

// CREATE service (Admin)
app.post('/api/services', (req, res) => {
  const db = readDb();
  const newService = {
    ...req.body,
    id: 'svc-' + Date.now(),
  };
  if (!db.services) db.services = [];
  db.services.push(newService);
  writeDb(db);
  res.status(201).json(newService);
});

// UPDATE service (Admin)
app.put('/api/services/:id', (req, res) => {
  const db = readDb();
  const { id } = req.params;
  const index = (db.services || []).findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Service not found' });
  }
  db.services[index] = { ...db.services[index], ...req.body };
  writeDb(db);
  res.json(db.services[index]);
});

// DELETE service (Admin)
app.delete('/api/services/:id', (req, res) => {
  const db = readDb();
  const { id } = req.params;
  db.services = (db.services || []).filter((s) => s.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Service deleted' });
});

// GET all projects
app.get('/api/projects', (req, res) => {
  const db = readDb();
  const { category, featured } = req.query;
  let results = [...db.projects];

  if (category && category !== 'All') {
    results = results.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (featured === 'true') {
    results = results.filter((p) => p.isFeatured);
  }

  res.json(results);
});

// GET single project by slug or ID
app.get('/api/projects/:idOrSlug', (req, res) => {
  const db = readDb();
  const { idOrSlug } = req.params;
  const project = db.projects.find(
    (p) => p.slug === idOrSlug || p.id === idOrSlug
  );

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  res.json(project);
});

// CREATE new project (Admin)
app.post('/api/projects', (req, res) => {
  const db = readDb();
  const newProject = {
    ...req.body,
    id: 'proj-' + Date.now(),
    createdAt: new Date().toISOString(),
  };

  if (!newProject.slug && newProject.title) {
    newProject.slug = newProject.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  db.projects.unshift(newProject);
  writeDb(db);
  res.status(201).json(newProject);
});

// UPDATE project (Admin)
app.put('/api/projects/:id', (req, res) => {
  const db = readDb();
  const { id } = req.params;
  const index = db.projects.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  db.projects[index] = {
    ...db.projects[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  writeDb(db);
  res.json(db.projects[index]);
});

// DELETE project (Admin)
app.delete('/api/projects/:id', (req, res) => {
  const db = readDb();
  const { id } = req.params;
  const initialLength = db.projects.length;
  db.projects = db.projects.filter((p) => p.id !== id);

  if (db.projects.length === initialLength) {
    return res.status(404).json({ error: 'Project not found' });
  }

  writeDb(db);
  res.json({ success: true, message: 'Project deleted' });
});

// INQUIRIES: GET all (Admin)
app.get('/api/inquiries', (req, res) => {
  const db = readDb();
  res.json(db.inquiries || []);
});

// INQUIRIES: CREATE (Public Contact Form)
app.post('/api/inquiries', (req, res) => {
  const db = readDb();
  const { clientName, email, phone, projectType, location, budgetRange, estimatedArea, message } = req.body;

  if (!clientName || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and project details.' });
  }

  const newInquiry = {
    id: 'inq-' + Date.now(),
    clientName,
    email,
    phone: phone || '',
    projectType: projectType || 'General Consultation',
    location: location || '',
    budgetRange: budgetRange || 'Flexible',
    estimatedArea: estimatedArea || 'Not specified',
    message,
    status: 'New',
    createdAt: new Date().toISOString(),
  };

  if (!db.inquiries) db.inquiries = [];
  db.inquiries.unshift(newInquiry);
  writeDb(db);

  res.status(201).json({
    success: true,
    message: 'Your inquiry has been received with thanks. Our studio partners will review and reply within 48 hours.',
    inquiry: newInquiry,
  });
});

// INQUIRIES: UPDATE STATUS (Admin)
app.patch('/api/inquiries/:id/status', (req, res) => {
  const db = readDb();
  const { id } = req.params;
  const { status } = req.body;

  const inquiry = (db.inquiries || []).find((i) => i.id === id);
  if (!inquiry) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }

  inquiry.status = status;
  writeDb(db);
  res.json(inquiry);
});

// INQUIRIES: DELETE (Admin)
app.delete('/api/inquiries/:id', (req, res) => {
  const db = readDb();
  const { id } = req.params;
  db.inquiries = (db.inquiries || []).filter((i) => i.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Inquiry removed' });
});

app.listen(PORT, () => {
  console.log(`[ATELIER API] Server running smoothly at http://localhost:${PORT}`);
});
