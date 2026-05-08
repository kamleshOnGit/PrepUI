import React from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
  indeterminate?: boolean;
}

export default function Checkbox({ label, description, error, indeterminate = false, className, id, ...props }: CheckboxProps) {
  const checkId = id ?? Math.random().toString(36).slice(2);
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = indeterminate; }, [indeterminate]);
  return (
    <div className={[styles.wrapper, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.row}>
        <input type="checkbox" id={checkId} ref={ref} className={styles.input} {...props} />
        {label && (
          <div className={styles.labelWrap}>
            <label htmlFor={checkId} className={styles.label}>{label}</label>
            {description && <span className={styles.description}>{description}</span>}
          </div>
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
