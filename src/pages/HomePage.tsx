import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Project, StudioSettings, StudioService } from '../types';
import { api } from '../services/api';
import { fallbackSettings, fallbackServices } from '../data/initialData';
import { ProjectCard } from '../components/common/ProjectCard';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [settings, setSettings] = useState<StudioSettings>(fallbackSettings);
  const [services, setServices] = useState<StudioService[]>(fallbackServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([
      api.getProjects(),
      api.getSettings(),
      api.getServices(),
    ]).then(([pData, sData, svData]) => {
      const featured = pData.filter((p) => p.isFeatured).slice(0, 3);
      setFeaturedProjects(featured.length > 0 ? featured : pData.slice(0, 3));
      if (sData) setSettings(sData);
      if (svData && svData.length) setServices(svData);
      setLoading(false);
    });
  }, []);

  const processSteps = [
    {
      step: '01',
      phase: 'Dialogue',
      title: 'Listening & Site Resonance',
      text: 'Every project begins with an unhurried conversation. We examine the orientation of natural light, the texture of the surrounding landscape, and how you genuinely inhabit space.',
    },
    {
      step: '02',
      phase: 'Concept',
      title: 'Spatial Flow & Volume',
      text: 'We sculpt physical sightlines and transitional thresholds before considering surfaces. The goal is unforced proportion and rhythmic spatial continuity.',
    },
    {
      step: '03',
      phase: 'Materiality',
      title: 'Honest Textures & Craft',
      text: 'We curate lime plasters, local stone, solid timber, and unvarnished metals — materials that patinate gracefully with age and respond to touch.',
    },
    {
      step: '04',
      phase: 'Realization',
      title: 'Artisanal Execution',
      text: 'Partnering with specialized masons, cabinetmakers, and lighting designers, we oversee construction to ensure meticulous architectural fidelity.',
    },
  ];

  return (
    <div className="min-h-screen bg-atelier-ivory">
      {/* 1. HERO SECTION (Dynamic from Admin Settings) */}
      <section className="relative min-h-[92vh] flex flex-col justify-end pt-32 pb-16 px-6 md:px-12 border-b border-atelier-charcoal/10">
        {/* Background Image / Subtle Framing */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={settings.heroImage || fallbackSettings.heroImage}
            alt="Atelier interior atmosphere"
            className="w-full h-full object-cover object-center brightness-[0.92] contrast-[0.98]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-atelier-ivory via-atelier-ivory/60 to-atelier-charcoal/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <span className="inline-block text-[11px] tracking-[0.26em] uppercase text-atelier-olive font-medium mb-4 bg-atelier-ivory/80 backdrop-blur-sm px-3 py-1 border border-atelier-olive/20">
              {settings.heroTagline || fallbackSettings.heroTagline}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-atelier-charcoal leading-[1.08] tracking-tight mb-6">
              {settings.heroTitle || fallbackSettings.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-atelier-charcoal/80 max-w-xl font-normal leading-relaxed mb-8">
              {settings.heroSubtitle || fallbackSettings.heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/projects"
                className="group inline-flex items-center space-x-3 px-7 py-3.5 bg-atelier-charcoal text-atelier-ivory text-[12px] tracking-editorial uppercase transition-all duration-300 hover:bg-atelier-dark"
              >
                <span>Explore Our Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center space-x-2 px-7 py-3.5 bg-atelier-ivory/80 backdrop-blur-sm border border-atelier-charcoal/30 text-atelier-charcoal text-[12px] tracking-editorial uppercase hover:bg-atelier-ivory transition-all duration-300"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Quick Stats/Metadata bar */}
          <div className="mt-16 pt-8 border-t border-atelier-charcoal/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-[12px]">
            <div>
              <span className="text-atelier-muted block uppercase tracking-editorial text-[10px]">Locations</span>
              <span className="font-medium text-atelier-charcoal">Milan · London · Kyoto</span>
            </div>
            <div>
              <span className="text-atelier-muted block uppercase tracking-editorial text-[10px]">Discipline</span>
              <span className="font-medium text-atelier-charcoal">Residential & Commercial</span>
            </div>
            <div>
              <span className="text-atelier-muted block uppercase tracking-editorial text-[10px]">Materiality</span>
              <span className="font-medium text-atelier-charcoal">Stone, Timber, Lime Plaster</span>
            </div>
            <div>
              <span className="text-atelier-muted block uppercase tracking-editorial text-[10px]">Ethos</span>
              <span className="font-medium text-atelier-charcoal">Restraint & Longevity</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STUDIO MANIFESTO (Dynamic from Admin Settings) */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-atelier-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline">
            <div className="lg:col-span-4">
              <span className="text-[10px] tracking-[0.25em] uppercase text-atelier-muted block mb-3">
                {settings.manifestoEyebrow || fallbackSettings.manifestoEyebrow}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-atelier-charcoal leading-snug">
                {settings.manifestoTitle || fallbackSettings.manifestoTitle}
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6 text-base sm:text-xl font-serif text-atelier-charcoal/90 leading-relaxed">
              <p>
                {settings.manifestoLead || fallbackSettings.manifestoLead}
              </p>
              <p className="text-sm sm:text-base font-sans text-atelier-muted font-normal leading-relaxed">
                {settings.manifestoBody || fallbackSettings.manifestoBody}
              </p>
              <div className="pt-4">
                <Link
                  to="/studio"
                  className="inline-flex items-center space-x-2 text-[12px] tracking-editorial uppercase text-atelier-charcoal border-b border-atelier-charcoal pb-1 hover:opacity-70 transition-opacity"
                >
                  <span>Read our design philosophy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SELECTED PROJECTS (EDITORIAL ASYMMETRICAL GRID) */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-atelier-cream border-y border-atelier-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-atelier-charcoal/10">
            <div>
              <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-2">
                Selected Works
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-atelier-charcoal font-normal">
                Curated Architecture
              </h2>
            </div>
            <Link
              to="/projects"
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-[12px] tracking-editorial uppercase text-atelier-charcoal hover:underline"
            >
              <span>View all projects ({featuredProjects.length}+)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Asymmetrical Grid: First big, next two side-by-side */}
          {loading ? (
            <div className="py-20 text-center text-atelier-muted font-serif italic text-lg">
              Curating project portfolio...
            </div>
          ) : (
            <div className="space-y-16">
              {/* Main feature project */}
              {featuredProjects[0] && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8">
                    <ProjectCard
                      project={featuredProjects[0]}
                      aspect="landscape"
                      showCategory={false}
                    />
                  </div>
                  <div className="lg:col-span-4 lg:pl-6 flex flex-col justify-center">
                    <span className="text-[10px] tracking-editorial uppercase text-atelier-olive mb-2">
                      {featuredProjects[0].category} · {featuredProjects[0].year}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-atelier-charcoal mb-3">
                      {featuredProjects[0].title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-atelier-muted mb-6">
                      {featuredProjects[0].subtitle}
                    </p>
                    <div className="border-t border-atelier-charcoal/10 pt-4 mb-6 grid grid-cols-2 gap-4 text-[12px]">
                      <div>
                        <span className="text-atelier-muted block text-[10px] uppercase">Location</span>
                        <span className="font-medium text-atelier-charcoal">{featuredProjects[0].location}</span>
                      </div>
                      <div>
                        <span className="text-atelier-muted block text-[10px] uppercase">Scale</span>
                        <span className="font-medium text-atelier-charcoal">{featuredProjects[0].area}</span>
                      </div>
                    </div>
                    <Link
                      to={`/projects/${featuredProjects[0].slug}`}
                      className="inline-flex items-center space-x-2 text-[12px] tracking-editorial uppercase text-atelier-charcoal underline hover:opacity-70"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Two column asymmetrical secondary projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 pt-8">
                {featuredProjects.slice(1, 3).map((project, idx) => (
                  <div key={project.id} className={idx === 1 ? 'md:pt-12' : ''}>
                    <ProjectCard
                      project={project}
                      aspect="portrait"
                    />
                    <p className="text-[13px] text-atelier-muted leading-relaxed mt-2 line-clamp-2">
                      {project.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. SERVICES OVERVIEW (Dynamic from Services database) */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-atelier-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-2">
              Disciplines
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-atelier-charcoal font-normal mb-4">
              Comprehensive Spatial Design
            </h2>
            <p className="text-sm md:text-base text-atelier-muted leading-relaxed">
              From concept formulation to bespoke turnkey construction, our studio provides complete architectural and interior coordination.
            </p>
          </div>

          <div className="divide-y divide-atelier-charcoal/10 border-y border-atelier-charcoal/10">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="group py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline transition-colors hover:bg-atelier-cream/50 px-2"
              >
                <span className="md:col-span-1 text-[11px] tracking-editorial text-atelier-muted font-mono">
                  {svc.number}
                </span>
                <div className="md:col-span-5">
                  <h3 className="font-serif text-xl md:text-2xl text-atelier-charcoal group-hover:text-atelier-dark transition-colors">
                    {svc.title}
                  </h3>
                  <span className="inline-block text-[10px] tracking-editorial uppercase text-atelier-olive mt-1">
                    {svc.tag}
                  </span>
                </div>
                <div className="md:col-span-5">
                  <p className="text-[13px] text-atelier-muted leading-relaxed">
                    {svc.tagline || svc.description}
                  </p>
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <Link
                    to="/services"
                    className="p-2 rounded-full border border-atelier-charcoal/10 group-hover:border-atelier-charcoal text-atelier-charcoal transition-all"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-between items-center text-[12px]">
            <span className="text-atelier-muted">Looking for a tailored approach?</span>
            <Link
              to="/services"
              className="text-atelier-charcoal tracking-editorial uppercase underline hover:opacity-70"
            >
              Explore all disciplines & scope →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. DESIGN PROCESS (4 STEPS) */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-atelier-cream border-t border-atelier-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-16">
            <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-2">
              Our Methodology
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-atelier-charcoal font-normal">
              An unhurried, rigorous approach.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="bg-atelier-ivory p-8 border border-atelier-charcoal/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-mono text-sm text-atelier-muted">
                      {step.step}
                    </span>
                    <span className="text-[10px] tracking-editorial uppercase text-atelier-olive">
                      {step.phase}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-atelier-charcoal mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-atelier-muted leading-relaxed">
                    {step.text}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-atelier-charcoal/5">
                  <span className="text-[10px] tracking-wider uppercase text-atelier-muted">
                    Atelier Standard
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CLOSING CONSULTATION CTA */}
      <section className="py-28 md:py-36 px-6 md:px-12 bg-atelier-charcoal text-atelier-ivory">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[10px] tracking-[0.28em] uppercase text-atelier-sand block mb-4">
            Start a Conversation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-8">
            Have a project in mind?<br />
            <span className="italic font-normal">Let’s shape something enduring together.</span>
          </h2>
          <p className="text-atelier-sand/80 max-w-xl mx-auto text-sm sm:text-base mb-10 leading-relaxed font-light">
            We accept a limited number of residential and commercial commissions each year to dedicate singular attention to every detail.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-atelier-ivory text-atelier-charcoal text-[12px] tracking-editorial uppercase hover:bg-atelier-sand transition-all duration-300"
            >
              <span>Schedule Initial Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`mailto:${settings.primaryEmail || fallbackSettings.primaryEmail}`}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 border border-atelier-sand/30 text-atelier-sand text-[12px] tracking-editorial uppercase hover:border-atelier-sand hover:text-atelier-ivory transition-all duration-300"
            >
              <span>{settings.primaryEmail || fallbackSettings.primaryEmail}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
