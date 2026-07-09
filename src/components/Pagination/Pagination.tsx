import styles from './Pagination.module.css';

export type PaginationSize = 'sm' | 'md';

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  size?: PaginationSize;
  className?: string;
}

const ELLIPSIS = '…';

function getRange(page: number, pageCount: number, siblingCount: number): (number | typeof ELLIPSIS)[] {
  const totalShown = siblingCount * 2 + 5;
  if (pageCount <= totalShown) return Array.from({ length: pageCount }, (_, i) => i + 1);
  const left = Math.max(page - siblingCount, 1);
  const right = Math.min(page + siblingCount, pageCount);
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < pageCount - 1;
  const range: (number | typeof ELLIPSIS)[] = [1];
  if (showLeftEllipsis) range.push(ELLIPSIS);
  for (let i = showLeftEllipsis ? left : 2; i <= (showRightEllipsis ? right : pageCount - 1); i++) range.push(i);
  if (showRightEllipsis) range.push(ELLIPSIS);
  range.push(pageCount);
  return range;
}

export default function Pagination({
  page, pageCount, onPageChange, siblingCount = 1, showFirstLast = false, size = 'md', className,
}: PaginationProps) {
  const items = getRange(page, pageCount, siblingCount);
  const btnCls = [styles.btn, styles[size]].join(' ');
  return (
    <nav aria-label="Pagination" className={[styles.pagination, className ?? ''].filter(Boolean).join(' ')}>
      {showFirstLast && (
        <button className={btnCls} onClick={() => onPageChange(1)} disabled={page <= 1} aria-label="First page">«</button>
      )}
      <button className={btnCls} onClick={() => onPageChange(page - 1)} disabled={page <= 1} aria-label="Previous page">‹</button>
      {items.map((item, i) =>
        item === ELLIPSIS ? (
          <span key={`e-${i}`} className={[styles.ellipsis, styles[size]].join(' ')} aria-hidden="true">{ELLIPSIS}</span>
        ) : (
          <button
            key={item}
            className={[btnCls, item === page ? styles.current : ''].filter(Boolean).join(' ')}
            onClick={() => onPageChange(item)}
            aria-current={item === page ? 'page' : undefined}
            aria-label={`Page ${item}`}
          >
            {item}
          </button>
        )
      )}
      <button className={btnCls} onClick={() => onPageChange(page + 1)} disabled={page >= pageCount} aria-label="Next page">›</button>
      {showFirstLast && (
        <button className={btnCls} onClick={() => onPageChange(pageCount)} disabled={page >= pageCount} aria-label="Last page">»</button>
      )}
    </nav>
  );
}
