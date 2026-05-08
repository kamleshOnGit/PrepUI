import React from 'react';
import styles from './Sidebar.module.css';

export interface SidebarItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  items?: SidebarItem[];
}

export interface SidebarProps {
  items: SidebarItem[];
  activeKey?: string;
  onSelect?: (key: string) => void;
  collapsed?: boolean;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

function NavItem({ item, activeKey, onSelect, collapsed, depth = 0 }: {
  item: SidebarItem; activeKey?: string; onSelect?: (key: string) => void; collapsed?: boolean; depth?: number;
}) {
  const [open, setOpen] = React.useState(false);
  const hasChildren = item.items && item.items.length > 0;
  const isActive = activeKey === item.key;
  return (
    <li>
      <button
        className={[styles.navItem, isActive ? styles.active : '', depth > 0 ? styles.nested : ''].filter(Boolean).join(' ')}
        onClick={() => { if (hasChildren) setOpen(o => !o); else onSelect?.(item.key); }}
        title={collapsed ? item.label : undefined}
      >
        {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
        {!collapsed && <span className={styles.itemLabel}>{item.label}</span>}
        {!collapsed && item.badge && <span className={styles.badge}>{item.badge}</span>}
        {!collapsed && hasChildren && <span className={styles.chevron}>{open ? '▾' : '▸'}</span>}
      </button>
      {hasChildren && open && !collapsed && (
        <ul className={styles.subMenu}>
          {item.items!.map(child => <NavItem key={child.key} item={child} activeKey={activeKey} onSelect={onSelect} depth={depth + 1} />)}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar({ items, activeKey, onSelect, collapsed = false, logo, footer, className }: SidebarProps) {
  return (
    <aside className={[styles.sidebar, collapsed ? styles.collapsed : '', className ?? ''].filter(Boolean).join(' ')}>
      {logo && <div className={styles.logo}>{logo}</div>}
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {items.map(item => <NavItem key={item.key} item={item} activeKey={activeKey} onSelect={onSelect} collapsed={collapsed} />)}
        </ul>
      </nav>
      {footer && <div className={styles.footer}>{footer}</div>}
    </aside>
  );
}