import React, { ReactNode } from 'react';
import styles from './CardWrapper.module.css';

interface CardWrapperProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'minimal';
  size?: 'small' | 'medium' | 'large';
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  hoverable = true,
  className = '',
  onClick
}) => {
  const cardClasses = [
    styles.cardWrapper,
    styles[variant],
    styles[size],
    hoverable ? styles.hoverable : '',
    onClick ? styles.clickable : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default CardWrapper;