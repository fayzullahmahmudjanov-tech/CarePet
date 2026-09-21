import { useState, useEffect } from 'react';
import { X, PawPrint, Mail, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react';
import { useApp } from '@/context';

export default function AuthModal() {
  const { authModalOpen, closeAuthModal, login, showToast } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  useEffect(() => {
    if (authModalOpen) {
      setFormData({ name: '', email: '', password: '' });
      setErrors({});
      setShowPassword(false);
    }
  }, [authModalOpen]);

  if (!authModalOpen) return null;

  const validate = () => {
    const e: typeof errors = {};
    if (mode === 'register' && formData.name.trim().length < 2) {
      e.name = 'Please enter your full name';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = 'Please enter a valid email address';
    }
    if (formData.password.length < 6) {
      e.password = 'Password must be at least 6 characters';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const name = mode === 'register' ? formData.name : formData.email.split('@')[0];
    login({ name, email: formData.email });
    showToast(mode === 'login' ? 'Welcome back!' : 'Account created successfully!', 'success');
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm animate-fade-in"
        onClick={closeAuthModal}
      />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-card-hover animate-scale-in dark:bg-ink-900">
        <button
          onClick={closeAuthModal}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-ink-400 transition-all hover:bg-ink-100 dark:hover:bg-ink-800"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl gradient-brand">
            <PawPrint className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-ink-900 dark:text-white">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            {mode === 'login' ? 'Sign in to manage your pets and appointments' : 'Join CarePet to start caring for your pets'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {mode === 'register' && (
            <div>
              <label htmlFor="auth-name" className="label-field">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
                <input
                  id="auth-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`input-field pl-11 ${errors.name ? 'border-danger-500' : ''}`}
                  placeholder="Jane Smith"
                  required
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-danger-600">{errors.name}</p>}
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="label-field">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
              <input
                id="auth-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`input-field pl-11 ${errors.email ? 'border-danger-500' : ''}`}
                placeholder="jane@example.com"
                required
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-danger-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="auth-password" className="label-field">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`input-field pl-11 pr-11 ${errors.password ? 'border-danger-500' : ''}`}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-danger-600">{errors.password}</p>}
          </div>

          <button type="submit" className="btn-primary w-full">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500 dark:text-ink-400">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setErrors({}); }}
            className="font-semibold text-brand-600 hover:underline dark:text-brand-400"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
