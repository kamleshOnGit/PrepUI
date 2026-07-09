import React from 'react';
import styles from './DataTable.module.css';

export type SortDirection = 'asc' | 'desc' | null;

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  sortAccessor?: (row: T) => string | number;
  width?: string;
}

export interface DataTableProps<T extends { id: string | number }> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: string;
  empty?: React.ReactNode;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  stickyHeader?: boolean;
  pageSize?: number;
  selectable?: boolean;
  selectedIds?: Array<string | number>;
  onSelectionChange?: (ids: Array<string | number>) => void;
  className?: string;
}

export default function DataTable<T extends { id: string | number }>({
  columns, data, loading = false, emptyText = 'No data', empty, striped = false,
  hoverable = true, bordered = false, stickyHeader = false, pageSize,
  selectable = false, selectedIds, onSelectionChange, className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDirection>(null);
  const [page, setPage] = React.useState(1);
  const [internalSelected, setInternalSelected] = React.useState<Array<string | number>>([]);
  const selected = selectedIds ?? internalSelected;
  const headerCheckboxRef = React.useRef<HTMLInputElement>(null);

  const handleSort = (key: string) => {
    if (sortKey !== key) { setSortKey(key); setSortDir('asc'); }
    else if (sortDir === 'asc') setSortDir('desc');
    else { setSortKey(null); setSortDir(null); }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey || !sortDir) return data;
    const col = columns.find(c => c.key === sortKey);
    if (!col) return data;
    const getValue = (row: T): string | number => {
      if (col.sortAccessor) return col.sortAccessor(row);
      const v = col.accessor(row);
      return typeof v === 'number' ? v : String(v ?? '');
    };
    return [...data].sort((a, b) => {
      const va = getValue(a), vb = getValue(b);
      const cmp = typeof va === 'number' && typeof vb === 'number' ? va - vb : String(va).localeCompare(String(vb));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, columns, sortKey, sortDir]);

  const pageCount = pageSize ? Math.max(1, Math.ceil(sortedData.length / pageSize)) : 1;
  const currentPage = Math.min(page, pageCount);
  const pageData = pageSize ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize) : sortedData;

  const setSelected = (ids: Array<string | number>) => {
    if (selectedIds === undefined) setInternalSelected(ids);
    onSelectionChange?.(ids);
  };
  const toggleRow = (id: string | number) => {
    setSelected(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);
  };
  const pageIds = pageData.map(r => r.id);
  const allPageSelected = pageIds.length > 0 && pageIds.every(id => selected.includes(id));
  const somePageSelected = pageIds.some(id => selected.includes(id));
  const toggleAll = () => {
    setSelected(allPageSelected ? selected.filter(id => !pageIds.includes(id)) : [...new Set([...selected, ...pageIds])]);
  };

  React.useEffect(() => {
    if (headerCheckboxRef.current) headerCheckboxRef.current.indeterminate = somePageSelected && !allPageSelected;
  }, [somePageSelected, allPageSelected]);

  const colSpan = columns.length + (selectable ? 1 : 0);
  const tableCls = [styles.table, striped ? styles.striped : '', hoverable ? styles.hoverable : '', bordered ? styles.bordered : '', className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={styles.wrapper}>
      <table className={tableCls}>
        <thead className={stickyHeader ? styles.sticky : ''}>
          <tr>
            {selectable && (
              <th className={[styles.th, styles.checkboxCell].join(' ')}>
                <input ref={headerCheckboxRef} type="checkbox" className={styles.checkbox} checked={allPageSelected} onChange={toggleAll} aria-label="Select all rows" />
              </th>
            )}
            {columns.map(col => (
              <th key={col.key} className={[styles.th, col.sortable ? styles.sortable : ''].filter(Boolean).join(' ')} style={col.width ? { width: col.width } : undefined} onClick={col.sortable ? () => handleSort(col.key) : undefined} aria-sort={col.sortable && sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}>
                {col.header}
                {col.sortable && <span className={styles.sortIcon}>{sortKey === col.key ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ' ↕'}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={colSpan} className={styles.loading}>Loading...</td></tr>
          ) : pageData.length === 0 ? (
            <tr><td colSpan={colSpan} className={styles.empty}>{empty ?? emptyText}</td></tr>
          ) : (
            pageData.map(row => (
              <tr key={row.id} className={[styles.tr, selected.includes(row.id) ? styles.selected : ''].filter(Boolean).join(' ')}>
                {selectable && (
                  <td className={[styles.td, styles.checkboxCell].join(' ')}>
                    <input type="checkbox" className={styles.checkbox} checked={selected.includes(row.id)} onChange={() => toggleRow(row.id)} aria-label={`Select row ${row.id}`} />
                  </td>
                )}
                {columns.map(col => <td key={col.key} className={styles.td}>{col.accessor(row)}</td>)}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {pageSize !== undefined && !loading && sortedData.length > 0 && (
        <div className={styles.footer}>
          <span className={styles.footerInfo}>
            {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length}
            {selectable && selected.length > 0 ? ` · ${selected.length} selected` : ''}
          </span>
          <div className={styles.footerControls}>
            <button type="button" className={styles.pageBtn} onClick={() => setPage(currentPage - 1)} disabled={currentPage <= 1} aria-label="Previous page">‹</button>
            <span className={styles.pageLabel}>Page {currentPage} of {pageCount}</span>
            <button type="button" className={styles.pageBtn} onClick={() => setPage(currentPage + 1)} disabled={currentPage >= pageCount} aria-label="Next page">›</button>
          </div>
        </div>
      )}
    </div>
  );
}
