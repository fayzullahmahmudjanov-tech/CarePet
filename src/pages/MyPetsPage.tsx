import { useState } from 'react';
import {
  Plus,
  X,
  PawPrint,
  Trash2,
  Calendar,
  Syringe,
  Weight,
  Cake,
  Stethoscope,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '@/context';
import { petImageOptions } from '@/data';
import type { Pet } from '@/data';

export default function MyPetsPage() {
  const { pets, addPet, removePet, showToast, openAuthModal, user } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    species: 'Dog',
    breed: '',
    age: '',
    weight: '',
    image: petImageOptions[0].value,
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = 'Pet name is required';
    if (!formData.breed.trim()) e.breed = 'Breed is required';
    if (!formData.age.trim()) e.age = 'Age is required';
    if (!formData.weight.trim()) e.weight = 'Weight is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newPet: Pet = {
      id: `p-${Date.now()}`,
      name: formData.name,
      species: formData.species,
      breed: formData.breed,
      age: formData.age,
      weight: formData.weight,
      image: formData.image,
      vaccinations: [
        { name: 'Rabies', date: new Date().toISOString().split('T')[0], status: 'up-to-date' },
        { name: 'Initial Checkup', date: new Date().toISOString().split('T')[0], status: 'up-to-date' },
      ],
      lastVisit: new Date().toISOString().split('T')[0],
      notes: formData.notes || 'New patient. Baseline health assessment recommended.',
    };

    addPet(newPet);
    showToast(`${formData.name} has been added to your pets!`, 'success');
    setShowForm(false);
    setFormData({ name: '', species: 'Dog', breed: '', age: '', weight: '', image: petImageOptions[0].value, notes: '' });
    setErrors({});
  };

  const handleDelete = (id: string, name: string) => {
    removePet(id);
    setSelectedPet(null);
    showToast(`${name} has been removed from your pets.`, 'info');
  };

  if (!user) {
    return (
      <div className="animate-fade-in">
        <section className="section-padding">
          <div className="container-wide max-w-md text-center">
            <div className="rounded-3xl bg-white p-8 shadow-card dark:bg-ink-900">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-950/40">
                <PawPrint className="h-8 w-8 text-brand-500" />
              </div>
              <h1 className="text-2xl font-bold text-ink-900 dark:text-white">Sign in to manage your pets</h1>
              <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">
                Create an account or sign in to add pets, track vaccinations, and view their health records.
              </p>
              <button onClick={openAuthModal} className="btn-primary mt-6 w-full">
                Sign In / Sign Up
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
        <div className="container-wide px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="badge bg-brand-100 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">My Pets</span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-5xl">
                Your furry family
              </h1>
              <p className="mt-4 text-lg text-ink-600 dark:text-ink-300">
                Manage your pets' profiles, vaccination records, and health notes.
              </p>
            </div>
            <button onClick={() => setShowForm(true)} className="btn-primary">
              <Plus className="h-5 w-5" /> Add Pet
            </button>
          </div>
        </div>
      </section>

      {/* Pet cards */}
      <section className="section-padding">
        <div className="container-wide">
          {pets.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink-200 p-16 text-center dark:border-ink-700">
              <PawPrint className="mx-auto h-12 w-12 text-ink-300 dark:text-ink-600" />
              <p className="mt-4 text-lg font-semibold text-ink-900 dark:text-white">No pets yet</p>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Add your first pet to get started.</p>
              <button onClick={() => setShowForm(true)} className="btn-primary mt-6">
                <Plus className="h-5 w-5" /> Add Your First Pet
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pets.map((pet) => (
                <article key={pet.id} className="card card-hover group">
                  <div className="relative mb-4">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="h-44 w-full rounded-xl object-cover"
                    />
                    <span className="absolute left-3 top-3 badge bg-white/90 text-ink-700 dark:bg-ink-900/90 dark:text-white">
                      {pet.species}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-ink-900 dark:text-white">{pet.name}</h3>
                  <p className="text-sm text-ink-500 dark:text-ink-400">{pet.breed}</p>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 rounded-lg bg-ink-50 px-3 py-2 dark:bg-ink-800">
                      <Cake className="h-4 w-4 text-brand-500" />
                      <span className="text-xs font-medium text-ink-700 dark:text-ink-300">{pet.age}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-ink-50 px-3 py-2 dark:bg-ink-800">
                      <Weight className="h-4 w-4 text-brand-500" />
                      <span className="text-xs font-medium text-ink-700 dark:text-ink-300">{pet.weight}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs text-ink-500 dark:text-ink-400">
                    <Syringe className="h-3.5 w-3.5" />
                    {pet.vaccinations.filter((v) => v.status === 'up-to-date').length} of {pet.vaccinations.length} vaccines up to date
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setSelectedPet(pet)}
                      className="btn-secondary flex-1 !py-2 text-sm"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleDelete(pet.id, pet.name)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink-200 text-ink-400 transition-all hover:border-danger-500 hover:text-danger-500 dark:border-ink-700"
                      aria-label={`Remove ${pet.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Add Pet Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-card-hover animate-scale-in dark:bg-ink-900 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowForm(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-ink-400 transition-all hover:bg-ink-100 dark:hover:bg-ink-800"
              aria-label="Close form"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-2xl font-bold text-ink-900 dark:text-white">Add a new pet</h2>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Fill in your pet's details to create their profile.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              {/* Image picker */}
              <div>
                <p className="label-field">Choose a photo</p>
                <div className="flex flex-wrap gap-2">
                  {petImageOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: opt.value })}
                      className={`overflow-hidden rounded-xl border-2 transition-all ${
                        formData.image === opt.value ? 'border-brand-500 ring-2 ring-brand-500/20' : 'border-ink-200 hover:border-brand-300 dark:border-ink-700'
                      }`}
                    >
                      <img src={opt.value} alt={opt.label} className="h-14 w-14 object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="pet-form-name" className="label-field">Pet Name *</label>
                  <input
                    id="pet-form-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`input-field ${errors.name ? 'border-danger-500' : ''}`}
                    placeholder="e.g. Buddy"
                    required
                  />
                  {errors.name && <p className="mt-1 text-xs text-danger-600">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="pet-form-species" className="label-field">Species *</label>
                  <select
                    id="pet-form-species"
                    value={formData.species}
                    onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                    className="input-field"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Bird">Bird</option>
                    <option value="Reptile">Reptile</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="pet-form-breed" className="label-field">Breed *</label>
                  <input
                    id="pet-form-breed"
                    type="text"
                    value={formData.breed}
                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                    className={`input-field ${errors.breed ? 'border-danger-500' : ''}`}
                    placeholder="e.g. Golden Retriever"
                    required
                  />
                  {errors.breed && <p className="mt-1 text-xs text-danger-600">{errors.breed}</p>}
                </div>
                <div>
                  <label htmlFor="pet-form-age" className="label-field">Age *</label>
                  <input
                    id="pet-form-age"
                    type="text"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className={`input-field ${errors.age ? 'border-danger-500' : ''}`}
                    placeholder="e.g. 3 years"
                    required
                  />
                  {errors.age && <p className="mt-1 text-xs text-danger-600">{errors.age}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="pet-form-weight" className="label-field">Weight *</label>
                <input
                  id="pet-form-weight"
                  type="text"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className={`input-field ${errors.weight ? 'border-danger-500' : ''}`}
                  placeholder="e.g. 25 kg"
                  required
                />
                {errors.weight && <p className="mt-1 text-xs text-danger-600">{errors.weight}</p>}
              </div>

              <div>
                <label htmlFor="pet-form-notes" className="label-field">Notes (optional)</label>
                <textarea
                  id="pet-form-notes"
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="input-field resize-none"
                  placeholder="Any health concerns or behavioural notes..."
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                <Plus className="h-5 w-5" /> Add Pet
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Pet Profile Modal */}
      {selectedPet && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedPet(null)} />
          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-card-hover animate-scale-in dark:bg-ink-900 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPet(null)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-ink-400 shadow-sm transition-all hover:bg-white dark:bg-ink-800 dark:text-ink-300"
              aria-label="Close profile"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-36">
              <img src={selectedPet.image} alt={selectedPet.name} className="h-full w-full rounded-t-2xl object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent rounded-t-2xl" />
              <div className="absolute bottom-4 left-6">
                <h2 className="text-2xl font-bold text-white">{selectedPet.name}</h2>
                <p className="text-sm text-white/80">{selectedPet.breed}</p>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Cake, label: 'Age', value: selectedPet.age },
                  { icon: Weight, label: 'Weight', value: selectedPet.weight },
                  { icon: Calendar, label: 'Last Visit', value: selectedPet.lastVisit },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-ink-50 p-3 text-center dark:bg-ink-800">
                    <item.icon className="mx-auto h-5 w-5 text-brand-500" />
                    <p className="mt-1 text-xs text-ink-400">{item.label}</p>
                    <p className="text-sm font-semibold text-ink-900 dark:text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              <h3 className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                <Syringe className="h-4 w-4" /> Vaccination Record
              </h3>
              <ul className="mt-3 space-y-2">
                {selectedPet.vaccinations.map((vacc) => (
                  <li key={vacc.name} className="flex items-center justify-between rounded-xl border border-ink-100 p-3 dark:border-ink-800">
                    <div>
                      <p className="text-sm font-semibold text-ink-900 dark:text-white">{vacc.name}</p>
                      <p className="text-xs text-ink-400">{vacc.date}</p>
                    </div>
                    <span className={`badge ${
                      vacc.status === 'up-to-date' ? 'bg-success-100 text-success-700 dark:bg-success-700/20 dark:text-success-400' :
                      vacc.status === 'due' ? 'bg-warning-100 text-warning-600 dark:bg-warning-500/20 dark:text-warning-500' :
                      'bg-danger-100 text-danger-600 dark:bg-danger-500/20 dark:text-danger-400'
                    }`}>
                      {vacc.status === 'up-to-date' ? 'Up to date' : vacc.status === 'due' ? 'Due soon' : 'Overdue'}
                    </span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                <Stethoscope className="h-4 w-4" /> Health Notes
              </h3>
              <p className="mt-2 rounded-xl bg-ink-50 p-4 text-sm leading-relaxed text-ink-700 dark:bg-ink-800 dark:text-ink-300">
                {selectedPet.notes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
