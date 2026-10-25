import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, ArrowRight, Layers, Clock, ShieldCheck, CheckSquare, Square } from 'lucide-react';

interface ProjectEstimatorProps {
  onApplyEstimation?: (data: {
    projectType: string;
    area: string;
    timeline: string;
    scopeSummary: string;
  }) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ onApplyEstimation }) => {
  const [projectType, setProjectType] = useState<'residential' | 'commercial' | 'renovation' | 'consultation'>('residential');
  const [area, setArea] = useState<number>(280);
  const [selectedPhases, setSelectedPhases] = useState<string[]>([
    'concept',
    'joinery',
    'lighting',
    'materials',
    'supervision',
  ]);

  const navigate = useNavigate();

  const phaseOptions = [
    { id: 'concept', label: 'Spatial Flow & Architectural Space Planning', weeks: 4 },
    { id: 'joinery', label: 'Bespoke Millwork, Kitchen & Bath Cabinetry Details', weeks: 5 },
    { id: 'lighting', label: 'Architectural Lighting & Circadian Engineering', weeks: 3 },
    { id: 'materials', label: 'Direct Quarry Stone & Artisan Finish Procurement', weeks: 4 },
    { id: 'supervision', label: 'Weekly On-Site Craft Supervision & Turnkey Delivery', weeks: 10 },
  ];

  const togglePhase = (id: string) => {
    if (selectedPhases.includes(id)) {
      if (selectedPhases.length > 1) {
        setSelectedPhases(selectedPhases.filter((p) => p !== id));
      }
    } else {
      setSelectedPhases([...selectedPhases, id]);
    }
  };

  // Calculation logic
  const baseWeeksMap = {
    residential: 14,
    commercial: 18,
    renovation: 20,
    consultation: 6,
  };

  const scaleMultiplier = Math.max(0.8, Math.min(2.0, area / 250));
  const phaseSumWeeks = selectedPhases.reduce((acc, pId) => {
    const found = phaseOptions.find((p) => p.id === pId);
    return acc + (found ? found.weeks : 0);
  }, 0);

  const totalCalculatedWeeks = Math.round((baseWeeksMap[projectType] * 0.4 + phaseSumWeeks * 0.6) * scaleMultiplier);
  const estimatedMonths = (totalCalculatedWeeks / 4.2).toFixed(1);
  const estimatedDrawingsCount = Math.round(20 + (area / 12) + selectedPhases.length * 5);

  const getBudgetCadence = () => {
    if (projectType === 'consultation') return '£50,000 – £120,000';
    if (area < 180) return '£180,000 – £320,000';
    if (area < 380) return '£320,000 – £650,000';
    return '£650,000 – £1,200,000+';
  };

  const handleProceed = () => {
    const summary = `${projectType.toUpperCase()} of ${area} m² · Estimated ${estimatedMonths} months timeline · Phases: ${selectedPhases.join(', ')}`;
    if (onApplyEstimation) {
      onApplyEstimation({
        projectType: projectType === 'residential' ? 'Residential Architecture' : projectType === 'commercial' ? 'Commercial / Hospitality' : projectType === 'renovation' ? 'Historic Renovation' : 'Spatial Consultation',
        area: `${area} m²`,
        timeline: `${estimatedMonths} months (~${totalCalculatedWeeks} weeks)`,
        scopeSummary: summary,
      });
    } else {
      navigate('/contact', {
        state: {
          projectType: projectType === 'residential' ? 'Residential Architecture' : projectType === 'commercial' ? 'Commercial / Hospitality' : projectType === 'renovation' ? 'Historic Renovation' : 'Spatial Consultation',
          estimatedArea: `${area} m²`,
          budgetRange: getBudgetCadence(),
          message: `Preliminary Estimator Scope: Project area of ${area} m², projected duration ~${estimatedMonths} months. Selected phases: ${selectedPhases.join(', ')}.`,
        },
      });
    }
  };

  return (
    <div className="bg-atelier-cream border border-atelier-charcoal/10 p-6 md:p-10">
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-atelier-charcoal/10">
        <span className="p-2 bg-atelier-olive/15 text-atelier-olive rounded">
          <Calculator className="w-5 h-5" />
        </span>
        <div>
          <h3 className="font-serif text-2xl text-atelier-charcoal font-normal">
            Architectural Scope & Timeline Estimator
          </h3>
          <p className="text-xs text-atelier-muted">
            Calibrate spatial milestones, drawing density, and project duration based on your square meters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Project Type */}
          <div>
            <label className="block text-[10px] tracking-editorial uppercase text-atelier-muted mb-2 font-medium">
              1. Select Spatial Typology
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'residential', label: 'Residential Villa / Flat' },
                { id: 'commercial', label: 'Commercial & Hospitality' },
                { id: 'renovation', label: 'Historic Preservation' },
                { id: 'consultation', label: 'Spatial Advisory' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setProjectType(t.id as any)}
                  className={`p-3 text-left border text-xs transition-all ${
                    projectType === t.id
                      ? 'border-atelier-charcoal bg-atelier-ivory font-medium text-atelier-charcoal shadow-sm'
                      : 'border-atelier-charcoal/15 bg-transparent text-atelier-muted hover:border-atelier-charcoal/40'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Area Slider */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-[10px] tracking-editorial uppercase text-atelier-muted font-medium">
                2. Approximate Floor Area
              </label>
              <span className="font-serif text-xl text-atelier-charcoal font-normal">
                {area} m² <span className="text-xs text-atelier-muted font-sans font-light">(~{(area * 10.764).toFixed(0)} sq ft)</span>
              </span>
            </div>
            <input
              type="range"
              min={60}
              max={1200}
              step={10}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full accent-atelier-charcoal h-1.5 bg-atelier-sand rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-atelier-muted mt-1">
              <span>60 m² (Urban Pied-à-terre)</span>
              <span>450 m² (Estate)</span>
              <span>1200 m² (Full Compound)</span>
            </div>
          </div>

          {/* Phase Checkboxes */}
          <div>
            <label className="block text-[10px] tracking-editorial uppercase text-atelier-muted mb-2 font-medium">
              3. Scope & Deliverable Packages
            </label>
            <div className="space-y-2">
              {phaseOptions.map((ph) => {
                const checked = selectedPhases.includes(ph.id);
                return (
                  <button
                    key={ph.id}
                    type="button"
                    onClick={() => togglePhase(ph.id)}
                    className="w-full flex items-center justify-between p-3 bg-atelier-ivory border border-atelier-charcoal/10 hover:border-atelier-charcoal/30 text-left transition-colors text-xs"
                  >
                    <div className="flex items-center space-x-3">
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-atelier-olive shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-atelier-muted shrink-0" />
                      )}
                      <span className={checked ? 'text-atelier-charcoal font-medium' : 'text-atelier-muted'}>
                        {ph.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-atelier-muted uppercase font-mono">
                      ~{ph.weeks} wks
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className="lg:col-span-5 bg-atelier-ivory p-6 md:p-8 border border-atelier-charcoal/15 flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-[10px] tracking-editorial uppercase text-atelier-olive block mb-2 font-medium">
              Projected Architecture Cadence
            </span>
            <div className="border-b border-atelier-charcoal/10 pb-6 mb-6">
              <span className="text-atelier-muted text-xs block mb-1">Estimated Studio Timeline</span>
              <div className="font-serif text-4xl text-atelier-charcoal">
                {estimatedMonths} <span className="text-xl font-sans text-atelier-muted font-normal">Months</span>
              </div>
              <span className="text-[11px] text-atelier-muted mt-1 block">
                Approx. {totalCalculatedWeeks} intensive architectural & craft weeks
              </span>
            </div>

            <div className="space-y-4 text-xs mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2 text-atelier-muted">
                  <Layers className="w-4 h-4 text-atelier-olive" />
                  <span>Technical Blueprint Set:</span>
                </div>
                <span className="font-medium text-atelier-charcoal font-mono">~{estimatedDrawingsCount} sheets</span>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2 text-atelier-muted">
                  <Clock className="w-4 h-4 text-atelier-olive" />
                  <span>Active Phases Included:</span>
                </div>
                <span className="font-medium text-atelier-charcoal">{selectedPhases.length} of 5</span>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2 text-atelier-muted">
                  <ShieldCheck className="w-4 h-4 text-atelier-olive" />
                  <span>Budget Tier Guidance:</span>
                </div>
                <span className="font-medium text-atelier-charcoal">{getBudgetCadence()}</span>
              </div>
            </div>

            <div className="p-3 bg-atelier-cream border border-atelier-charcoal/10 text-[11px] text-atelier-muted leading-relaxed">
              Every commission includes partner-level supervision, acoustic modeling, and material quarantine before installation.
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-atelier-charcoal/10">
            <button
              onClick={handleProceed}
              className="w-full py-3.5 bg-atelier-charcoal text-atelier-ivory text-[11px] tracking-editorial uppercase hover:bg-atelier-dark transition-all flex items-center justify-center space-x-2"
            >
              <span>Apply to Consultation Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
