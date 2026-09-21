import { useState, useRef, useEffect } from 'react';
import {
  PawPrint,
  Menu,
  X,
  Moon,
  Sun,
  Bell,
  Check,
  Calendar,
  Syringe,
  Info,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { useApp } from '@/context';
import type { PageId } from '@/data';

const navItems: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'veterinarians', label: 'Veterinarians' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'appointment', label: 'Appointment' },
  { id: 'my-pets', label: 'My Pets' },
  { id: 'emergency', label: 'Emergency' },
];

export default function Navbar() {
  const {
    currentPage,
    navigate,
    darkMode,
    toggleDarkMode,
    user,
    logout,
    openAuthModal,
    notifications,
    unreadCount,
    markNotificationRead,
    markAllRead,
  } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleNav = (page: PageId) => {
    navigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/90 backdrop-blur-lg transition-colors dark:border-ink-800 dark:bg-ink-950/90">
      <nav className="container-wide flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-brand">
            <PawPrint className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-ink-900 dark:text-white">
            Care<span className="text-brand-500">Pet</span>
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNav(item.id)}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-brand-500" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-600 transition-all hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen((o) => !o)}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-ink-600 transition-all hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger-500 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 origin-top-right rounded-2xl border border-ink-100 bg-white p-2 shadow-card-hover animate-scale-in dark:border-ink-800 dark:bg-ink-900">
                <div className="flex items-center justify-between border-b border-ink-100 px-3 py-2 dark:border-ink-800">
                  <h3 className="font-bold text-ink-900 dark:text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <ul className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <li key={n.id}>
                      <button
                        onClick={() => markNotificationRead(n.id)}
                        className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition-all hover:bg-ink-50 dark:hover:bg-ink-800 ${
                          !n.read ? 'bg-brand-50/50 dark:bg-brand-950/30' : ''
                        }`}
                      >
                        <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          n.type === 'appointment' ? 'bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300' :
                          n.type === 'vaccination' ? 'bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300' :
                          'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300'
                        }`}>
                          {n.type === 'appointment' ? <Calendar className="h-4 w-4" /> :
                           n.type === 'vaccination' ? <Syringe className="h-4 w-4" /> :
                           <Info className="h-4 w-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-ink-900 dark:text-white">{n.title}</p>
                          <p className="text-xs text-ink-500 dark:text-ink-400 line-clamp-2">{n.message}</p>
                          <p className="mt-1 text-[11px] text-ink-400 dark:text-ink-500">{n.time}</p>
                        </div>
                        {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
                        {n.read && <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink-300 dark:text-ink-600" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* User menu / Login */}
          {user ? (
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-all hover:bg-ink-100 dark:hover:bg-ink-800"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-brand">
                  <span className="text-sm font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="hidden text-sm font-semibold text-ink-700 dark:text-ink-200 sm:block">
                  {user.name.split(' ')[0]}
                </span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-56 rounded-2xl border border-ink-100 bg-white p-2 shadow-card-hover animate-scale-in dark:border-ink-800 dark:bg-ink-900">
                  <div className="border-b border-ink-100 px-3 py-2 dark:border-ink-800">
                    <p className="text-sm font-semibold text-ink-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-ink-500 dark:text-ink-400">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { handleNav('my-pets'); setUserMenuOpen(false); }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-700 transition-all hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
                  >
                    <UserIcon className="h-4 w-4" /> My Pets
                  </button>
                  <button
                    onClick={() => { logout(); setUserMenuOpen(false); }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-danger-600 transition-all hover:bg-danger-50 dark:hover:bg-danger-950/30"
                  >
                    <LogOut className="h-4 w-4" /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="hidden rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-600 hover:shadow-glow active:scale-95 sm:block"
            >
              Sign In
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-600 transition-all hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-ink-100 bg-white dark:border-ink-800 dark:bg-ink-950 lg:hidden">
          <ul className="space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all ${
                    currentPage === item.id
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300'
                      : 'text-ink-600 hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            {!user && (
              <li>
                <button
                  onClick={() => { openAuthModal(); setMobileOpen(false); }}
                  className="block w-full rounded-lg bg-brand-500 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
