import React, { useState, useEffect } from 'react';
import { ArchitectureMaterial } from '../../types';
import { api } from '../../services/api';
import { studioMaterials } from '../../data/materialsData';
import { X, Sparkles, MapPin, Compass } from 'lucide-react';

interface MaterialBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterMaterials?: string[];
}

export const MaterialBoardModal: React.FC<MaterialBoardModalProps> = ({
  isOpen,
  onClose,
  filterMaterials,
}) => {
  const [materials, setMaterials] = useState<ArchitectureMaterial[]>(studioMaterials);
  const [selectedMaterial, setSelectedMaterial] = useState<ArchitectureMaterial>(studioMaterials[0]);

  useEffect(() => {
    api.getMaterials().then((data) => {
      if (data && data.length) {
        setMaterials(data);
        setSelectedMaterial(data[0]);
      }
    });
  }, [isOpen]);

  if (!isOpen) return null;

  const displayedMaterials = filterMaterials && filterMaterials.length > 0
    ? materials.filter((m) =>
        filterMaterials.some((fm) => m.name.toLowerCase().includes(fm.toLowerCase()) || fm.toLowerCase().includes(m.name.toLowerCase()))
      )
    : materials;

  const currentList = displayedMaterials.length > 0 ? displayedMaterials : materials;

  return (
    <div className="fixed inset-0 z-50 bg-atelier-dark/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div className="bg-atelier-ivory max-w-5xl w-full max-h-[90vh] overflow-hidden border border-atelier-charcoal/20 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-atelier-charcoal/10 flex items-center justify-between bg-atelier-cream">
          <div className="flex items-center space-x-3">
            <span className="p-1.5 bg-atelier-olive/15 text-atelier-olive rounded">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h2 className="font-serif text-xl text-atelier-charcoal">
                Architectural Material Library & Tactile Archive
              </h2>
              <span className="text-[10px] tracking-editorial uppercase text-atelier-muted">
                Direct Quarry & Artisan Provenance
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-atelier-muted hover:text-atelier-charcoal transition-colors rounded-full hover:bg-atelier-sand/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Swatch Grid on Left, Deep Inspector on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
          {/* Left Swatches */}
          <div className="md:col-span-5 p-6 border-b md:border-b-0 md:border-r border-atelier-charcoal/10 space-y-3 bg-atelier-ivory overflow-y-auto max-h-[60vh] md:max-h-none">
            <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-2">
              Select Material Specimen ({currentList.length})
            </span>
            <div className="grid grid-cols-2 gap-3">
              {currentList.map((mat) => {
                const isSelected = selectedMaterial.id === mat.id;
                return (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`group text-left p-2.5 border transition-all ${
                      isSelected
                        ? 'border-atelier-charcoal bg-atelier-cream shadow-sm'
                        : 'border-atelier-charcoal/10 hover:border-atelier-charcoal/40 bg-atelier-ivory'
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-atelier-sand mb-2 relative">
                      <img
                        src={mat.image}
                        alt={mat.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute bottom-1 right-1 text-[8px] tracking-wider uppercase bg-atelier-dark/70 text-atelier-ivory px-1.5 py-0.5">
                        {mat.category}
                      </span>
                    </div>
                    <span className="font-serif text-xs text-atelier-charcoal block truncate">
                      {mat.name}
                    </span>
                    <span className="text-[9px] text-atelier-muted block truncate mt-0.5">
                      {mat.origin}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Inspector */}
          <div className="md:col-span-7 p-8 bg-atelier-cream/60 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center space-x-2 text-[10px] tracking-editorial uppercase text-atelier-olive mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>{selectedMaterial.category} Specification</span>
              </div>

              <h3 className="font-serif text-3xl text-atelier-charcoal mb-2">
                {selectedMaterial.name}
              </h3>

              <div className="flex items-center space-x-2 text-xs text-atelier-muted mb-6 pb-4 border-b border-atelier-charcoal/10">
                <MapPin className="w-3.5 h-3.5 text-atelier-olive" />
                <span>Provenance: {selectedMaterial.origin}</span>
              </div>

              {/* Big texture visual */}
              <div className="aspect-[21/10] overflow-hidden bg-atelier-sand mb-6 border border-atelier-charcoal/10">
                <img
                  src={selectedMaterial.image}
                  alt={selectedMaterial.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-atelier-muted block mb-1">
                    Architectural Narrative & Sourcing:
                  </span>
                  <p className="text-atelier-charcoal leading-relaxed font-sans">
                    {selectedMaterial.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-atelier-ivory p-3.5 border border-atelier-charcoal/10">
                    <span className="text-[9px] uppercase tracking-wider text-atelier-olive block mb-1 font-medium">
                      Tactile & Sensory Feel
                    </span>
                    <p className="text-atelier-charcoal/90 text-[11px] leading-relaxed">
                      {selectedMaterial.tactility}
                    </p>
                  </div>

                  <div className="bg-atelier-ivory p-3.5 border border-atelier-charcoal/10">
                    <span className="text-[9px] uppercase tracking-wider text-atelier-olive block mb-1 font-medium">
                      Aging & Natural Patina
                    </span>
                    <p className="text-atelier-charcoal/90 text-[11px] leading-relaxed">
                      {selectedMaterial.patinaBehavior}
                    </p>
                  </div>
                </div>

                <div className="bg-atelier-ivory p-3.5 border border-atelier-charcoal/10 mt-2">
                  <span className="text-[9px] uppercase tracking-wider text-atelier-muted block mb-1">
                    Primary Architectural Application:
                  </span>
                  <p className="text-atelier-charcoal font-serif italic text-[12px]">
                    "{selectedMaterial.architecturalRole}"
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-atelier-charcoal/10 flex justify-between items-center text-[11px]">
              <span className="text-atelier-muted">Specimen archival code: ATELIER-SPEC-{selectedMaterial.id.toUpperCase()}</span>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-atelier-charcoal text-atelier-ivory uppercase tracking-editorial text-[10px]"
              >
                Done Inspecting
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
