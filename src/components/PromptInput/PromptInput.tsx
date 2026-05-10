import React from 'react';
import styles from './PromptInput.module.css';

export interface PromptInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  maxLength?: number;
  minRows?: number;
  maxRows?: number;
  /** Show character counter */
  showCount?: boolean;
  /** Extra toolbar content rendered left of the send button */
  toolbar?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function PromptInput({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = 'Ask anything…',
  disabled = false,
  loading = false,
  maxLength,
  minRows = 1,
  maxRows = 6,
  showCount = false,
  toolbar,
  className,
  style,
}: PromptInputProps) {
  const [internalValue, setInternalValue] = React.useState('');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height
  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const lineH = 24;
    const min = minRows * lineH + 16;
    const max = maxRows * lineH + 16;
    el.style.height = Math.min(Math.max(el.scrollHeight, min), max) + 'px';
    el.style.overflowY = el.scrollHeight > max ? 'auto' : 'hidden';
  }, [value, minRows, maxRows]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    if (maxLength !== undefined && next.length > maxLength) return;
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled || loading) return;
    onSubmit?.(trimmed);
    if (!isControlled) setInternalValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const atLimit = maxLength !== undefined && value.length >= maxLength;
  const isEmpty = value.trim().length === 0;
  const canSubmit = !isEmpty && !disabled && !loading;

  return (
    <div
      className={[styles.wrapper, disabled ? styles.wrapperDisabled : '', className ?? ''].filter(Boolean).join(' ')}
      style={style}
    >
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || loading}
        rows={minRows}
        aria-label="Prompt input"
        aria-multiline="true"
      />

      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          {toolbar}
          {showCount && maxLength !== undefined && (
            <span className={[styles.count, atLimit ? styles.countLimit : ''].filter(Boolean).join(' ')}>
              {value.length}/{maxLength}
            </span>
          )}
          {showCount && maxLength === undefined && value.length > 0 && (
            <span className={styles.count}>{value.length}</span>
          )}
        </div>

        <div className={styles.footerRight}>
          <span className={styles.hint}>
            {!disabled && <><kbd>Shift</kbd>+<kbd>Enter</kbd> for newline</>}
          </span>
          <button
            className={[styles.sendBtn, canSubmit ? styles.sendBtnActive : ''].filter(Boolean).join(' ')}
            onClick={handleSubmit}
            disabled={!canSubmit}
            aria-label="Send message"
            type="button"
          >
            {loading ? (
              <span className={styles.spinner} aria-hidden="true" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M14 8L2 2l3 6-3 6 12-6z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
