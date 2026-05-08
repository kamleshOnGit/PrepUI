import React from 'react';
import styles from './Dropdown.module.css';

export interface DropdownItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  divider?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactElement;
  items: DropdownItem[];
  onSelect?: (key: string) => void;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  className?: string;
}

export default function Dropdown({ trigger, items, onSelect, placement = 'bottom-start', className }: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className={[styles.wrapper, className ?? ''].filter(Boolean).join(' ')} ref={ref}>
      <span onClick={() => setOpen(o => !o)} style={{ display: 'inline-flex' }}>{trigger}</span>
      {open && (
        <div className={[styles.menu, styles[placement]].join(' ')} role="menu">
          {items.map(item =>
            item.divider
              ? <div key={item.key} className={styles.divider} role="separator" />
              : (
                <button
                  key={item.key}
                  className={[styles.item, item.danger ? styles.danger : '', item.disabled ? styles.itemDisabled : ''].filter(Boolean).join(' ')}
                  role="menuitem"
                  disabled={item.disabled}
                  onClick={() => { if (!item.disabled) { onSelect?.(item.key); setOpen(false); } }}
                >
                  {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                  {item.label}
                </button>
              )
          )}
        </div>
      )}
    </div>
  );
}
