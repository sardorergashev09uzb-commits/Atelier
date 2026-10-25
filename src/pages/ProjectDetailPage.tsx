import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Project } from '../types';
import { api } from '../services/api';
import { MaterialBoardModal } from '../components/common/MaterialBoardModal';
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, X, Sparkles } from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);
  const [materialModalOpen, setMaterialModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;

    setLoading(true);
    api.getProjectBySlug(slug).then(async (data) => {
      if (!data) {
        setLoading(false);
        return;
      }
      setProject(data);

      // Find next project for bottom transition
      const all = await api.getProjects();
      const currentIndex = all.findIndex((p) => p.slug === data.slug);
      const next = all[(currentIndex + 1) % all.length];
      if (next && next.slug !== data.slug) {
        setNextProject(next);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-atelier-ivory flex items-center justify-center pt-24">
        <span className="font-serif italic text-xl text-atelier-muted">Unfolding architectural story...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-atelier-ivory flex flex-col items-center justify-center px-6 pt-24 text-center">
        <h2 className="font-serif text-3xl text-atelier-charcoal mb-4">Project Not Found</h2>
        <p className="text-atelier-muted mb-8">The requested architectural case study could not be located.</p>
        <button
          onClick={() => navigate('/projects')}
          className="px-6 py-3 bg-atelier-charcoal text-atelier-ivory text-[12px] tracking-editorial uppercase"
        >
          Return to Selected Works
        </button>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-atelier-ivory pt-28 pb-24">
      {/* Back button & Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <Link
          to="/projects"
          className="inline-flex items-center space-x-2 text-[12px] tracking-editorial uppercase text-atelier-muted hover:text-atelier-charcoal transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Project Header */}
      <header className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-[11px] tracking-editorial uppercase text-atelier-olive font-medium">
            {project.category}
          </span>
          <span className="text-atelier-charcoal/20">/</span>
          <span className="text-[11px] tracking-editorial uppercase text-atelier-muted">
            {project.year}
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-atelier-charcoal leading-[1.08] mb-6">
          {project.title}
        </h1>

        <p className="font-serif text-xl sm:text-2xl text-atelier-muted max-w-3xl leading-relaxed italic">
          {project.subtitle}
        </p>
      </header>

      {/* Hero Full-bleed / Wide Image with Lightbox Trigger */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 mb-20">
        <div 
          onClick={() => setActiveLightboxImg(project.heroImage)}
          className="group relative aspect-[16/9] md:aspect-[21/10] overflow-hidden bg-atelier-sand/30 cursor-pointer"
        >
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute top-4 right-4 bg-atelier-ivory/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 className="w-4 h-4 text-atelier-charcoal" />
          </div>
        </div>
      </div>

      {/* Project Metadata & Overview */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-atelier-charcoal/10">
          {/* Metadata Sidebar */}
          <div className="lg:col-span-4 space-y-6 text-[13px] border-b lg:border-b-0 pb-8 lg:pb-0">
            <div>
              <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-1">
                Location
              </span>
              <span className="text-atelier-charcoal font-medium">{project.location}</span>
            </div>

            <div>
              <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-1">
                Completed
              </span>
              <span className="text-atelier-charcoal font-medium">{project.year}</span>
            </div>

            <div>
              <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-1">
                Gross Floor Area
              </span>
              <span className="text-atelier-charcoal font-medium">{project.area}</span>
            </div>

            <div>
              <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-1">
                Discipline
              </span>
              <span className="text-atelier-charcoal font-medium">{project.category} Architecture</span>
            </div>

            <div className="pt-6">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-5 py-3 bg-atelier-charcoal text-atelier-ivory text-[11px] tracking-editorial uppercase hover:bg-atelier-dark transition-all"
              >
                <span>Inquire About This Style</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-3">
                Spatial Overview
              </span>
              <p className="text-base sm:text-lg text-atelier-charcoal/90 leading-relaxed font-sans">
                {project.overview}
              </p>
            </div>

            <div>
              <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-3">
                Design & Material Approach
              </span>
              <p className="text-base sm:text-lg text-atelier-muted leading-relaxed font-sans">
                {project.approach}
              </p>
            </div>

            {/* Material Palette with Inspector Trigger */}
            {project.materials && project.materials.length > 0 && (
              <div className="bg-atelier-cream p-8 border border-atelier-charcoal/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-atelier-charcoal/10 gap-2">
                  <span className="text-[10px] tracking-editorial uppercase text-atelier-olive font-medium">
                    Material Palette & Textures
                  </span>
                  <button
                    onClick={() => setMaterialModalOpen(true)}
                    className="inline-flex items-center space-x-1.5 text-xs text-atelier-charcoal underline hover:opacity-70 font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-atelier-olive" />
                    <span>Open Interactive Material Inspector</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.materials.map((mat, i) => (
                    <div
                      key={i}
                      onClick={() => setMaterialModalOpen(true)}
                      className="flex items-center justify-between p-2.5 bg-atelier-ivory border border-atelier-charcoal/10 hover:border-atelier-charcoal/30 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-3 text-[13px] text-atelier-charcoal">
                        <span className="w-1.5 h-1.5 rounded-full bg-atelier-olive" />
                        <span>{mat}</span>
                      </div>
                      <span className="text-[10px] uppercase text-atelier-muted font-mono">View Spec →</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editorial Image Gallery (Asymmetrical Cadence with Lightbox) */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-4 md:px-12 mb-28">
          <div className="space-y-10">
            {/* First Gallery Image */}
            {project.galleryImages[0] && (
              <div 
                onClick={() => setActiveLightboxImg(project.galleryImages[0])}
                className="group relative aspect-[16/10] overflow-hidden bg-atelier-sand/30 cursor-pointer"
              >
                <img
                  src={project.galleryImages[0]}
                  alt={`${project.title} detail`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute top-4 right-4 bg-atelier-ivory/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-atelier-charcoal" />
                </div>
              </div>
            )}

            {/* Next Two Images: Asymmetric 2-column */}
            {project.galleryImages.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {project.galleryImages[1] && (
                  <div 
                    onClick={() => setActiveLightboxImg(project.galleryImages[1])}
                    className="group relative md:col-span-7 aspect-[4/5] overflow-hidden bg-atelier-sand/30 cursor-pointer"
                  >
                    <img
                      src={project.galleryImages[1]}
                      alt={`${project.title} interior`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute top-4 right-4 bg-atelier-ivory/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4 text-atelier-charcoal" />
                    </div>
                  </div>
                )}
                {project.galleryImages[2] && (
                  <div 
                    onClick={() => setActiveLightboxImg(project.galleryImages[2])}
                    className="group relative md:col-span-5 aspect-[3/4] overflow-hidden bg-atelier-sand/30 md:mt-16 cursor-pointer"
                  >
                    <img
                      src={project.galleryImages[2]}
                      alt={`${project.title} texture`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute top-4 right-4 bg-atelier-ivory/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4 text-atelier-charcoal" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Fourth image if available */}
            {project.galleryImages[3] && (
              <div 
                onClick={() => setActiveLightboxImg(project.galleryImages[3])}
                className="group relative aspect-[21/9] overflow-hidden bg-atelier-sand/30 cursor-pointer"
              >
                <img
                  src={project.galleryImages[3]}
                  alt={`${project.title} perspective`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute top-4 right-4 bg-atelier-ivory/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-atelier-charcoal" />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {activeLightboxImg && (
        <div 
          onClick={() => setActiveLightboxImg(null)}
          className="fixed inset-0 z-50 bg-atelier-dark/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          <button 
            onClick={() => setActiveLightboxImg(null)}
            className="absolute top-6 right-6 text-atelier-ivory p-2 rounded-full bg-atelier-charcoal/50 hover:bg-atelier-charcoal transition-colors"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
          <img
            src={activeLightboxImg}
            alt="Expanded view"
            className="max-w-full max-h-[90vh] object-contain shadow-2xl"
          />
        </div>
      )}

      {/* Material Board Specimen Modal */}
      <MaterialBoardModal
        isOpen={materialModalOpen}
        onClose={() => setMaterialModalOpen(false)}
        filterMaterials={project.materials}
      />

      {/* Next Project Footer Bar */}
      {nextProject && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-atelier-charcoal/10 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-2">
                Next Case Study
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-atelier-charcoal">
                {nextProject.title}
              </h3>
              <p className="text-[13px] text-atelier-muted mt-1">
                {nextProject.location} · {nextProject.category}
              </p>
            </div>
            <Link
              to={`/projects/${nextProject.slug}`}
              className="mt-6 md:mt-0 inline-flex items-center space-x-3 px-6 py-3 bg-atelier-charcoal text-atelier-ivory text-[12px] tracking-editorial uppercase hover:bg-atelier-dark transition-all"
            >
              <span>View Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </article>
  );
};
