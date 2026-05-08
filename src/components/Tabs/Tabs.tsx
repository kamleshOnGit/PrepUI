import React from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (key: string) => void;
  variant?: 'underline' | 'pills' | 'boxed';
  className?: string;
}

export default function Tabs({ items, defaultActiveKey, activeKey: controlledKey, onChange, variant = 'underline', className }: TabsProps) {
  const [internalKey, setInternalKey] = React.useState(defaultActiveKey ?? items[0]?.key);
  const active = controlledKey ?? internalKey;

  const handleClick = (key: string) => { setInternalKey(key); onChange?.(key); };
  const activeItem = items.find(i => i.key === active);

  return (
    <div className={[styles.tabs, className ?? ''].filter(Boolean).join(' ')}>
      <div className={[styles.tabList, styles[variant]].join(' ')} role="tablist">
        {items.map(item => (
          <button
            key={item.key}
            role="tab"
            aria-selected={active === item.key}
            className={[styles.tab, active === item.key ? styles.active : '', item.disabled ? styles.disabled : ''].filter(Boolean).join(' ')}
            onClick={() => !item.disabled && handleClick(item.key)}
            disabled={item.disabled}
          >
            {item.label}
            {item.badge !== undefined && <span className={styles.badge}>{item.badge}</span>}
          </button>
        ))}
      </div>
      {activeItem?.content !== undefined && <div className={styles.panel} role="tabpanel">{activeItem.content}</div>}
    </div>
  );
}