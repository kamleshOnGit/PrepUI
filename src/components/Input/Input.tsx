import React from 'react';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  size?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export default function Input({ label, hint, error, size = 'md', leftIcon, rightIcon, fullWidth = false, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  const wrapCls = [styles.wrapper, fullWidth ? styles.fullWidth : ''].filter(Boolean).join(' ');
  const inputCls = [styles.input, styles[size], leftIcon ? styles.hasLeft : '', rightIcon ? styles.hasRight : '', error ? styles.invalid : '', className ?? ''].filter(Boolean).join(' ');
  return (
    <div className={wrapCls}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
      <div className={styles.inputWrap}>
        {leftIcon && <span className={[styles.icon, styles.iconLeft].join(' ')}>{leftIcon}</span>}
        <input id={inputId} className={inputCls} aria-invalid={!!error} aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined} {...props} />
        {rightIcon && <span className={[styles.icon, styles.iconRight].join(' ')}>{rightIcon}</span>}
      </div>
      {error && <p id={`${inputId}-error`} className={styles.error}>{error}</p>}
      {!error && hint && <p id={`${inputId}-hint`} className={styles.hint}>{hint}</p>}
    </div>
  );
}
