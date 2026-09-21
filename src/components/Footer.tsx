import { PawPrint, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useApp } from '@/context';
import type { PageId } from '@/data';

export default function Footer() {
  const { navigate } = useApp();

  const links: { label: string; page: PageId }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Veterinarians', page: 'veterinarians' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'Book Appointment', page: 'appointment' },
    { label: 'My Pets', page: 'my-pets' },
    { label: 'Emergency Help', page: 'emergency' },
  ];

  return (
    <footer className="border-t border-ink-100 bg-ink-50 dark:border-ink-800 dark:bg-ink-950">
      <div className="container-wide px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-brand">
                <PawPrint className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-extrabold text-ink-900 dark:text-white">
                Care<span className="text-brand-500">Pet</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              Compassionate, modern veterinary care for the pets you love. Available 24/7 for emergencies and routine care alike.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-ink-500 shadow-sm transition-all hover:bg-brand-500 hover:text-white dark:bg-ink-800 dark:text-ink-400"
                  aria-label="Social media link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-sm text-ink-500 transition-colors hover:text-brand-600 dark:text-ink-400 dark:hover:text-brand-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink-900 dark:text-white">Contact</h3>
            <ul className="space-y-3 text-sm text-ink-500 dark:text-ink-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <span>128 Greenfield Avenue<br />Portland, OR 97201</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brand-500" />
                <a href="tel:+15035550100" className="transition-colors hover:text-brand-600 dark:hover:text-brand-400">
                  (503) 555-0100
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brand-500" />
                <a href="mailto:hello@carepet.com" className="transition-colors hover:text-brand-600 dark:hover:text-brand-400">
                  hello@carepet.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink-900 dark:text-white">Hours</h3>
            <ul className="space-y-2 text-sm text-ink-500 dark:text-ink-400">
              <li className="flex justify-between"><span>Mon – Fri</span> <span className="font-medium text-ink-700 dark:text-ink-200">8AM – 8PM</span></li>
              <li className="flex justify-between"><span>Saturday</span> <span className="font-medium text-ink-700 dark:text-ink-200">9AM – 6PM</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span className="font-medium text-ink-700 dark:text-ink-200">10AM – 4PM</span></li>
              <li className="mt-3 flex items-center gap-2 rounded-lg bg-danger-50 px-3 py-2 dark:bg-danger-950/30">
                <span className="flex h-2 w-2 animate-pulse rounded-full bg-danger-500" />
                <span className="text-xs font-semibold text-danger-700 dark:text-danger-400">Emergency: 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink-200 pt-6 dark:border-ink-800 sm:flex-row">
          <p className="text-xs text-ink-400 dark:text-ink-500">
            © 2026 CarePet Veterinary Clinic. All rights reserved.
          </p>
          <p className="text-xs text-ink-400 dark:text-ink-500">
            This is an educational demo project. Not a real medical service.
          </p>
        </div>
      </div>
    </footer>
  );
}
