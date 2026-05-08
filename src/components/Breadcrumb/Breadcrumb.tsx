import React from 'react';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export default function Breadcrumb({ items, separator = '/', className }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={[styles.nav, className ?? ''].filter(Boolean).join(' ')}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className={styles.item} aria-current={isLast ? 'page' : undefined}>
              {item.href && !isLast
                ? <a href={item.href} className={styles.link}>{item.label}</a>
                : <span className={isLast ? styles.current : styles.link}>{item.label}</span>}
              {!isLast && <span className={styles.separator} aria-hidden="true">{separator}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}