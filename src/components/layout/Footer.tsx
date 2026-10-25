import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-atelier-cream border-t border-atelier-charcoal/10 pt-20 pb-12 text-atelier-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Upper Row: Brand & Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-atelier-charcoal/10">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-serif tracking-[0.24em] text-2xl font-normal block mb-3">
                ATELIER
              </span>
              <p className="text-[14px] leading-relaxed text-atelier-muted max-w-sm">
                A refined interior architecture studio creating quiet, tactile, and enduring residential and commercial environments worldwide.
              </p>
            </div>
            <div className="mt-8 pt-4">
              <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-1">
                New Business Inquiries
              </span>
              <a
                href="mailto:inquire@atelier-studio.com"
                className="font-serif text-lg text-atelier-charcoal hover:underline inline-flex items-center space-x-1"
              >
                <span>inquire@atelier-studio.com</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Locations */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 text-[13px]">
            <div>
              <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-3">
                Milan Studio
              </span>
              <p className="text-atelier-muted leading-relaxed">
                Via Solferino 14<br />
                20121 Milano, Italy<br />
                +39 02 8901 2345
              </p>
            </div>
            <div>
              <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-3">
                London Office
              </span>
              <p className="text-atelier-muted leading-relaxed">
                42 Marylebone High St<br />
                London W1U 5HF, UK<br />
                +44 20 7946 0888
              </p>
            </div>
            <div className="col-span-2 pt-2">
              <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-3">
                Kyoto Atelier
              </span>
              <p className="text-atelier-muted leading-relaxed">
                Kamigyo Ward, Kyoto 602-0898, Japan
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-3">
                Studio Index
              </span>
              <ul className="space-y-2 text-[13px]">
                <li>
                  <Link to="/projects" className="text-atelier-muted hover:text-atelier-charcoal transition-colors">
                    Selected Projects
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-atelier-muted hover:text-atelier-charcoal transition-colors">
                    Disciplines & Services
                  </Link>
                </li>
                <li>
                  <Link to="/studio" className="text-atelier-muted hover:text-atelier-charcoal transition-colors">
                    Philosophy & Team
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-atelier-muted hover:text-atelier-charcoal transition-colors">
                    Consultation Request
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="text-atelier-olive hover:underline transition-colors text-[12px]">
                    Internal Studio Portal →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lower Row: Copyright & Note */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-atelier-muted space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} ATELIER Interior Architecture Studio. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <span>Fictional Concept Portfolio</span>
            <span>Privacy & Terms</span>
            <a href="#root" className="hover:text-atelier-charcoal transition-colors">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
