import React from 'react';
import styles from './RadioGroup.module.css';

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name?: string;
  label?: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  direction?: 'vertical' | 'horizontal';
  disabled?: boolean;
  error?: string;
  className?: string;
}

export default function RadioGroup({ name, label, options, value, defaultValue, onChange, direction = 'vertical', disabled = false, error, className }: RadioGroupProps) {
  const generatedId = React.useId();
  const groupName = name ?? generatedId;
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const selected = isControlled ? value : internalValue;
  const handleChange = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };
  const wrapCls = [styles.wrapper, className ?? ''].filter(Boolean).join(' ');
  const listCls = [styles.list, direction === 'horizontal' ? styles.horizontal : styles.vertical].join(' ');
  return (
    <div className={wrapCls} role="radiogroup" aria-labelledby={label ? `${generatedId}-label` : undefined} aria-invalid={!!error}>
      {label && <span id={`${generatedId}-label`} className={styles.groupLabel}>{label}</span>}
      <div className={listCls}>
        {options.map((option) => {
          const optionId = `${generatedId}-${option.value}`;
          const isDisabled = disabled || option.disabled;
          return (
            <div key={option.value} className={[styles.option, isDisabled ? styles.disabled : ''].filter(Boolean).join(' ')}>
              <input
                type="radio"
                id={optionId}
                name={groupName}
                value={option.value}
                checked={selected === option.value}
                disabled={isDisabled}
                onChange={() => handleChange(option.value)}
                className={styles.input}
              />
              <span className={styles.circle} aria-hidden="true" />
              <div className={styles.labelWrap}>
                <label htmlFor={optionId} className={styles.label}>{option.label}</label>
                {option.description && <span className={styles.description}>{option.description}</span>}
              </div>
            </div>
          );
        })}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
