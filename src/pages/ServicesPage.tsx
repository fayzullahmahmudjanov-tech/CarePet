import {
  Stethoscope,
  Scissors,
  Heart,
  Microscope,
  Siren,
  Syringe,
  Check,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import { useApp } from '@/context';
import { services } from '@/data';

const iconMap: Record<string, typeof Stethoscope> = {
  Stethoscope,
  Scissors,
  Heart,
  Microscope,
  Siren,
  Syringe,
};

export default function ServicesPage() {
  const { navigate } = useApp();

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="gradient-hero">
        <div className="container-wide px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <span className="badge bg-brand-100 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">Our Services</span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-5xl">
            Veterinary services for every need
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
            Comprehensive medical care delivered with compassion and expertise. Every service is backed by modern equipment and years of experience.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service, idx) => {
              const Icon = iconMap[service.icon] || Stethoscope;
              const reversed = idx % 2 === 1;
              return (
                <article
                  key={service.id}
                  className="card overflow-hidden !p-0 card-hover"
                >
                  <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                    <div className="relative h-56 lg:h-auto lg:w-2/5">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent lg:bg-gradient-to-r" />
                      <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/95 shadow-card dark:bg-ink-900/95">
                        <Icon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                      </div>
                    </div>
                    <div className="p-6 lg:flex-1 lg:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="text-xl font-bold text-ink-900 dark:text-white">{service.name}</h2>
                        <span className="badge bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 shrink-0">{service.price}</span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-400">{service.description}</p>
                      <ul className="mt-4 space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-ink-700 dark:text-ink-300">
                            <Check className="h-4 w-4 shrink-0 text-brand-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => navigate('appointment')}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-all hover:gap-2.5 dark:text-brand-400"
                      >
                        Book this service <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="bg-ink-50 py-16 dark:bg-ink-950">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 dark:text-white">How it works</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-600 dark:text-ink-300">Getting started with CarePet is simple and stress-free.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { step: '01', title: 'Book Online', desc: 'Choose a service, vet, and time that works for you in under 2 minutes.' },
              { step: '02', title: 'Visit the Clinic', desc: 'Meet our friendly team in a calm, pet-friendly environment designed for comfort.' },
              { step: '03', title: 'Follow-Up Care', desc: 'Receive personalised care plans, reminders, and ongoing support through your portal.' },
            ].map((item) => (
              <div key={item.step} className="relative rounded-2xl bg-white p-8 text-center shadow-card dark:bg-ink-900">
                <span className="text-5xl font-extrabold text-brand-200 dark:text-brand-900">{item.step}</span>
                <h3 className="mt-2 text-lg font-bold text-ink-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button onClick={() => navigate('appointment')} className="btn-primary">
              <Calendar className="h-5 w-5" /> Book Your Appointment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
