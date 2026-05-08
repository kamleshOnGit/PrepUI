import styles from './Avatar.module.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

function stringToColor(str: string) {
  const colors = ['#6366f1','#8b5cf6','#ec4899','#f59e0b','#10b981','#3b82f6','#ef4444'];
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return colors[Math.abs(h) % colors.length];
}

export default function Avatar({ src, alt, name, size = 'md', status, className }: AvatarProps) {
  const cls = [styles.avatar, styles[size], className ?? ''].filter(Boolean).join(' ');
  const bg = name ? stringToColor(name) : '#6366f1';
  return (
    <span className={cls} style={!src ? { background: bg } : undefined}>
      {src ? <img src={src} alt={alt ?? name ?? 'Avatar'} className={styles.img} />
        : name ? <span className={styles.initials}>{getInitials(name)}</span>
        : <span className={styles.fallback}>?</span>}
      {status && <span className={[styles.status, styles[status]].join(' ')} />}
    </span>
  );
}
