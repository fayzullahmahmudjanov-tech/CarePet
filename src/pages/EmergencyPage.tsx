import { useState } from 'react';
import {
  Siren,
  Phone,
  MapPin,
  Clock,
  AlertTriangle,
  Check,
  RotateCcw,
  Stethoscope,
  Activity,
  HeartPulse,
  Bandage,
} from 'lucide-react';
import { useApp } from '@/context';

export default function EmergencyPage() {
  const { showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    phone: '',
    petName: '',
    petSpecies: '',
    emergencyType: '',
    description: '',
    address: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.ownerName.trim()) e.ownerName = 'Your name is required';
    if (!formData.phone.trim()) e.phone = 'Phone number is required';
    if (!formData.petName.trim()) e.petName = 'Pet name is required';
    if (!formData.petSpecies.trim()) e.petSpecies = 'Pet species is required';
    if (!formData.emergencyType) e.emergencyType = 'Please select the type of emergency';
    if (!formData.description.trim()) e.description = 'Please describe the situation';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    showToast('Emergency request sent! Our team will call you shortly.', 'success');
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ ownerName: '', phone: '', petName: '', petSpecies: '', emergencyType: '', description: '', address: '' });
    setErrors({});
  };

  const emergencyTypes = [
    { value: 'trauma', label: 'Trauma / Injury', icon: Bandage },
    { value: 'poisoning', label: 'Suspected Poisoning', icon: AlertTriangle },
    { value: 'breathing', label: 'Breathing Difficulty', icon: HeartPulse },
    { value: 'seizure', label: 'Seizure / Collapse', icon: Activity },
    { value: 'bleeding', label: 'Severe Bleeding', icon: Bandage },
    { value: 'other', label: 'Other Emergency', icon: Stethoscope },
  ];

  if (submitted) {
    return (
      <div className="animate-fade-in">
        <section className="section-padding">
          <div className="container-wide max-w-2xl">
            <div className="rounded-3xl bg-white p-8 text-center shadow-card-hover dark:bg-ink-900 sm:p-12">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success-100 dark:bg-success-700/30 animate-bounce-in">
                <Check className="h-10 w-10 text-success-600 dark:text-success-400" />
              </div>
              <h1 className="text-3xl font-extrabold text-ink-900 dark:text-white">Emergency Request Received</h1>
              <p className="mt-3 text-ink-600 dark:text-ink-400">
                Our emergency team has been notified. A veterinarian will call <span className="font-semibold text-brand-600 dark:text-brand-400">{formData.phone}</span> within 5 minutes.
              </p>
              <div className="mt-6 rounded-2xl bg-danger-50 p-4 dark:bg-danger-950/30">
                <p className="flex items-center justify-center gap-2 text-sm font-semibold text-danger-700 dark:text-danger-400">
                  <Phone className="h-4 w-4" /> If the situation is critical, call us now: (503) 555-0199
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-ink-100 p-6 text-left dark:border-ink-800">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">Request Summary</h2>
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase text-ink-400">Owner</dt>
                    <dd className="mt-1 font-medium text-ink-900 dark:text-white">{formData.ownerName}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-ink-400">Pet</dt>
                    <dd className="mt-1 font-medium text-ink-900 dark:text-white">{formData.petName} ({formData.petSpecies})</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-ink-400">Emergency Type</dt>
                    <dd className="mt-1 font-medium text-ink-900 dark:text-white">{emergencyTypes.find((t) => t.value === formData.emergencyType)?.label}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-ink-400">Phone</dt>
                    <dd className="mt-1 font-medium text-ink-900 dark:text-white">{formData.phone}</dd>
                  </div>
                  {formData.address && (
                    <div className="sm:col-span-2">
                      <dt className="text-xs font-semibold uppercase text-ink-400">Address</dt>
                      <dd className="mt-1 font-medium text-ink-900 dark:text-white">{formData.address}</dd>
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-semibold uppercase text-ink-400">Description</dt>
                    <dd className="mt-1 font-medium text-ink-900 dark:text-white">{formData.description}</dd>
                  </div>
                </dl>
              </div>

              <button onClick={handleReset} className="btn-primary mt-8">
                <RotateCcw className="h-5 w-5" /> Submit Another Request
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Emergency Banner */}
      <section className="bg-danger-500 text-white">
        <div className="container-wide px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <Siren className="h-7 w-7" />
                </div>
                <span className="absolute -right-1 -top-1 flex h-4 w-4">
                  <span className="absolute h-full w-full animate-pulse-ring rounded-full bg-white opacity-75" />
                  <span className="h-full w-full rounded-full bg-white" />
                </span>
              </div>
              <div>
                <h1 className="text-xl font-extrabold sm:text-2xl">24/7 Emergency Help</h1>
                <p className="text-sm text-white/90">We're here when your pet needs us most</p>
              </div>
            </div>
            <a
              href="tel:+15035550199"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-danger-600 shadow-sm transition-all hover:bg-danger-50 active:scale-95"
            >
              <Phone className="h-5 w-5" /> Call (503) 555-0199
            </a>
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="card">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-danger-100 text-danger-600 dark:bg-danger-500/20 dark:text-danger-400">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink-900 dark:text-white">Always Available</h3>
              <p className="mt-2 text-sm text-ink-600 dark:text-ink-400">
                Our emergency department operates 24 hours a day, 7 days a week, including all holidays. No appointment needed.
              </p>
            </div>
            <div className="card">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink-900 dark:text-white">Our Location</h3>
              <p className="mt-2 text-sm text-ink-600 dark:text-ink-400">
                128 Greenfield Avenue, Portland, OR 97201. Free emergency parking available at the rear entrance.
              </p>
            </div>
            <div className="card">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400">
                <Stethoscope className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink-900 dark:text-white">What to Expect</h3>
              <p className="mt-2 text-sm text-ink-600 dark:text-ink-400">
                A triage nurse will assess your pet immediately upon arrival. Critical cases are seen first — we'll keep you informed at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Form */}
      <section className="pb-16">
        <div className="container-wide max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-danger-200 bg-white p-6 shadow-card dark:border-danger-500/30 dark:bg-ink-900 sm:p-8">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white">Report an Emergency</h2>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
              Fill out this form and our emergency team will call you back within 5 minutes. For immediate assistance, call <a href="tel:+15035550199" className="font-semibold text-danger-600 dark:text-danger-400">(503) 555-0199</a>.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              <div className="rounded-xl bg-danger-50 p-4 dark:bg-danger-950/20">
                <p className="flex items-start gap-2 text-sm text-danger-700 dark:text-danger-400">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                  If your pet is not breathing, has severe bleeding, or is unconscious, call us immediately instead of filling out this form.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="em-owner" className="label-field">Your Name *</label>
                  <input
                    id="em-owner"
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className={`input-field ${errors.ownerName ? 'border-danger-500' : ''}`}
                    placeholder="Jane Smith"
                    required
                  />
                  {errors.ownerName && <p className="mt-1 text-xs text-danger-600">{errors.ownerName}</p>}
                </div>
                <div>
                  <label htmlFor="em-phone" className="label-field">Phone Number *</label>
                  <input
                    id="em-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`input-field ${errors.phone ? 'border-danger-500' : ''}`}
                    placeholder="(503) 555-0100"
                    required
                  />
                  {errors.phone && <p className="mt-1 text-xs text-danger-600">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="em-petname" className="label-field">Pet Name *</label>
                  <input
                    id="em-petname"
                    type="text"
                    value={formData.petName}
                    onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                    className={`input-field ${errors.petName ? 'border-danger-500' : ''}`}
                    placeholder="Max"
                    required
                  />
                  {errors.petName && <p className="mt-1 text-xs text-danger-600">{errors.petName}</p>}
                </div>
                <div>
                  <label htmlFor="em-petspecies" className="label-field">Pet Species *</label>
                  <input
                    id="em-petspecies"
                    type="text"
                    value={formData.petSpecies}
                    onChange={(e) => setFormData({ ...formData, petSpecies: e.target.value })}
                    className={`input-field ${errors.petSpecies ? 'border-danger-500' : ''}`}
                    placeholder="Dog, Cat, Rabbit..."
                    required
                  />
                  {errors.petSpecies && <p className="mt-1 text-xs text-danger-600">{errors.petSpecies}</p>}
                </div>
              </div>

              <div>
                <p className="label-field">Type of Emergency *</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {emergencyTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, emergencyType: type.value });
                        setErrors({ ...errors, emergencyType: '' });
                      }}
                      className={`flex items-center gap-2 rounded-xl border-2 p-3 text-left text-sm font-medium transition-all ${
                        formData.emergencyType === type.value
                          ? 'border-danger-500 bg-danger-50 text-danger-700 dark:bg-danger-950/30 dark:text-danger-400'
                          : 'border-ink-200 text-ink-600 hover:border-danger-300 dark:border-ink-700 dark:text-ink-300'
                      }`}
                    >
                      <type.icon className="h-4 w-4 shrink-0" />
                      {type.label}
                    </button>
                  ))}
                </div>
                {errors.emergencyType && <p className="mt-1 text-xs text-danger-600">{errors.emergencyType}</p>}
              </div>

              <div>
                <label htmlFor="em-desc" className="label-field">Describe the Situation *</label>
                <textarea
                  id="em-desc"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`input-field resize-none ${errors.description ? 'border-danger-500' : ''}`}
                  placeholder="What happened? When did symptoms start? Is your pet conscious and breathing?"
                  required
                />
                {errors.description && <p className="mt-1 text-xs text-danger-600">{errors.description}</p>}
              </div>

              <div>
                <label htmlFor="em-address" className="label-field">Your Address (for house calls, optional)</label>
                <input
                  id="em-address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="input-field"
                  placeholder="123 Main St, Portland, OR"
                />
              </div>

              <button type="submit" className="btn-danger w-full">
                <Siren className="h-5 w-5" /> Send Emergency Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
