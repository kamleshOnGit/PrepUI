import React from 'react';
import styles from './DataTable.module.css';

export type SortDirection = 'asc' | 'desc' | null;

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface DataTableProps<T extends { id: string | number }> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: string;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  stickyHeader?: boolean;
  className?: string;
}

export default function DataTable<T extends { id: string | number }>({
  columns, data, loading = false, emptyText = 'No data', striped = false,
  hoverable = true, bordered = false, stickyHeader = false, className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDirection>(null);

  const handleSort = (key: string) => {
    if (sortKey !== key) { setSortKey(key); setSortDir('asc'); }
    else if (sortDir === 'asc') setSortDir('desc');
    else { setSortKey(null); setSortDir(null); }
  };

  const tableCls = [styles.table, striped ? styles.striped : '', hoverable ? styles.hoverable : '', bordered ? styles.bordered : '', className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={styles.wrapper}>
      <table className={tableCls}>
        <thead className={stickyHeader ? styles.sticky : ''}>
          <tr>
            {columns.map(col => (
              <th key={col.key} className={[styles.th, col.sortable ? styles.sortable : ''].filter(Boolean).join(' ')} style={col.width ? { width: col.width } : undefined} onClick={col.sortable ? () => handleSort(col.key) : undefined}>
                {col.header}
                {col.sortable && <span className={styles.sortIcon}>{sortKey === col.key ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ' ↕'}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={columns.length} className={styles.loading}>Loading...</td></tr>
          ) : data.length === 0 ? (
            <tr><td colSpan={columns.length} className={styles.empty}>{emptyText}</td></tr>
          ) : (
            data.map(row => (
              <tr key={row.id} className={styles.tr}>
                {columns.map(col => <td key={col.key} className={styles.td}>{col.accessor(row)}</td>)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
