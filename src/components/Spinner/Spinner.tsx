import styles from './Spinner.module.css';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'primary' | 'white' | 'muted';

export interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
  className?: string;
}

export default function Spinner({ size = 'md', variant = 'primary', label = 'Loading...', className }: SpinnerProps) {
  return (
    <span
      className={[styles.spinner, styles[size], styles[variant], className ?? ''].filter(Boolean).join(' ')}
      role="status"
      aria-label={label}
    />
  );
}
