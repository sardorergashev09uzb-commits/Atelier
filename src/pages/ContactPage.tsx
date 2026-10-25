import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StudioSettings } from '../types';
import { api } from '../services/api';
import { fallbackSettings } from '../data/initialData';
import { ProjectEstimator } from '../components/common/ProjectEstimator';
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, Phone, Calculator } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const location = useLocation();
  const stateData = location.state as any;

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    projectType: 'Residential Architecture',
    location: '',
    budgetRange: '£250k – £500k',
    estimatedArea: '',
    message: '',
  });

  const [settings, setSettings] = useState<StudioSettings>(fallbackSettings);
  const [showEstimator, setShowEstimator] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getSettings().then((data) => {
      if (data) setSettings(data);
    });

    if (stateData) {
      setFormData((prev) => ({
        ...prev,
        projectType: stateData.projectType || prev.projectType,
        estimatedArea: stateData.estimatedArea || prev.estimatedArea,
        budgetRange: stateData.budgetRange || prev.budgetRange,
        message: stateData.message || prev.message,
      }));
    }
  }, [stateData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await api.submitInquiry(formData);
      if (res.success) {
        setSuccessResponse(res.message);
        setFormData({
          clientName: '',
          email: '',
          phone: '',
          projectType: 'Residential Architecture',
          location: '',
          budgetRange: '£250k – £500k',
          estimatedArea: '',
          message: '',
        });
      } else {
        setErrorMessage('Failed to transmit inquiry. Please verify your details.');
      }
    } catch (err) {
      setErrorMessage('Could not connect to studio server. Please retry or email directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleApplyEstimation = (data: {
    projectType: string;
    area: string;
    timeline: string;
    scopeSummary: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      projectType: data.projectType,
      estimatedArea: data.area,
      message: `Calculated Scope: Area of ${data.area}, estimated ${data.timeline}.\n\nAdditional Vision Notes: `,
    }));
    setShowEstimator(false);
  };

  return (
    <div className="min-h-screen bg-atelier-ivory pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-[10px] tracking-editorial uppercase text-atelier-olive block mb-3 font-medium">
            Project Inquiries & Consultation
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-atelier-charcoal leading-tight mb-6">
            Begin an Architectural Dialogue
          </h1>
          <p className="text-base sm:text-lg text-atelier-muted leading-relaxed font-sans mb-6">
            We invite prospective residential and commercial clients to share the initial parameters of their project. Every inquiry is reviewed directly by our founding partners.
          </p>

          <button
            type="button"
            onClick={() => setShowEstimator(!showEstimator)}
            className="inline-flex items-center space-x-2 text-xs tracking-editorial uppercase px-4 py-2 border border-atelier-charcoal/20 hover:border-atelier-charcoal bg-atelier-cream text-atelier-charcoal transition-colors"
          >
            <Calculator className="w-4 h-4 text-atelier-olive" />
            <span>{showEstimator ? 'Hide Scope Estimator' : 'Open Interactive Project Scope & Timeline Estimator'}</span>
          </button>
        </div>

        {/* Collapsible Scope Estimator */}
        {showEstimator && (
          <div className="mb-16 animate-fade-in">
            <ProjectEstimator onApplyEstimation={handleApplyEstimation} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-atelier-cream p-8 md:p-12 border border-atelier-charcoal/10">
            {successResponse ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-atelier-olive mx-auto mb-4 stroke-[1.2]" />
                <h3 className="font-serif text-2xl text-atelier-charcoal mb-3">
                  Inquiry Received With Thanks
                </h3>
                <p className="text-sm text-atelier-muted max-w-md mx-auto leading-relaxed mb-8">
                  {successResponse}
                </p>
                <button
                  onClick={() => setSuccessResponse(null)}
                  className="px-6 py-3 bg-atelier-charcoal text-atelier-ivory text-[11px] tracking-editorial uppercase"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-atelier-charcoal mb-2 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Stirling"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-4 py-3 text-sm focus:outline-none focus:border-atelier-charcoal"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-atelier-charcoal mb-2 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="eleanor@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-4 py-3 text-sm focus:outline-none focus:border-atelier-charcoal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-atelier-charcoal mb-2 font-medium">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+44 20 7946 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-4 py-3 text-sm focus:outline-none focus:border-atelier-charcoal"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-atelier-charcoal mb-2 font-medium">
                      Project Location
                    </label>
                    <input
                      type="text"
                      placeholder="City, Country (e.g. Zurich)"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-4 py-3 text-sm focus:outline-none focus:border-atelier-charcoal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-atelier-charcoal mb-2 font-medium">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-4 py-3 text-sm focus:outline-none focus:border-atelier-charcoal"
                    >
                      <option value="Residential Architecture">Residential Architecture</option>
                      <option value="Commercial / Hospitality">Commercial / Hospitality</option>
                      <option value="Historic Renovation">Historic Renovation</option>
                      <option value="Spatial Consultation">Spatial Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-atelier-charcoal mb-2 font-medium">
                      Estimated Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 350 m²"
                      value={formData.estimatedArea}
                      onChange={(e) => setFormData({ ...formData, estimatedArea: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-4 py-3 text-sm focus:outline-none focus:border-atelier-charcoal"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-atelier-charcoal mb-2 font-medium">
                      Budget Scale
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full bg-atelier-ivory border border-atelier-charcoal/20 px-4 py-3 text-sm focus:outline-none focus:border-atelier-charcoal"
                    >
                      <option value="Under £150,000">Under £150,000</option>
                      <option value="£150,000 – £350,000">£150,000 – £350,000</option>
                      <option value="£350,000 – £750,000">£350,000 – £750,000</option>
                      <option value="£750,000+">£750,000+</option>
                      <option value="To be determined">To be determined</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] tracking-editorial uppercase text-atelier-charcoal mb-2 font-medium">
                    Project Vision & Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your site, desired timing, and the atmosphere you wish to evoke..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-atelier-ivory border border-atelier-charcoal/20 p-4 text-sm focus:outline-none focus:border-atelier-charcoal"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-atelier-charcoal text-atelier-ivory text-[12px] tracking-editorial uppercase hover:bg-atelier-dark transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <span>{submitting ? 'Transmitting to Partners...' : 'Send Consultation Inquiry'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-atelier-muted mt-3 text-center">
                    Stored securely and reviewed in confidentiality under studio NDA.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Contact Details & Studios (Dynamic from Settings) */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <span className="text-[10px] tracking-editorial uppercase text-atelier-olive block mb-2 font-medium">
                Studio Locations
              </span>
              <h2 className="font-serif text-2xl text-atelier-charcoal mb-6">
                Our Physical Spaces
              </h2>

              <div className="space-y-6 text-sm text-atelier-charcoal">
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-4 h-4 text-atelier-olive mt-1 shrink-0" />
                  <div>
                    <strong className="block font-medium">Milan (Headquarters)</strong>
                    <span className="text-atelier-muted">{settings.locationMilan || fallbackSettings.locationMilan}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-4 h-4 text-atelier-olive mt-1 shrink-0" />
                  <div>
                    <strong className="block font-medium">London Office</strong>
                    <span className="text-atelier-muted">{settings.locationLondon || fallbackSettings.locationLondon}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-4 h-4 text-atelier-olive mt-1 shrink-0" />
                  <div>
                    <strong className="block font-medium">Kyoto Atelier</strong>
                    <span className="text-atelier-muted">{settings.locationKyoto || fallbackSettings.locationKyoto}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-atelier-charcoal/10 pt-8 space-y-4 text-sm">
              <div className="flex items-center space-x-3.5">
                <Mail className="w-4 h-4 text-atelier-olive shrink-0" />
                <a href={`mailto:${settings.primaryEmail || fallbackSettings.primaryEmail}`} className="hover:underline">
                  {settings.primaryEmail || fallbackSettings.primaryEmail}
                </a>
              </div>

              <div className="flex items-center space-x-3.5">
                <Phone className="w-4 h-4 text-atelier-olive shrink-0" />
                <span>{(settings.phoneMilan || fallbackSettings.phoneMilan)} / {(settings.phoneLondon || fallbackSettings.phoneLondon)}</span>
              </div>

              <div className="flex items-center space-x-3.5 text-atelier-muted">
                <Clock className="w-4 h-4 text-atelier-olive shrink-0" />
                <span>Studio hours: {settings.studioHours || fallbackSettings.studioHours}</span>
              </div>
            </div>

            <div className="bg-atelier-cream p-6 border border-atelier-charcoal/10">
              <span className="text-[10px] tracking-editorial uppercase text-atelier-muted block mb-2">
                Press & Architectural Lectures
              </span>
              <p className="text-[13px] text-atelier-muted leading-relaxed">
                For monographs, publication imagery requests, and university lectures, contact{' '}
                <a href={`mailto:${settings.pressEmail || fallbackSettings.pressEmail}`} className="text-atelier-charcoal underline">
                  {settings.pressEmail || fallbackSettings.pressEmail}
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
