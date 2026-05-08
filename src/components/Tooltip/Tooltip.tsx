import React from 'react';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: TooltipPlacement;
  delay?: number;
}

export default function Tooltip({ content, children, placement = 'top', delay = 200 }: TooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => { timerRef.current = setTimeout(() => setVisible(true), delay); };
  const hide = () => { if (timerRef.current) clearTimeout(timerRef.current); setVisible(false); };

  return (
    <span className={styles.wrapper} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {visible && (
        <span className={[styles.tooltip, styles[placement]].join(' ')} role="tooltip">
          {content}
          <span className={styles.arrow} />
        </span>
      )}
    </span>
  );
}
