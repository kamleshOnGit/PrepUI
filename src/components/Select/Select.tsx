import React from 'react';
import styles from './Select.module.css';

export interface SelectOption { value: string; label: string; disabled?: boolean; }
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: SelectOption[];
  hint?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function Select({ label, options, hint, error, size = 'md', fullWidth = false, className, id, ...props }: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  const cls = [styles.select, styles[size], error ? styles.invalid : '', className ?? ''].filter(Boolean).join(' ');
  const wrapCls = [styles.wrapper, fullWidth ? styles.fullWidth : ''].filter(Boolean).join(' ');
  return (
    <div className={wrapCls}>
      {label && <label htmlFor={selectId} className={styles.label}>{label}</label>}
      <div className={styles.selectWrap}>
        <select id={selectId} className={cls} aria-invalid={!!error} {...props}>
          {options.map(o => <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
        </select>
        <span className={styles.arrow} aria-hidden="true">▾</span>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {!error && hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
