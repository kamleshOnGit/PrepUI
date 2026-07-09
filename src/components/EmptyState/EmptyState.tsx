import React from 'react';
import styles from './EmptyState.module.css';

export type EmptyStateSize = 'sm' | 'md' | 'lg';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: EmptyStateSize;
  className?: string;
}

export default function EmptyState({ icon, title, description, action, size = 'md', className }: EmptyStateProps) {
  const cls = [styles.wrapper, styles[size], className ?? ''].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      {icon && <div className={styles.icon} aria-hidden="true">{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
