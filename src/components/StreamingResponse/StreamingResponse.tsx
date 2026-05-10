import React from 'react';
import styles from './StreamingResponse.module.css';

export type StreamingStatus = 'idle' | 'streaming' | 'done' | 'error';

export interface StreamingResponseProps {
  /** The text content to display (can grow over time) */
  content: string;
  status?: StreamingStatus;
  /** Tokens per second (shown in status bar) */
  tokensPerSecond?: number;
  /** Total tokens rendered so far */
  tokenCount?: number;
  /** Model name / identifier label */
  model?: string;
  /** Show the top status bar */
  showMeta?: boolean;
  /** Custom error message */
  errorMessage?: string;
  /** Called when user clicks "Copy" */
  onCopy?: (content: string) => void;
  /** Called when user clicks "Retry" (only shown in error state) */
  onRetry?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function StreamingResponse({
  content,
  status = 'idle',
  tokensPerSecond,
  tokenCount,
  model,
  showMeta = true,
  errorMessage = 'Something went wrong. Please try again.',
  onCopy,
  onRetry,
  className,
  style,
}: StreamingResponseProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (onCopy) {
      onCopy(content);
    } else {
      navigator.clipboard?.writeText(content);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isStreaming = status === 'streaming';
  const isError = status === 'error';
  const isEmpty = content.length === 0 && !isStreaming;

  return (
    <div
      className={[
        styles.root,
        isError ? styles.rootError : '',
        className ?? '',
      ].filter(Boolean).join(' ')}
      style={style}
      aria-live="polite"
      aria-label="AI response"
    >
      {/* ── Meta bar ──────────────────────────────────────────────────── */}
      {showMeta && (
        <div className={styles.meta}>
          <div className={styles.metaLeft}>
            {model && <span className={styles.modelBadge}>{model}</span>}
            {isStreaming && (
              <span className={styles.statusStreaming}>
                <span className={styles.pulseDot} aria-hidden="true" />
                Generating…
              </span>
            )}
            {status === 'done' && <span className={styles.statusDone}>✓ Complete</span>}
            {isError && <span className={styles.statusError}>✗ Error</span>}
          </div>
          <div className={styles.metaRight}>
            {tokenCount !== undefined && (
              <span className={styles.metaInfo}>{tokenCount} tokens</span>
            )}
            {tokensPerSecond !== undefined && isStreaming && (
              <span className={styles.metaInfo}>{tokensPerSecond.toFixed(0)} tok/s</span>
            )}
            {content.length > 0 && (
              <button
                className={[styles.actionBtn, copied ? styles.actionBtnCopied : ''].filter(Boolean).join(' ')}
                onClick={handleCopy}
                aria-label="Copy response"
                type="button"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Content area ──────────────────────────────────────────────── */}
      <div className={[styles.body, isEmpty ? styles.bodyEmpty : ''].filter(Boolean).join(' ')}>
        {isError ? (
          <div className={styles.errorBlock}>
            <span className={styles.errorIcon} aria-hidden="true">⚠</span>
            <span>{errorMessage}</span>
            {onRetry && (
              <button className={styles.retryBtn} onClick={onRetry} type="button">
                Retry
              </button>
            )}
          </div>
        ) : isEmpty ? (
          <span className={styles.emptyText}>Waiting for response…</span>
        ) : (
          <p className={styles.text}>
            {content}
            {isStreaming && <span className={styles.cursor} aria-hidden="true" />}
          </p>
        )}
      </div>
    </div>
  );
}
