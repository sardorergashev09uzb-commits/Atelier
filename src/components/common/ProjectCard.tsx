import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  aspect?: 'portrait' | 'landscape' | 'square';
  className?: string;
  showCategory?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  aspect = 'portrait',
  className = '',
  showCategory = true,
}) => {
  const aspectClasses = {
    portrait: 'aspect-[4/5]',
    landscape: 'aspect-[16/10]',
    square: 'aspect-square',
  };

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group block focus:outline-none ${className}`}
    >
      <div className={`relative overflow-hidden bg-atelier-sand/40 ${aspectClasses[aspect]} mb-4`}>
        <img
          src={project.heroImage}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-atelier-charcoal/0 group-hover:bg-atelier-charcoal/10 transition-colors duration-500" />
        
        {/* Subtle hover icon */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-atelier-ivory/80 backdrop-blur-sm flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-atelier-charcoal">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline justify-between pt-1">
        <div>
          <h3 className="font-serif text-lg md:text-xl text-atelier-charcoal group-hover:opacity-75 transition-opacity">
            {project.title}
          </h3>
          <p className="text-[12px] text-atelier-muted mt-0.5 tracking-wide">
            {project.location} · {project.year}
          </p>
        </div>

        {showCategory && (
          <span className="text-[10px] tracking-editorial uppercase text-atelier-olive border border-atelier-olive/20 px-2 py-0.5 rounded-sm">
            {project.category}
          </span>
        )}
      </div>
    </Link>
  );
};
