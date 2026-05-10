import React from 'react';
import styles from './ChatPanel.module.css';

export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string | number;
  role: ChatRole;
  content: React.ReactNode;
  timestamp?: Date | string;
  avatar?: string;
  name?: string;
  isStreaming?: boolean;
}

export interface ChatPanelProps {
  messages: ChatMessage[];
  loading?: boolean;
  emptyText?: string;
  userLabel?: string;
  assistantLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Render prop for custom message actions (copy, retry, etc.) */
  renderActions?: (message: ChatMessage) => React.ReactNode;
}

export default function ChatPanel({
  messages,
  loading = false,
  emptyText = 'No messages yet. Start a conversation!',
  userLabel = 'You',
  assistantLabel = 'Assistant',
  className,
  style,
  renderActions,
}: ChatPanelProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (ts: Date | string) => {
    const d = typeof ts === 'string' ? new Date(ts) : ts;
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={[styles.panel, className ?? ''].filter(Boolean).join(' ')}
      style={style}
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      {messages.length === 0 && !loading ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon} aria-hidden="true">💬</span>
          <p>{emptyText}</p>
        </div>
      ) : (
        <div className={styles.messages}>
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isSystem = msg.role === 'system';
            const label = isUser ? userLabel : isSystem ? 'System' : (msg.name ?? assistantLabel);

            return (
              <div
                key={msg.id}
                className={[
                  styles.row,
                  isUser ? styles.rowUser : isSystem ? styles.rowSystem : styles.rowAssistant,
                ].join(' ')}
              >
                {!isUser && !isSystem && (
                  <div className={styles.avatar} aria-hidden="true">
                    {msg.avatar ? (
                      <img src={msg.avatar} alt={label} className={styles.avatarImg} />
                    ) : (
                      <span className={styles.avatarIcon}>✦</span>
                    )}
                  </div>
                )}

                <div className={styles.bubble}>
                  {!isUser && !isSystem && (
                    <span className={styles.roleName}>{label}</span>
                  )}

                  <div
                    className={[
                      styles.content,
                      isUser ? styles.contentUser : isSystem ? styles.contentSystem : styles.contentAssistant,
                      msg.isStreaming ? styles.streaming : '',
                    ].filter(Boolean).join(' ')}
                  >
                    {msg.content}
                    {msg.isStreaming && <span className={styles.cursor} aria-hidden="true" />}
                  </div>

                  <div className={styles.meta}>
                    {msg.timestamp && (
                      <time className={styles.time} dateTime={String(msg.timestamp)}>
                        {formatTime(msg.timestamp)}
                      </time>
                    )}
                    {renderActions && (
                      <div className={styles.actions}>{renderActions(msg)}</div>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className={styles.avatar} aria-hidden="true">
                    {msg.avatar ? (
                      <img src={msg.avatar} alt={userLabel} className={styles.avatarImg} />
                    ) : (
                      <span className={styles.avatarIconUser}>
                        {userLabel.slice(0, 1).toUpperCase()}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className={[styles.row, styles.rowAssistant].join(' ')}>
              <div className={styles.avatar} aria-hidden="true">
                <span className={styles.avatarIcon}>✦</span>
              </div>
              <div className={styles.bubble}>
                <span className={styles.roleName}>{assistantLabel}</span>
                <div className={[styles.content, styles.contentAssistant].join(' ')}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
