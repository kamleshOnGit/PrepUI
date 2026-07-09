import React from 'react';
import styles from './Textarea.module.css';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: TextareaSize;
  fullWidth?: boolean;
  autoResize?: boolean;
  showCount?: boolean;
}

export default function Textarea({ label, helperText, error, size = 'md', fullWidth = false, autoResize = false, showCount = false, className, id, onInput, onChange, defaultValue, value, maxLength, ...props }: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  const [internalCount, setCount] = React.useState(() => String(defaultValue ?? '').length);
  const count = value !== undefined ? String(value).length : internalCount;
  const wrapCls = [styles.wrapper, fullWidth ? styles.fullWidth : ''].filter(Boolean).join(' ');
  const textareaCls = [styles.textarea, styles[size], error ? styles.invalid : '', autoResize ? styles.autoResize : '', className ?? ''].filter(Boolean).join(' ');
  const handleInput: React.InputEventHandler<HTMLTextAreaElement> = (e) => {
    if (autoResize) {
      const el = e.currentTarget;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
    onInput?.(e);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (showCount) setCount(e.currentTarget.value.length);
    onChange?.(e);
  };
  return (
    <div className={wrapCls}>
      {label && <label htmlFor={textareaId} className={styles.label}>{label}</label>}
      <textarea id={textareaId} className={textareaCls} aria-invalid={!!error} aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined} maxLength={maxLength} value={value} defaultValue={defaultValue} onInput={handleInput} onChange={handleChange} {...props} />
      <div className={styles.footer}>
        <div className={styles.messages}>
          {error && <p id={`${textareaId}-error`} className={styles.error}>{error}</p>}
          {!error && helperText && <p id={`${textareaId}-helper`} className={styles.helper}>{helperText}</p>}
        </div>
        {showCount && <span className={styles.count}>{maxLength != null ? `${count}/${maxLength}` : count}</span>}
      </div>
    </div>
  );
}
