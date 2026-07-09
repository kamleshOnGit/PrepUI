import React from 'react';
import styles from './Switch.module.css';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Switch({ label, description, size = 'md', className, id, ...props }: SwitchProps) {
  const autoId = React.useId();
  const switchId = id ?? autoId;
  return (
    <div className={[styles.wrapper, className ?? ''].filter(Boolean).join(' ')}>
      <label htmlFor={switchId} className={styles.row}>
        <span className={[styles.track, styles[size]].join(' ')}>
          <input type="checkbox" id={switchId} className={styles.input} role="switch" {...props} />
          <span className={styles.thumb} />
        </span>
        {label && (
          <div className={styles.labelWrap}>
            <span className={styles.label}>{label}</span>
            {description && <span className={styles.description}>{description}</span>}
          </div>
        )}
      </label>
    </div>
  );
}
