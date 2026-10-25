import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TeamMember, StudioSettings } from '../types';
import { api } from '../services/api';
import { fallbackTeamMembers, fallbackSettings } from '../data/initialData';
import { ArrowRight } from 'lucide-react';

export const StudioPage: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>(fallbackTeamMembers);
  const [settings, setSettings] = useState<StudioSettings>(fallbackSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([api.getTeamMembers(), api.getSettings()]).then(([tData, sData]) => {
      if (tData && tData.length) setTeam(tData);
      if (sData) setSettings(sData);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-atelier-ivory pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] tracking-editorial uppercase text-atelier-olive block mb-3 font-medium">
            {settings.manifestoEyebrow || 'Studio Philosophy'}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-atelier-charcoal leading-tight mb-6">
            The Ethos of Quiet Architecture
          </h1>
          <p className="text-base sm:text-lg text-atelier-muted leading-relaxed font-sans">
            {settings.manifestoBody || 'Founded on the conviction that great interiors are felt rather than loudly announced. We work between Milan, London, and Kyoto to create spaces shaped around human rhythm.'}
          </p>
        </div>

        {/* Big Editorial Image */}
        <div className="aspect-[21/9] overflow-hidden bg-atelier-sand/30 mb-20">
          <img
            src={settings.studioWorkspaceImage || fallbackSettings.studioWorkspaceImage}
            alt="Atelier workspace atmosphere"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Manifesto Columns (Dynamic) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24 border-b border-atelier-charcoal/10">
          <div className="lg:col-span-4">
            <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-2">
              Core Principles
            </span>
            <h2 className="font-serif text-3xl text-atelier-charcoal">
              {settings.manifestoTitle || 'Form, Silence, and Natural Patina.'}
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-8 text-base text-atelier-charcoal/90 leading-relaxed">
            <p className="font-serif italic text-lg sm:text-xl text-atelier-charcoal">
              "{settings.manifestoLead || fallbackSettings.manifestoLead}"
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="bg-atelier-cream p-6 border border-atelier-charcoal/10">
                <h4 className="font-serif text-xl text-atelier-charcoal mb-2">
                  {settings.principle1Title || fallbackSettings.principle1Title}
                </h4>
                <p className="text-[13px] text-atelier-muted leading-relaxed">
                  {settings.principle1Text || fallbackSettings.principle1Text}
                </p>
              </div>
              <div className="bg-atelier-cream p-6 border border-atelier-charcoal/10">
                <h4 className="font-serif text-xl text-atelier-charcoal mb-2">
                  {settings.principle2Title || fallbackSettings.principle2Title}
                </h4>
                <p className="text-[13px] text-atelier-muted leading-relaxed">
                  {settings.principle2Text || fallbackSettings.principle2Text}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section (Dynamic from Database) */}
        <div className="py-24">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-2">
              Leadership & Artisans
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-atelier-charcoal font-normal">
              The Studio Team ({team.length})
            </h2>
          </div>

          {loading ? (
            <div className="py-16 text-center text-atelier-muted font-serif italic">Loading studio members...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.id} className="group">
                  <div className="aspect-[4/5] overflow-hidden bg-atelier-sand/30 mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-serif text-lg text-atelier-charcoal">
                    {member.name}
                  </h3>
                  <span className="text-[11px] tracking-editorial uppercase text-atelier-olive block mt-0.5 mb-2">
                    {member.role} · {member.location}
                  </span>
                  <p className="text-[12px] text-atelier-muted leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Closing Contact CTA */}
        <div className="pt-16 border-t border-atelier-charcoal/10 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-atelier-charcoal mb-1">
              Interested in collaborating with our team?
            </h3>
            <p className="text-sm text-atelier-muted">
              We welcome commissions across Europe, Asia, and North America.
            </p>
          </div>
          <Link
            to="/contact"
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 px-8 py-4 bg-atelier-charcoal text-atelier-ivory text-[12px] tracking-editorial uppercase hover:bg-atelier-dark transition-all"
          >
            <span>Begin a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
