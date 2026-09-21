import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { useApp } from '@/context';

export default function Toasts() {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 shadow-card-hover animate-slide-up ${
            toast.type === 'success'
              ? 'bg-success-500 text-white'
              : toast.type === 'error'
              ? 'bg-danger-500 text-white'
              : 'bg-ink-900 text-white dark:bg-ink-100 dark:text-ink-900'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="h-5 w-5 shrink-0" />}
          {toast.type === 'error' && <XCircle className="h-5 w-5 shrink-0" />}
          {toast.type === 'info' && <Info className="h-5 w-5 shrink-0" />}
          <p className="text-sm font-medium">{toast.message}</p>
          <button
            onClick={() => dismissToast(toast.id)}
            className="ml-2 opacity-70 transition-opacity hover:opacity-100"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
