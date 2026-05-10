import React from 'react';
import styles from './FeedbackWidget.module.css';

export type FeedbackValue = 'positive' | 'negative' | null;

export interface FeedbackWidgetProps {
  /** Controlled value — omit for uncontrolled */
  value?: FeedbackValue;
  onChange?: (value: FeedbackValue) => void;
  /** Called when user submits feedback (value + optional comment) */
  onSubmit?: (value: FeedbackValue, comment: string) => void;
  /** Show the optional comment textarea after selection */
  showComment?: boolean;
  /** Placeholder text for the comment field */
  commentPlaceholder?: string;
  /** Custom positive label */
  positiveLabel?: string;
  /** Custom negative label */
  negativeLabel?: string;
  /** Compact mode — only shows thumbs icons, no labels */
  compact?: boolean;
  /** After submission show a thank-you state */
  showThankYou?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function FeedbackWidget({
  value: controlledValue,
  onChange,
  onSubmit,
  showComment = true,
  commentPlaceholder = 'Tell us more (optional)…',
  positiveLabel = 'Helpful',
  negativeLabel = 'Not helpful',
  compact = false,
  showThankYou = true,
  className,
  style,
}: FeedbackWidgetProps) {
  const isControlled = controlledValue !== undefined;
  const [internal, setInternal] = React.useState<FeedbackValue>(null);
  const value = isControlled ? controlledValue : internal;

  const [comment, setComment] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleVote = (next: FeedbackValue) => {
    const newVal = value === next ? null : next;
    if (!isControlled) setInternal(newVal);
    onChange?.(newVal);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;
    onSubmit?.(value, comment.trim());
    if (showThankYou) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className={[styles.root, styles.thankYou, className ?? ''].filter(Boolean).join(' ')}
        style={style}
        role="status"
      >
        <span className={styles.thankYouIcon} aria-hidden="true">✓</span>
        <span>Thanks for your feedback!</span>
      </div>
    );
  }

  return (
    <form
      className={[styles.root, compact ? styles.compact : '', className ?? ''].filter(Boolean).join(' ')}
      style={style}
      onSubmit={handleSubmit}
      aria-label="Response feedback"
    >
      <div className={styles.voting}>
        {!compact && (
          <span className={styles.votingLabel}>Was this helpful?</span>
        )}

        <div className={styles.buttons} role="group" aria-label="Feedback">
          <button
            type="button"
            className={[
              styles.voteBtn,
              styles.voteBtnPositive,
              value === 'positive' ? styles.voteBtnSelected : '',
            ].filter(Boolean).join(' ')}
            onClick={() => handleVote('positive')}
            aria-pressed={value === 'positive'}
            aria-label={positiveLabel}
            title={positiveLabel}
          >
            <span className={styles.thumbIcon} aria-hidden="true">👍</span>
            {!compact && <span>{positiveLabel}</span>}
          </button>

          <button
            type="button"
            className={[
              styles.voteBtn,
              styles.voteBtnNegative,
              value === 'negative' ? styles.voteBtnSelected : '',
            ].filter(Boolean).join(' ')}
            onClick={() => handleVote('negative')}
            aria-pressed={value === 'negative'}
            aria-label={negativeLabel}
            title={negativeLabel}
          >
            <span className={styles.thumbIcon} aria-hidden="true">👎</span>
            {!compact && <span>{negativeLabel}</span>}
          </button>
        </div>
      </div>

      {/* Comment field — shown after a vote is selected */}
      {showComment && value !== null && !compact && (
        <div className={styles.commentSection}>
          <textarea
            className={styles.commentArea}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={commentPlaceholder}
            rows={3}
            aria-label="Additional feedback"
          />
          <div className={styles.commentFooter}>
            <button
              type="button"
              className={styles.skipBtn}
              onClick={() => { onSubmit?.(value, ''); if (showThankYou) setSubmitted(true); }}
            >
              Skip
            </button>
            <button type="submit" className={styles.submitBtn}>
              Submit feedback
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
