import styles from './Skeleton.module.css';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  lines?: number;
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
}

const toSize = (v?: string | number) => (typeof v === 'number' ? `${v}px` : v);

export default function Skeleton({ variant = 'text', width, height, lines, animation = 'pulse', className }: SkeletonProps) {
  const cls = [styles.skeleton, styles[variant], animation !== 'none' ? styles[animation] : ''].filter(Boolean).join(' ');
  const style = { width: toSize(width), height: toSize(height) };
  const wrapperCls = [styles.wrapper, className ?? ''].filter(Boolean).join(' ');
  if (variant === 'text' && lines && lines > 1) {
    return (
      <span className={wrapperCls} role="status" aria-label="Loading" aria-live="polite">
        {Array.from({ length: lines }, (_, i) => (
          <span key={i} className={cls} style={{ ...style, width: i === lines - 1 ? '60%' : style.width }} />
        ))}
      </span>
    );
  }
  return (
    <span className={wrapperCls} role="status" aria-label="Loading" aria-live="polite">
      <span className={cls} style={style} />
    </span>
  );
}
