import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface Toast { id: number; message: string; type: 'success' | 'error' }
interface ToastContextValue { push: (message: string, type?: 'success' | 'error') => void }

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] space-y-2">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`flex items-center gap-2 rounded-md border px-4 py-3 text-sm font-medium shadow-lg ${
              t.type === 'success'
                ? 'border-success-300 bg-success-50 text-success-800 dark:border-success-700 dark:bg-success-900/90 dark:text-success-200'
                : 'border-error-300 bg-error-50 text-error-800 dark:border-error-700 dark:bg-error-900/90 dark:text-error-200'
            }`}
          >
            {t.type === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <XCircle className="h-4 w-4 shrink-0" />}
            <span>{t.message}</span>
            <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="ml-2 opacity-60 hover:opacity-100">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
