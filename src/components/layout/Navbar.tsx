import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Shield, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { SupportedLanguage } from '../../data/translations';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isEvening, toggleMode } = useTheme();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: t('navProjects'), path: '/projects' },
    { label: t('navServices'), path: '/services' },
    { label: t('navStudio'), path: '/studio' },
    { label: t('navContact'), path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/projects') {
      return location.pathname.startsWith('/projects');
    }
    return location.pathname === path;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-atelier-ivory/90 backdrop-blur-md border-b border-atelier-charcoal/5 py-4 shadow-xs'
            : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            to="/"
            className="group flex flex-col items-start focus:outline-none"
          >
            <span className="font-serif tracking-[0.22em] text-xl md:text-2xl font-normal text-atelier-charcoal transition-opacity duration-300 group-hover:opacity-70">
              ATELIER
            </span>
            <span className="text-[9px] tracking-[0.28em] uppercase text-atelier-muted -mt-0.5">
              Architecture & Interiors
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-9">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[12px] tracking-editorial uppercase transition-all duration-300 relative py-1 ${
                  isActive(link.path)
                    ? 'text-atelier-charcoal font-medium'
                    : 'text-atelier-muted hover:text-atelier-charcoal'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-atelier-charcoal" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Controls: Ambient Toggle, Language Switcher, Start Project */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Language Switcher */}
            <div className="flex items-center space-x-1.5 text-[10px] tracking-wider uppercase border-r border-atelier-charcoal/15 pr-4 text-atelier-muted font-mono">
              {(['en', 'it', 'ja'] as SupportedLanguage[]).map((lCode) => (
                <button
                  key={lCode}
                  onClick={() => setLang(lCode)}
                  className={`px-1.5 py-0.5 transition-colors ${
                    lang === lCode
                      ? 'text-atelier-charcoal font-semibold bg-atelier-cream'
                      : 'hover:text-atelier-charcoal'
                  }`}
                >
                  {lCode.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Ambient Lighting Mood Toggle */}
            <button
              onClick={toggleMode}
              title={isEvening ? "Switch to Daylight Mode" : "Switch to Evening Lighting Mood"}
              className="p-2 text-atelier-muted hover:text-atelier-charcoal transition-colors rounded-full hover:bg-atelier-sand/30 flex items-center space-x-1.5 text-[11px]"
            >
              {isEvening ? (
                <>
                  <Moon className="w-4 h-4 text-atelier-amber" />
                  <span className="text-[10px] uppercase font-mono hidden lg:inline text-atelier-amber">Evening</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-atelier-muted" />
                  <span className="text-[10px] uppercase font-mono hidden lg:inline text-atelier-muted">Daylight</span>
                </>
              )}
            </button>

            {/* Admin Shield link */}
            <Link
              to="/admin"
              title="Studio Portal / Admin"
              className="text-atelier-muted hover:text-atelier-charcoal transition-colors p-1.5 rounded-full hover:bg-atelier-sand/30"
            >
              <Shield className="w-3.5 h-3.5 stroke-[1.4]" />
            </Link>

            {/* Primary Action */}
            <Link
              to="/contact"
              className="group inline-flex items-center space-x-2 text-[11px] tracking-editorial uppercase px-4 py-2.5 border border-atelier-charcoal/20 hover:border-atelier-charcoal text-atelier-charcoal bg-transparent hover:bg-atelier-charcoal hover:text-atelier-ivory transition-all duration-300"
            >
              <span>{t('startProject')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu & Quick Ambient Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleMode}
              className="p-2 text-atelier-charcoal"
              aria-label="Toggle mood"
            >
              {isEvening ? (
                <Moon className="w-4 h-4 text-atelier-amber" />
              ) : (
                <Sun className="w-4 h-4 text-atelier-muted" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-atelier-charcoal focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.2]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.2]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-atelier-ivory flex flex-col justify-between px-8 py-24 transition-all duration-500 ease-in-out md:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col space-y-7 mt-6">
          <div className="flex justify-between items-center pb-4 border-b border-atelier-charcoal/10">
            <span className="text-[10px] tracking-[0.25em] uppercase text-atelier-muted">
              Select Language
            </span>
            <div className="flex space-x-2">
              {(['en', 'it', 'ja'] as SupportedLanguage[]).map((lCode) => (
                <button
                  key={lCode}
                  onClick={() => setLang(lCode)}
                  className={`px-2 py-1 text-xs uppercase font-mono ${
                    lang === lCode ? 'bg-atelier-charcoal text-atelier-ivory' : 'text-atelier-muted'
                  }`}
                >
                  {lCode.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-serif text-3xl transition-colors ${
                isActive(link.path)
                  ? 'text-atelier-charcoal italic'
                  : 'text-atelier-muted hover:text-atelier-charcoal'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="pt-8 border-t border-atelier-charcoal/10 flex flex-col space-y-4">
          <Link
            to="/contact"
            className="w-full text-center py-3.5 bg-atelier-charcoal text-atelier-ivory text-[12px] tracking-editorial uppercase"
          >
            {t('startProject')}
          </Link>
          <div className="flex justify-between items-center text-[11px] text-atelier-muted pt-2">
            <span>Kyoto · London · Milan</span>
            <Link to="/admin" className="underline hover:text-atelier-charcoal">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
