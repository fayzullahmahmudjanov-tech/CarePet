import { useState, useMemo } from 'react';
import {
  Star,
  X,
  GraduationCap,
  Languages,
  Calendar,
  Search,
  Stethoscope,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useApp } from '@/context';
import { vets } from '@/data';
import type { Vet } from '@/data';

const allSpecialties = ['Internal Medicine', 'Cardiology', 'Surgery', 'Orthopaedics', 'Dentistry', 'Preventive Care', 'Emergency', 'Critical Care', 'Exotic Pets', 'Avian Medicine', 'Dermatology', 'Allergology'];

export default function VeterinariansPage() {
  const { navigate, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available'>('all');
  const [selectedVet, setSelectedVet] = useState<Vet | null>(null);

  const filtered = useMemo(() => {
    return vets.filter((v) => {
      const matchesSearch =
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      const matchesSpecialty = selectedSpecialty === 'All' || v.specialties.includes(selectedSpecialty);
      const matchesAvailability = availabilityFilter === 'all' || v.available;
      return matchesSearch && matchesSpecialty && matchesAvailability;
    });
  }, [search, selectedSpecialty, availabilityFilter]);

  const handleBookVet = (vet: Vet) => {
    setSelectedVet(null);
    showToast(`Starting booking with ${vet.name}`, 'info');
    navigate('appointment');
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="gradient-hero">
        <div className="container-wide px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <span className="badge bg-brand-100 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">Our Team</span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-5xl">
            Meet our veterinarians
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
            Board-certified specialists dedicated to your pet's health and wellbeing. Find the right vet for your companion.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="section-padding">
        <div className="container-wide">
          {/* Filter bar */}
          <div className="mb-8 space-y-4 rounded-2xl border border-ink-100 bg-white p-4 shadow-card dark:border-ink-800 dark:bg-ink-900">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or specialty..."
                className="input-field pl-11"
                aria-label="Search veterinarians"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {['All', ...allSpecialties].map((spec) => (
                  <button
                    key={spec}
                    onClick={() => setSelectedSpecialty(spec)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                      selectedSpecialty === spec
                        ? 'bg-brand-500 text-white shadow-sm'
                        : 'bg-ink-100 text-ink-600 hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => setAvailabilityFilter('all')}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                    availabilityFilter === 'all' ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-900' : 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setAvailabilityFilter('available')}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                    availabilityFilter === 'available' ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-900' : 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300'
                  }`}
                >
                  Available Now
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="mb-6 text-sm text-ink-500 dark:text-ink-400">
            Showing <span className="font-semibold text-ink-900 dark:text-white">{filtered.length}</span> veterinarian{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Vet grid */}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink-200 p-16 text-center dark:border-ink-700">
              <Search className="mx-auto h-12 w-12 text-ink-300 dark:text-ink-600" />
              <p className="mt-4 text-lg font-semibold text-ink-900 dark:text-white">No veterinarians found</p>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((vet) => (
                <article key={vet.id} className="card card-hover group">
                  <div className="relative mb-4">
                    <img
                      src={vet.image}
                      alt={vet.name}
                      className="h-48 w-full rounded-xl object-cover"
                    />
                    <div className="absolute right-3 top-3">
                      {vet.available ? (
                        <span className="badge bg-success-500 text-white">
                          <span className="h-1.5 w-1.5 rounded-full bg-white" /> Available
                        </span>
                      ) : (
                        <span className="badge bg-ink-500 text-white">
                          <span className="h-1.5 w-1.5 rounded-full bg-white" /> On Leave
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 dark:text-white">{vet.name}</h3>
                  <p className="text-sm text-brand-600 dark:text-brand-400">{vet.title}</p>
                  <div className="mt-2 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent-400 text-accent-400" />
                    <span className="text-sm font-semibold text-ink-900 dark:text-white">{vet.rating}</span>
                    <span className="text-sm text-ink-400">({vet.reviews} reviews)</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {vet.specialties.map((s) => (
                      <span key={s} className="badge bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">{vet.experience} years of experience</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setSelectedVet(vet)}
                      className="btn-secondary flex-1 !py-2 text-sm"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleBookVet(vet)}
                      disabled={!vet.available}
                      className="btn-primary flex-1 !py-2 text-sm disabled:cursor-not-allowed"
                    >
                      <Calendar className="h-4 w-4" /> Book
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Profile Modal */}
      {selectedVet && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedVet(null)}
          />
          <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-card-hover animate-scale-in dark:bg-ink-900 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedVet(null)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-ink-400 shadow-sm transition-all hover:bg-white dark:bg-ink-800 dark:text-ink-300"
              aria-label="Close profile"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header section */}
            <div className="relative h-32 gradient-brand rounded-t-2xl">
              <div className="absolute -bottom-12 left-8">
                <img
                  src={selectedVet.image}
                  alt={selectedVet.name}
                  className="h-24 w-24 rounded-2xl border-4 border-white object-cover dark:border-ink-900"
                />
              </div>
            </div>

            <div className="px-8 pb-8 pt-16">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-ink-900 dark:text-white">{selectedVet.name}</h2>
                  <p className="text-brand-600 dark:text-brand-400">{selectedVet.title}</p>
                </div>
                <div className="flex items-center gap-1 rounded-lg bg-accent-50 px-3 py-1.5 dark:bg-accent-900/20">
                  <Star className="h-4 w-4 fill-accent-400 text-accent-400" />
                  <span className="font-bold text-ink-900 dark:text-white">{selectedVet.rating}</span>
                  <span className="text-xs text-ink-400">({selectedVet.reviews})</span>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-2">
                {selectedVet.available ? (
                  <span className="badge bg-success-100 text-success-700 dark:bg-success-700/20 dark:text-success-400">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Available for booking
                  </span>
                ) : (
                  <span className="badge bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-400">
                    <XCircle className="h-3.5 w-3.5" /> Currently on leave
                  </span>
                )}
              </div>

              <p className="mt-6 text-sm leading-relaxed text-ink-700 dark:text-ink-300">{selectedVet.bio}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-ink-50 p-4 dark:bg-ink-800">
                  <div className="flex items-center gap-2 text-ink-500 dark:text-ink-400">
                    <GraduationCap className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Education</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-ink-900 dark:text-white">{selectedVet.education}</p>
                </div>
                <div className="rounded-xl bg-ink-50 p-4 dark:bg-ink-800">
                  <div className="flex items-center gap-2 text-ink-500 dark:text-ink-400">
                    <Stethoscope className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Experience</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-ink-900 dark:text-white">{selectedVet.experience} years</p>
                </div>
                <div className="rounded-xl bg-ink-50 p-4 dark:bg-ink-800 sm:col-span-2">
                  <div className="flex items-center gap-2 text-ink-500 dark:text-ink-400">
                    <Languages className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Languages</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedVet.languages.map((lang) => (
                      <span key={lang} className="badge bg-white text-ink-700 dark:bg-ink-700 dark:text-ink-200">{lang}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedVet.specialties.map((s) => (
                    <span key={s} className="badge bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">{s}</span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleBookVet(selectedVet)}
                disabled={!selectedVet.available}
                className="btn-primary mt-8 w-full disabled:cursor-not-allowed"
              >
                <Calendar className="h-5 w-5" /> Book Appointment with {selectedVet.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
