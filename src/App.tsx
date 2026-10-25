import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { StudioPage } from './pages/StudioPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Layout wrapper to hide public Navbar/Footer on admin paths
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Navbar />}
      <div className="flex-grow">{children}</div>
      {!isAdmin && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/studio" element={<StudioPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* 404 Editorial fallback */}
              <Route
                path="*"
                element={
                  <div className="min-h-screen bg-atelier-ivory flex flex-col items-center justify-center px-6 text-center pt-24">
                    <span className="text-[10px] tracking-editorial uppercase text-atelier-olive block mb-2 font-medium">
                      Error 404
                    </span>
                    <h1 className="font-serif text-4xl sm:text-5xl text-atelier-charcoal mb-4">
                      Page Not Found
                    </h1>
                    <p className="text-atelier-muted text-sm max-w-sm mb-8 leading-relaxed">
                      The architectural room or page you are looking for has been relocated or does not exist.
                    </p>
                    <a
                      href="/"
                      className="px-6 py-3 bg-atelier-charcoal text-atelier-ivory text-[11px] tracking-editorial uppercase"
                    >
                      Return to Studio Home
                    </a>
                  </div>
                }
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
