import React from 'react';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const icons: Record<AlertVariant, string> = { info: 'ℹ', success: '✓', warning: '⚠', danger: '✕' };

export default function Alert({ variant = 'info', title, children, onClose, className }: AlertProps) {
  return (
    <div className={[styles.alert, styles[variant], className ?? ''].filter(Boolean).join(' ')} role="alert">
      <span className={styles.icon} aria-hidden="true">{icons[variant]}</span>
      <div className={styles.content}>
        {title && <p className={styles.title}>{title}</p>}
        <div className={styles.body}>{children}</div>
      </div>
      {onClose && <button className={styles.close} onClick={onClose} aria-label="Close alert">×</button>}
    </div>
  );
}
