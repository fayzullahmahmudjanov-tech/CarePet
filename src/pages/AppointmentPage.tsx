import { useState } from 'react';
import {
  Calendar,
  Check,
  User,
  PawPrint,
  Stethoscope,
  Clock,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '@/context';
import { services, vets } from '@/data';

const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

export default function AppointmentPage() {
  const { pets, showToast } = useApp();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    petName: '',
    petType: '',
    service: '',
    vet: '',
    date: '',
    time: '',
    ownerName: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number) => {
    const e: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.petName.trim()) e.petName = 'Pet name is required';
      if (!formData.petType.trim()) e.petType = 'Pet type is required';
    }
    if (currentStep === 2) {
      if (!formData.service) e.service = 'Please select a service';
    }
    if (currentStep === 3) {
      if (!formData.vet) e.vet = 'Please select a veterinarian';
      if (!formData.date) e.date = 'Please pick a date';
      if (!formData.time) e.time = 'Please pick a time';
    }
    if (currentStep === 4) {
      if (!formData.ownerName.trim()) e.ownerName = 'Your name is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Valid email is required';
      if (!formData.phone.trim()) e.phone = 'Phone number is required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 4));
    }
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    setSubmitted(true);
    showToast('Appointment booked successfully!', 'success');
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    setFormData({ petName: '', petType: '', service: '', vet: '', date: '', time: '', ownerName: '', email: '', phone: '', notes: '' });
    setErrors({});
  };

  const selectedVet = vets.find((v) => v.id === formData.vet);
  const selectedService = services.find((s) => s.id === formData.service);

  const today = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <div className="animate-fade-in">
        <section className="section-padding">
          <div className="container-wide max-w-2xl">
            <div className="rounded-3xl bg-white p-8 text-center shadow-card-hover dark:bg-ink-900 sm:p-12">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success-100 dark:bg-success-700/30 animate-bounce-in">
                <Check className="h-10 w-10 text-success-600 dark:text-success-400" />
              </div>
              <h1 className="text-3xl font-extrabold text-ink-900 dark:text-white">Appointment Confirmed!</h1>
              <p className="mt-3 text-ink-600 dark:text-ink-400">
                We've sent a confirmation to <span className="font-semibold text-brand-600 dark:text-brand-400">{formData.email}</span>. You'll receive a reminder 24 hours before your visit.
              </p>

              <div className="mt-8 rounded-2xl border border-ink-100 p-6 text-left dark:border-ink-800">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">Appointment Details</h2>
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase text-ink-400">Pet</dt>
                    <dd className="mt-1 flex items-center gap-2 font-medium text-ink-900 dark:text-white">
                      <PawPrint className="h-4 w-4 text-brand-500" /> {formData.petName} ({formData.petType})
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-ink-400">Service</dt>
                    <dd className="mt-1 font-medium text-ink-900 dark:text-white">{selectedService?.name || formData.service}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-ink-400">Veterinarian</dt>
                    <dd className="mt-1 font-medium text-ink-900 dark:text-white">{selectedVet?.name || 'Any available vet'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-ink-400">Date & Time</dt>
                    <dd className="mt-1 flex items-center gap-2 font-medium text-ink-900 dark:text-white">
                      <Calendar className="h-4 w-4 text-brand-500" /> {formData.date} at {formData.time}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-ink-400">Owner</dt>
                    <dd className="mt-1 font-medium text-ink-900 dark:text-white">{formData.ownerName}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-ink-400">Phone</dt>
                    <dd className="mt-1 font-medium text-ink-900 dark:text-white">{formData.phone}</dd>
                  </div>
                </dl>
              </div>

              <button onClick={handleReset} className="btn-primary mt-8">
                <RotateCcw className="h-5 w-5" /> Book Another Appointment
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="gradient-hero">
        <div className="container-wide px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <span className="badge bg-brand-100 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">Book Appointment</span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-5xl">
            Schedule your visit
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
            Book in four quick steps. Choose your pet, service, vet, and time — all in under two minutes.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          {/* Progress */}
          <div className="mb-8 flex items-center justify-between">
            {[
              { num: 1, label: 'Pet', icon: PawPrint },
              { num: 2, label: 'Service', icon: Stethoscope },
              { num: 3, label: 'Schedule', icon: Calendar },
              { num: 4, label: 'Contact', icon: User },
            ].map((s, i) => (
              <div key={s.num} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                    step >= s.num ? 'bg-brand-500 text-white' : 'bg-ink-100 text-ink-400 dark:bg-ink-800 dark:text-ink-500'
                  }`}>
                    {step > s.num ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                  </div>
                  <span className={`text-xs font-medium ${step >= s.num ? 'text-brand-600 dark:text-brand-400' : 'text-ink-400'}`}>
                    {s.label}
                  </span>
                </div>
                {i < 3 && (
                  <div className={`mx-2 h-0.5 flex-1 rounded transition-all sm:mx-4 ${step > s.num ? 'bg-brand-500' : 'bg-ink-200 dark:bg-ink-700'}`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card dark:border-ink-800 dark:bg-ink-900 sm:p-8" noValidate>
            {/* Step 1: Pet info */}
            {step === 1 && (
              <div className="space-y-4 animate-slide-up">
                <h2 className="text-xl font-bold text-ink-900 dark:text-white">Tell us about your pet</h2>

                {pets.length > 0 && (
                  <div className="mb-4">
                    <p className="label-field">Select an existing pet</p>
                    <div className="flex flex-wrap gap-3">
                      {pets.map((pet) => (
                        <button
                          key={pet.id}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, petName: pet.name, petType: pet.species });
                            setErrors({ ...errors, petName: '', petType: '' });
                          }}
                          className={`flex items-center gap-2 rounded-xl border-2 p-3 transition-all ${
                            formData.petName === pet.name
                              ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/30'
                              : 'border-ink-200 hover:border-brand-300 dark:border-ink-700'
                          }`}
                        >
                          <img src={pet.image} alt={pet.name} className="h-10 w-10 rounded-lg object-cover" />
                          <div className="text-left">
                            <p className="text-sm font-bold text-ink-900 dark:text-white">{pet.name}</p>
                            <p className="text-xs text-ink-500">{pet.species}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="pet-name" className="label-field">Pet Name *</label>
                    <input
                      id="pet-name"
                      type="text"
                      value={formData.petName}
                      onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                      className={`input-field ${errors.petName ? 'border-danger-500' : ''}`}
                      placeholder="e.g. Max"
                      required
                    />
                    {errors.petName && <p className="mt-1 text-xs text-danger-600">{errors.petName}</p>}
                  </div>
                  <div>
                    <label htmlFor="pet-type" className="label-field">Pet Type *</label>
                    <select
                      id="pet-type"
                      value={formData.petType}
                      onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                      className={`input-field ${errors.petType ? 'border-danger-500' : ''}`}
                      required
                    >
                      <option value="">Select type...</option>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Rabbit">Rabbit</option>
                      <option value="Bird">Bird</option>
                      <option value="Reptile">Reptile</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.petType && <p className="mt-1 text-xs text-danger-600">{errors.petType}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Service */}
            {step === 2 && (
              <div className="space-y-4 animate-slide-up">
                <h2 className="text-xl font-bold text-ink-900 dark:text-white">Choose a service</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, service: service.id });
                        setErrors({ ...errors, service: '' });
                      }}
                      className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                        formData.service === service.id
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/30'
                          : 'border-ink-200 hover:border-brand-300 dark:border-ink-700 dark:hover:border-brand-700'
                      }`}
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        formData.service === service.id ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400'
                      }`}>
                        <Stethoscope className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-ink-900 dark:text-white">{service.name}</p>
                        <p className="text-xs text-ink-500 dark:text-ink-400">{service.price}</p>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.service && <p className="text-xs text-danger-600">{errors.service}</p>}
              </div>
            )}

            {/* Step 3: Schedule */}
            {step === 3 && (
              <div className="space-y-4 animate-slide-up">
                <h2 className="text-xl font-bold text-ink-900 dark:text-white">Pick a vet and time</h2>
                <div>
                  <label htmlFor="vet-select" className="label-field">Veterinarian *</label>
                  <select
                    id="vet-select"
                    value={formData.vet}
                    onChange={(e) => setFormData({ ...formData, vet: e.target.value })}
                    className={`input-field ${errors.vet ? 'border-danger-500' : ''}`}
                    required
                  >
                    <option value="">Any available vet</option>
                    {vets.filter((v) => v.available).map((vet) => (
                      <option key={vet.id} value={vet.id}>{vet.name} — {vet.title}</option>
                    ))}
                  </select>
                  {errors.vet && <p className="mt-1 text-xs text-danger-600">{errors.vet}</p>}
                </div>

                <div>
                  <label htmlFor="date-pick" className="label-field">Date *</label>
                  <input
                    id="date-pick"
                    type="date"
                    min={today}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={`input-field ${errors.date ? 'border-danger-500' : ''}`}
                    required
                  />
                  {errors.date && <p className="mt-1 text-xs text-danger-600">{errors.date}</p>}
                </div>

                <div>
                  <p className="label-field">Time Slot *</p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, time: slot });
                          setErrors({ ...errors, time: '' });
                        }}
                        className={`flex items-center justify-center gap-1 rounded-lg border-2 py-2.5 text-sm font-medium transition-all ${
                          formData.time === slot
                            ? 'border-brand-500 bg-brand-500 text-white'
                            : 'border-ink-200 text-ink-600 hover:border-brand-300 dark:border-ink-700 dark:text-ink-300'
                        }`}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        {slot}
                      </button>
                    ))}
                  </div>
                  {errors.time && <p className="mt-1 text-xs text-danger-600">{errors.time}</p>}
                </div>
              </div>
            )}

            {/* Step 4: Contact */}
            {step === 4 && (
              <div className="space-y-4 animate-slide-up">
                <h2 className="text-xl font-bold text-ink-900 dark:text-white">Your contact details</h2>
                <div>
                  <label htmlFor="owner-name" className="label-field">Full Name *</label>
                  <input
                    id="owner-name"
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className={`input-field ${errors.ownerName ? 'border-danger-500' : ''}`}
                    placeholder="Jane Smith"
                    required
                  />
                  {errors.ownerName && <p className="mt-1 text-xs text-danger-600">{errors.ownerName}</p>}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="owner-email" className="label-field">Email *</label>
                    <input
                      id="owner-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`input-field ${errors.email ? 'border-danger-500' : ''}`}
                      placeholder="jane@example.com"
                      required
                    />
                    {errors.email && <p className="mt-1 text-xs text-danger-600">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="owner-phone" className="label-field">Phone *</label>
                    <input
                      id="owner-phone"
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
                <div>
                  <label htmlFor="notes" className="label-field">Additional Notes (optional)</label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="input-field resize-none"
                    placeholder="Any symptoms, concerns, or special requirements..."
                  />
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 flex items-center justify-between gap-4">
              {step > 1 ? (
                <button type="button" onClick={handleBack} className="btn-ghost">
                  Back
                </button>
              ) : <div />}

              {step < 4 ? (
                <button type="button" onClick={handleNext} className="btn-primary">
                  Continue <ArrowRight className="h-5 w-5" />
                </button>
              ) : (
                <button type="submit" className="btn-primary">
                  <Check className="h-5 w-5" /> Confirm Booking
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
