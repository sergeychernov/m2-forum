import React, { ReactNode } from 'react';
import styles from './CardWrapper.module.css';
import { CardBackground } from '../../types/CardBackground';

interface CardWrapperProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'minimal';
  size?: 'small' | 'medium' | 'large';
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
  background?: CardBackground;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  hoverable = true,
  className = '',
  onClick,
  background
}) => {
  const cardClasses = [
    styles.cardWrapper,
    styles[variant],
    styles[size],
    background ? styles[`bg${background.charAt(0).toUpperCase() + background.slice(1)}`] : '',
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