import {
  PawPrint,
  Stethoscope,
  Scissors,
  Heart,
  Microscope,
  Siren,
  Syringe,
  Calendar,
  ArrowRight,
  Star,
  Shield,
  Clock,
  Award,
  Phone,
  Quote,
} from 'lucide-react';
import { useApp } from '@/context';
import { services, vets, testimonials } from '@/data';
import type { PageId } from '@/data';

const iconMap: Record<string, typeof Stethoscope> = {
  Stethoscope,
  Scissors,
  Heart,
  Microscope,
  Siren,
  Syringe,
};

export default function HomePage() {
  const { navigate, openAuthModal, user } = useApp();

  const scrollToAppointment = () => navigate('appointment');

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="container-wide px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-slide-up">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">
                <PawPrint className="h-4 w-4" />
                Compassionate care since 2015
              </div>
              <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-ink-900 dark:text-white sm:text-5xl lg:text-6xl">
                Your pet deserves{' '}
                <span className="text-brand-500">expert care</span>, every step of the way
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-600 dark:text-ink-300">
                From routine check-ups to emergency surgery, our team of specialists provides modern, compassionate veterinary care in a calm, welcoming environment.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button onClick={scrollToAppointment} className="btn-primary">
                  <Calendar className="h-5 w-5" /> Book Appointment
                </button>
                <button onClick={() => navigate('services')} className="btn-secondary">
                  Explore Services <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <div className="flex -space-x-3">
                  {vets.slice(0, 4).map((v) => (
                    <img
                      key={v.id}
                      src={v.image}
                      alt={v.name}
                      className="h-12 w-12 rounded-full border-2 border-white object-cover dark:border-ink-900"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent-400 text-accent-400" />
                    ))}
                  </div>
                  <p className="text-sm text-ink-600 dark:text-ink-400">
                    <span className="font-bold text-ink-900 dark:text-white">4.9/5</span> from 1,200+ happy pet owners
                  </p>
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="relative rounded-3xl shadow-card-hover overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/6235231/pexels-photo-6235231.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Veterinarian examining a dog with a stethoscope in a modern clinic"
                  className="h-[420px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent" />
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-4 rounded-2xl bg-white p-4 shadow-card-hover dark:bg-ink-900 sm:-left-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-100 dark:bg-success-700/30">
                    <Shield className="h-6 w-6 text-success-600 dark:text-success-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-ink-900 dark:text-white">12k+</p>
                    <p className="text-xs text-ink-500 dark:text-ink-400">Pets cared for</p>
                  </div>
                </div>
              </div>

              {/* Floating rating card */}
              <div className="absolute -top-4 -right-4 rounded-2xl bg-white p-4 shadow-card-hover dark:bg-ink-900 sm:-right-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 dark:bg-accent-900/30">
                    <Award className="h-6 w-6 text-accent-600 dark:text-accent-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-ink-900 dark:text-white">24/7</p>
                    <p className="text-xs text-ink-500 dark:text-ink-400">Emergency support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-ink-100 bg-white dark:border-ink-800 dark:bg-ink-900">
        <div className="container-wide px-4 py-12 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {[
              { icon: PawPrint, value: '12,000+', label: 'Pets Treated' },
              { icon: Stethoscope, value: '25+', label: 'Expert Vets' },
              { icon: Clock, value: '24/7', label: 'Emergency Care' },
              { icon: Star, value: '4.9/5', label: 'Client Rating' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400">
                  <stat.icon className="h-7 w-7" />
                </div>
                <dd className="text-3xl font-extrabold text-ink-900 dark:text-white">{stat.value}</dd>
                <dt className="mt-1 text-sm text-ink-500 dark:text-ink-400">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <span className="badge bg-brand-100 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">Our Services</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
              Complete care under one roof
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-ink-600 dark:text-ink-300">
              From preventive wellness to advanced surgery, we offer a full range of veterinary services tailored to your pet's needs.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Stethoscope;
              return (
                <article
                  key={service.id}
                  className="card card-hover group cursor-pointer"
                  onClick={() => navigate('services')}
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-all group-hover:bg-brand-500 group-hover:text-white dark:bg-brand-950/40 dark:text-brand-400">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 dark:text-white">{service.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-400">{service.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">{service.price}</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-ink-400 transition-all group-hover:text-brand-500">
                      Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-ink-50 py-16 dark:bg-ink-950">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/7468978/pexels-photo-7468978.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Veterinarian performing a checkup on a dog in a modern clinic"
                className="rounded-3xl shadow-card-hover"
              />
              <div className="absolute -bottom-6 right-6 rounded-2xl bg-brand-500 p-6 text-white shadow-glow">
                <p className="text-4xl font-extrabold">98%</p>
                <p className="text-sm opacity-90">Client satisfaction rate</p>
              </div>
            </div>

            <div>
              <span className="badge bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300">Why CarePet</span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
                We treat your pets like family
              </h2>
              <p className="mt-4 text-ink-600 dark:text-ink-300">
                Our commitment goes beyond medical expertise. We create a stress-free experience for both you and your pet, with transparent pricing and genuine compassion.
              </p>

              <ul className="mt-8 space-y-5">
                {[
                  { icon: Award, title: 'Board-Certified Specialists', desc: 'Our veterinarians are certified in multiple specialties with years of experience.' },
                  { icon: Clock, title: '24/7 Emergency Availability', desc: 'Day or night, our emergency team is ready when your pet needs urgent care.' },
                  { icon: Shield, title: 'Transparent Pricing', desc: 'No surprise bills. Clear pricing and flexible membership plans for every budget.' },
                  { icon: Heart, title: 'Fear-Free Environment', desc: 'Calming spaces and gentle handling techniques to reduce pet anxiety.' },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-card dark:bg-ink-800 dark:text-brand-400">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-ink-900 dark:text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-ink-600 dark:text-ink-400">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <span className="badge bg-brand-100 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">Testimonials</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
              Loved by pets and their humans
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <article key={t.id} className="card card-hover">
                <Quote className="h-8 w-8 text-brand-300 dark:text-brand-700" />
                <p className="mt-4 text-sm leading-relaxed text-ink-700 dark:text-ink-300">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-ink-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-ink-500 dark:text-ink-400">{t.pet}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent-400 text-accent-400" />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl gradient-brand p-8 text-center text-white shadow-glow sm:p-16">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10" />
            <div className="relative">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Ready to give your pet the best care?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">
                Book an appointment today or explore our affordable care plans. Your pet's health is our priority.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  onClick={scrollToAppointment}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-brand-700 shadow-sm transition-all hover:bg-brand-50 active:scale-95"
                >
                  <Calendar className="h-5 w-5" /> Book Now
                </button>
                {!user && (
                  <button
                    onClick={openAuthModal}
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
                  >
                    Sign Up Free
                  </button>
                )}
                <button
                  onClick={() => navigate('emergency')}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
                >
                  <Phone className="h-5 w-5" /> Emergency
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
