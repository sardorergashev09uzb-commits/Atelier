import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { api } from '../services/api';
import { ProjectCard } from '../components/common/ProjectCard';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Residential', 'Commercial', 'Renovation'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoading(true);
    api.getProjects(selectedCategory).then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-atelier-ivory pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] tracking-editorial uppercase text-atelier-olive block mb-3 font-medium">
            Curated Portfolio
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-atelier-charcoal leading-tight mb-6">
            Selected Architecture & Interiors
          </h1>
          <p className="text-base sm:text-lg text-atelier-muted leading-relaxed">
            A survey of thoughtful spaces where natural materials, tailored joinery, and changing light create quiet, tactile environments.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-3 pb-8 mb-12 border-b border-atelier-charcoal/10">
          <span className="text-[11px] uppercase tracking-editorial text-atelier-muted mr-3 hidden sm:inline">
            Discipline:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[12px] tracking-editorial uppercase px-4 py-2 transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-atelier-charcoal text-atelier-ivory font-medium'
                  : 'bg-atelier-cream text-atelier-muted hover:text-atelier-charcoal hover:bg-atelier-sand/60'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-atelier-muted">
            {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
          </span>
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="py-24 text-center font-serif italic text-lg text-atelier-muted">
            Loading architectural portfolio...
          </div>
        ) : projects.length === 0 ? (
          <div className="py-24 text-center text-atelier-muted">
            No projects found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {projects.map((project, index) => {
              // Asymmetric rhythm: every 4th or 1st can take more prominence
              const isWide = index === 0 || index === 4;
              return (
                <div
                  key={project.id}
                  className={isWide ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}
                >
                  <ProjectCard
                    project={project}
                    aspect={isWide ? 'landscape' : 'portrait'}
                  />
                  <p className="text-[13px] text-atelier-muted leading-relaxed mt-2 line-clamp-2">
                    {project.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Disclaimer / Editorial Note */}
        <div className="mt-24 pt-8 border-t border-atelier-charcoal/10 text-center text-[12px] text-atelier-muted">
          All showcase concepts demonstrate spatial explorations and architectural material palettes developed by ATELIER Studio.
        </div>
      </div>
    </div>
  );
};
