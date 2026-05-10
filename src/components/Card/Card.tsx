import React from 'react';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  bordered?: boolean;
}
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode; }
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode; }
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode; }

function CardHeader({ children, className, ...rest }: CardHeaderProps) {
  return <div className={[styles.header, className ?? ''].filter(Boolean).join(' ')} {...rest}>{children}</div>;
}
function CardBody({ children, className, ...rest }: CardBodyProps) {
  return <div className={[styles.body, className ?? ''].filter(Boolean).join(' ')} {...rest}>{children}</div>;
}
function CardFooter({ children, className, ...rest }: CardFooterProps) {
  return <div className={[styles.footer, className ?? ''].filter(Boolean).join(' ')} {...rest}>{children}</div>;
}

function Card({ children, className, padding = 'md', hoverable = false, bordered = true, ...rest }: CardProps) {
  const cls = [styles.card, styles[`pad-${padding}`], hoverable ? styles.hoverable : '', bordered ? styles.bordered : '', className ?? ''].filter(Boolean).join(' ');
  return <div className={cls} {...rest}>{children}</div>;
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
