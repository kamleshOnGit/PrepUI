import styles from './Progress.module.css';

export type ProgressVariant = 'primary' | 'success' | 'warning' | 'danger';
export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ProgressProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  label?: string;
  showValue?: boolean;
  striped?: boolean;
  animated?: boolean;
  className?: string;
}

export default function Progress({ value, max = 100, variant = 'primary', size = 'md', label, showValue = false, striped = false, animated = false, className }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const barCls = [styles.bar, styles[variant], striped ? styles.striped : '', animated ? styles.animated : ''].filter(Boolean).join(' ');
  return (
    <div className={[styles.wrapper, className ?? ''].filter(Boolean).join(' ')}>
      {(label || showValue) && (
        <div className={styles.labelRow}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && <span className={styles.value}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={[styles.track, styles[size]].join(' ')} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
        <div className={barCls} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
