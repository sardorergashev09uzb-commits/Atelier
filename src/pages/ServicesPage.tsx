import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { StudioService } from '../types';
import { api } from '../services/api';
import { fallbackServices } from '../data/initialData';
import { ArrowRight, Check } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<StudioService[]>(fallbackServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getServices().then((data) => {
      if (data && data.length) setServices(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-atelier-ivory pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-[10px] tracking-editorial uppercase text-atelier-olive block mb-3 font-medium">
            Studio Disciplines
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-atelier-charcoal leading-tight mb-6">
            Disciplines & Architectural Services
          </h1>
          <p className="text-base sm:text-lg text-atelier-muted leading-relaxed">
            Our practice approaches every commission with academic rigor, artisanal craft, and uncompromising material standards.
          </p>
        </div>

        {/* Services List with Detailed Blocks */}
        {loading ? (
          <div className="py-24 text-center font-serif italic text-lg text-atelier-muted">
            Presenting architectural disciplines...
          </div>
        ) : (
          <div className="space-y-28">
            {services.map((svc, index) => {
              const isReversed = index % 2 === 1;
              return (
                <div
                  key={svc.id}
                  className="pt-12 border-t border-atelier-charcoal/10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  {/* Image */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="aspect-[4/5] overflow-hidden bg-atelier-sand/30">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-7 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="font-mono text-sm text-atelier-muted">{svc.number}</span>
                      <span className="text-atelier-charcoal/20">/</span>
                      <span className="text-[11px] tracking-editorial uppercase text-atelier-olive font-medium">
                        Discipline
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-4xl text-atelier-charcoal mb-4">
                      {svc.title}
                    </h2>
                    <p className="font-serif italic text-lg text-atelier-muted mb-6">
                      {svc.tagline}
                    </p>
                    <p className="text-[14px] text-atelier-charcoal/80 leading-relaxed mb-8">
                      {svc.description}
                    </p>

                    {/* Scope of Work */}
                    {svc.scope && svc.scope.length > 0 && (
                      <div className="bg-atelier-cream p-6 border border-atelier-charcoal/10 mb-8">
                        <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-4">
                          Core Scope of Engagement:
                        </span>
                        <ul className="space-y-2.5 text-[13px] text-atelier-charcoal">
                          {svc.scope.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-2.5">
                              <Check className="w-4 h-4 text-atelier-olive mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Link
                      to="/contact"
                      className="inline-flex items-center space-x-2 text-[12px] tracking-editorial uppercase text-atelier-charcoal underline hover:opacity-75"
                    >
                      <span>Inquire for {svc.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Closing banner */}
        <div className="mt-28 bg-atelier-charcoal text-atelier-ivory p-12 md:p-16 text-center">
          <h3 className="font-serif text-2xl sm:text-4xl font-normal mb-4">
            Custom Commissions & Joint Ventures
          </h3>
          <p className="text-atelier-sand/80 max-w-xl mx-auto text-sm mb-8 leading-relaxed">
            Have a specialized site or multi-phase project? We would be pleased to review architectural briefs and conduct feasibility discussions.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-atelier-ivory text-atelier-charcoal text-[12px] tracking-editorial uppercase hover:bg-atelier-sand transition-all"
          >
            <span>Request Studio Proposal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
