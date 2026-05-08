import React from 'react';
import styles from './Navbar.module.css';

export interface NavbarProps {
  logo?: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  sticky?: boolean;
  bordered?: boolean;
  className?: string;
}

export default function Navbar({ logo, leftContent, rightContent, sticky = false, bordered = true, className }: NavbarProps) {
  return (
    <header className={[styles.navbar, sticky ? styles.sticky : '', bordered ? styles.bordered : '', className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.inner}>
        <div className={styles.left}>
          {logo && <div className={styles.logo}>{logo}</div>}
          {leftContent && <div className={styles.leftContent}>{leftContent}</div>}
        </div>
        {rightContent && <div className={styles.right}>{rightContent}</div>}
      </div>
    </header>
  );
}