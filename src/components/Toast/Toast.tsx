import React from 'react';
import { createPortal } from 'react-dom';
import styles from './Toast.module.css';

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';
export type ToastPosition = 'top-right' | 'top-center' | 'bottom-right';

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

const icons: Record<ToastVariant, string> = { info: 'ℹ', success: '✓', warning: '⚠', danger: '✕' };
const positionClass: Record<ToastPosition, string> = { 'top-right': 'topRight', 'top-center': 'topCenter', 'bottom-right': 'bottomRight' };

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a <ToastProvider>');
  return ctx;
}

export default function ToastProvider({ children, position = 'bottom-right', duration = 4000 }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);
  const counter = React.useRef(0);
  const timers = React.useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismiss = React.useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) { clearTimeout(timer); timers.current.delete(id); }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback((options: ToastOptions) => {
    const id = `toast-${++counter.current}`;
    setToasts((prev) => [...prev, { ...options, id }]);
    const ms = options.duration ?? duration;
    if (ms > 0) timers.current.set(id, setTimeout(() => dismiss(id), ms));
    return id;
  }, [duration, dismiss]);

  React.useEffect(() => {
    const map = timers.current;
    return () => { map.forEach(clearTimeout); map.clear(); };
  }, []);

  const value = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className={[styles.container, styles[positionClass[position]]].join(' ')} aria-live="polite">
          {toasts.map(({ id, title, description, variant = 'info' }) => (
            <div key={id} className={[styles.toast, styles[variant]].join(' ')} role="status">
              <span className={styles.icon} aria-hidden="true">{icons[variant]}</span>
              <div className={styles.content}>
                {title && <p className={styles.title}>{title}</p>}
                {description && <p className={styles.description}>{description}</p>}
              </div>
              <button className={styles.close} onClick={() => dismiss(id)} aria-label="Dismiss notification">×</button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}
