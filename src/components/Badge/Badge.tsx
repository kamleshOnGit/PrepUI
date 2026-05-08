import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = 'default', size = 'md', dot = false, children, className }: BadgeProps) {
  const cls = [styles.badge, styles[variant], styles[size], dot ? styles.dot : '', className ?? ''].filter(Boolean).join(' ');
  return <span className={cls}>{dot && <span className={styles.dotIndicator} />}{children}</span>;
}
