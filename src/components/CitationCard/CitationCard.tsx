import React from 'react';
import styles from './CitationCard.module.css';

export type CitationVariant = 'default' | 'compact' | 'inline';

export interface CitationCardProps {
  /** 1-based citation index number */
  index?: number;
  title: string;
  url?: string;
  /** Source domain / publisher name */
  source?: string;
  /** Short excerpt or snippet from the source */
  excerpt?: string;
  /** ISO date string or label, e.g. "2024-01-15" or "3 days ago" */
  date?: string;
  /** Favicon / logo URL */
  favicon?: string;
  variant?: CitationVariant;
  /** Highlight excerpt text as a substring match */
  highlight?: string;
  className?: string;
  style?: React.CSSProperties;
}

function highlightText(text: string, term: string): React.ReactNode {
  if (!term) return text;
  const idx = text.toLowerCase().indexOf(term.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + term.length)}</mark>
      {text.slice(idx + term.length)}
    </>
  );
}

export default function CitationCard({
  index,
  title,
  url,
  source,
  excerpt,
  date,
  favicon,
  variant = 'default',
  highlight,
  className,
  style,
}: CitationCardProps) {
  const hostname = url
    ? (() => { try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; } })()
    : null;

  const displaySource = source ?? hostname ?? null;

  if (variant === 'inline') {
    return (
      <a
        className={[styles.inline, className ?? ''].filter(Boolean).join(' ')}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
        style={style}
      >
        {index !== undefined && <sup className={styles.inlineSup}>[{index}]</sup>}
        {favicon && <img src={favicon} alt="" className={styles.inlineFavicon} aria-hidden="true" />}
        {title}
      </a>
    );
  }

  const card = (
    <div
      className={[
        styles.card,
        variant === 'compact' ? styles.compact : '',
        url ? styles.clickable : '',
        className ?? '',
      ].filter(Boolean).join(' ')}
      style={style}
    >
      {/* Index badge */}
      {index !== undefined && (
        <span className={styles.indexBadge} aria-label={`Citation ${index}`}>{index}</span>
      )}

      <div className={styles.body}>
        {/* Source row */}
        <div className={styles.sourceRow}>
          {favicon ? (
            <img src={favicon} alt="" className={styles.favicon} aria-hidden="true" />
          ) : (
            <span className={styles.faviconFallback} aria-hidden="true">🔗</span>
          )}
          {displaySource && <span className={styles.sourceName}>{displaySource}</span>}
          {date && <span className={styles.date}>{date}</span>}
        </div>

        {/* Title */}
        <p className={styles.title}>
          {highlight ? highlightText(title, highlight) : title}
        </p>

        {/* Excerpt */}
        {excerpt && variant !== 'compact' && (
          <p className={styles.excerpt}>
            {highlight ? highlightText(excerpt, highlight) : excerpt}
          </p>
        )}

        {/* URL */}
        {url && (
          <span className={styles.url}>{url.length > 60 ? url.slice(0, 60) + '…' : url}</span>
        )}
      </div>
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
        {card}
      </a>
    );
  }
  return card;
}
