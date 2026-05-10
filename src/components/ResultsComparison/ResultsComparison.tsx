import React from 'react';
import styles from './ResultsComparison.module.css';

export type ComparisonLayout = 'side-by-side' | 'stacked';

export interface ComparisonResult {
  id: string | number;
  label: string;
  content: React.ReactNode;
  /** Badge text shown next to label (e.g. model version, score) */
  badge?: string;
  /** Optional highlight/accent color for this result's header */
  accentColor?: string;
  /** Metadata chips to show below the header */
  meta?: Array<{ key: string; value: string }>;
}

export interface ResultsComparisonProps {
  results: ComparisonResult[];
  prompt?: string;
  layout?: ComparisonLayout;
  /** Allow user to toggle layout */
  allowToggle?: boolean;
  /** Highlight differences (adds a visual diff cue on each pane) */
  syncScroll?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function ResultsComparison({
  results,
  prompt,
  layout: initialLayout = 'side-by-side',
  allowToggle = true,
  className,
  style,
}: ResultsComparisonProps) {
  const [layout, setLayout] = React.useState<ComparisonLayout>(initialLayout);

  if (results.length === 0) return null;

  return (
    <div
      className={[styles.root, className ?? ''].filter(Boolean).join(' ')}
      style={style}
    >
      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <span className={styles.compareLabel}>Comparing {results.length} results</span>
          {prompt && (
            <span className={styles.promptChip} title={prompt}>
              <span className={styles.promptIcon} aria-hidden="true">⌨</span>
              {prompt.length > 60 ? prompt.slice(0, 60) + '…' : prompt}
            </span>
          )}
        </div>
        {allowToggle && (
          <div className={styles.toggleGroup} role="group" aria-label="Layout">
            <button
              className={[styles.toggleBtn, layout === 'side-by-side' ? styles.toggleBtnActive : ''].filter(Boolean).join(' ')}
              onClick={() => setLayout('side-by-side')}
              title="Side by side"
              aria-pressed={layout === 'side-by-side'}
            >
              ⊞
            </button>
            <button
              className={[styles.toggleBtn, layout === 'stacked' ? styles.toggleBtnActive : ''].filter(Boolean).join(' ')}
              onClick={() => setLayout('stacked')}
              title="Stacked"
              aria-pressed={layout === 'stacked'}
            >
              ☰
            </button>
          </div>
        )}
      </div>

      {/* ── Results grid ────────────────────────────────────────────── */}
      <div
        className={[
          styles.grid,
          layout === 'stacked' ? styles.gridStacked : styles.gridSideBySide,
        ].join(' ')}
      >
        {results.map((result) => (
          <div key={result.id} className={styles.pane}>
            {/* Pane header */}
            <div
              className={styles.paneHeader}
              style={result.accentColor ? { borderTopColor: result.accentColor } : undefined}
            >
              <div className={styles.paneHeaderTop}>
                <span className={styles.paneLabel}>{result.label}</span>
                {result.badge && (
                  <span
                    className={styles.paneBadge}
                    style={result.accentColor ? { background: result.accentColor + '22', color: result.accentColor, borderColor: result.accentColor + '55' } : undefined}
                  >
                    {result.badge}
                  </span>
                )}
              </div>
              {result.meta && result.meta.length > 0 && (
                <div className={styles.metaRow}>
                  {result.meta.map(({ key, value }) => (
                    <span key={key} className={styles.metaChip}>
                      <span className={styles.metaKey}>{key}</span>
                      <span className={styles.metaVal}>{value}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Pane content */}
            <div className={styles.paneBody}>
              {result.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
