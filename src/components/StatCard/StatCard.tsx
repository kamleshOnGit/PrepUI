import React from 'react';
import styles from './StatCard.module.css';

export type StatCardTrend = 'up' | 'down' | 'neutral';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: StatCardTrend;
  trendValue?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function StatCard({ title, value, subtitle, trend, trendValue, icon, className }: StatCardProps) {
  return (
    <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
      <div className={styles.value}>{value}</div>
      <div className={styles.footer}>
        {trend && trendValue && (
          <span className={[styles.trend, styles[trend]].join(' ')}>
            {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '–'} {trendValue}
          </span>
        )}
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </div>
    </div>
  );
}