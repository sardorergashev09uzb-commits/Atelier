import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const StudioPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const team = [
    {
      name: 'Julian Vance',
      role: 'Creative Director & Founder',
      location: 'Milan / London',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Formally trained at ETH Zurich and the Architectural Association, Julian steers the aesthetic and philosophical ethos of the studio.',
    },
    {
      name: 'Kaori Takahashi',
      role: 'Director of Architecture & Materials',
      location: 'Kyoto',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Specializing in historical wood joinery and lime plasters, Kaori oversees residential commissions across Asia and Southern Europe.',
    },
    {
      name: 'Matteo Bellini',
      role: 'Head of Interior Detailing',
      location: 'Milan',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      bio: 'With a background in bespoke Italian cabinetry and metalwork, Matteo translates conceptual volume into precise tactile reality.',
    },
    {
      name: 'Camilla Thorne',
      role: 'Senior Project Architect',
      location: 'London',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      bio: 'Directing complex restorations in historic city centers, Camilla merges conservation preservation with contemporary engineering.',
    },
  ];

  return (
    <div className="min-h-screen bg-atelier-ivory pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] tracking-editorial uppercase text-atelier-olive block mb-3 font-medium">
            Studio Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-atelier-charcoal leading-tight mb-6">
            The Ethos of Quiet Architecture
          </h1>
          <p className="text-base sm:text-lg text-atelier-muted leading-relaxed font-sans">
            Founded on the conviction that great interiors are felt rather than loudly announced. We work between Milan, London, and Kyoto to create spaces shaped around human rhythm.
          </p>
        </div>

        {/* Big Editorial Image */}
        <div className="aspect-[21/9] overflow-hidden bg-atelier-sand/30 mb-20">
          <img
            src="https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1800&q=85"
            alt="Atelier workspace atmosphere"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Manifesto Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24 border-b border-atelier-charcoal/10">
          <div className="lg:col-span-4">
            <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-2">
              Core Principles
            </span>
            <h2 className="font-serif text-3xl text-atelier-charcoal">
              Form, Silence, and Natural Patina.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-8 text-base text-atelier-charcoal/90 leading-relaxed">
            <p>
              We reject the transient cycles of design trends. Instead, our studio grounds every line in timeless architectural geometry — balancing open sightlines with intimate sanctuaries of shade and quietude.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="bg-atelier-cream p-6 border border-atelier-charcoal/10">
                <h4 className="font-serif text-xl text-atelier-charcoal mb-2">Tactile Authenticity</h4>
                <p className="text-[13px] text-atelier-muted leading-relaxed">
                  We specify unpolished stone, untreated timber, and hand-troweled plasters that breathe and respond to daily touch, gathering poetic character as decades pass.
                </p>
              </div>
              <div className="bg-atelier-cream p-6 border border-atelier-charcoal/10">
                <h4 className="font-serif text-xl text-atelier-charcoal mb-2">Spatial Choreography</h4>
                <p className="text-[13px] text-atelier-muted leading-relaxed">
                  A room is never an isolated container. We curate the sequence of thresholds, daylight transitions, and atmospheric sound dampening across the entire home.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-24">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-2">
              Leadership & Artisans
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-atelier-charcoal font-normal">
              The Studio Team
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="group">
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
                  {member.role}
                </span>
                <p className="text-[12px] text-atelier-muted leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
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
