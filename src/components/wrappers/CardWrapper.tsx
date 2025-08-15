import React, { ReactNode } from 'react';
import styles from './CardWrapper.module.css';
import { CardBackground } from '../../types/CardBackground';
import { BorderAccent } from '../../types/BorderAccent';

interface CardWrapperProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'minimal';
  size?: 'small' | 'medium' | 'large';
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
  background?: CardBackground;
  borderAccent?: BorderAccent;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  hoverable = true,
  className = '',
  onClick,
  background,
  borderAccent
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

  // Функция для генерации стиля линии
  const getBorderStyle = (): React.CSSProperties | undefined => {
    if (!borderAccent) return undefined;
    
    if (typeof borderAccent === 'string') {
      switch (borderAccent) {
        case 'yellow':
          return { background: '#fbbf24' };
        case 'red':
          return { background: '#ef4444' };
        case 'green':
          return { background: '#10b981' };
        case 'blue':
          return { background: '#3b82f6' };
        case 'purple':
          return { background: '#8b5cf6' };
        case 'pink':
          return { background: '#ec4899' };
        case 'cyan':
          return { background: '#06b6d4' };
        case 'orange':
          return { background: '#f97316' };
        case 'white':
          return { background: '#ffffff' };
        case 'gray':
          return { background: '#6b7280' };
        case 'black':
          return { background: '#1f2937' };
        default:
          return { background: borderAccent };
      }
    }
    
    if (typeof borderAccent === 'object') {
      const { from, to } = borderAccent;
      // Проверяем, есть ли via в объекте
      if ('via' in borderAccent && borderAccent.via) {
        return { background: `linear-gradient(180deg, ${from} 0%, ${borderAccent.via} 50%, ${to} 100%)` };
      }
      return { background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)` };
    }
    
    return undefined;
  };

  return (
    <div className={cardClasses} onClick={onClick}>
      {borderAccent && (
        <div 
          className={styles.borderAccent}
          style={getBorderStyle()}
        />
      )}
      {children}
    </div>
  );
};

export default CardWrapper;