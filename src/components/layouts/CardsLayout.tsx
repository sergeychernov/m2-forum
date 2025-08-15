import React, { ReactNode, cloneElement, isValidElement } from 'react';
import styles from './CardsLayout.module.css';
import { AnimationType } from '../../hooks/useCardAnimation';

type SpacingSize = 'none' | 'small' | 'medium' | 'large';
type ColsCount = '1' | '2' | '3' | '4' | 'auto';
type ContentWidth = 'narrow' | 'medium' | 'wide' | 'full';
type ContentAlign = 'top' | 'center' | 'bottom';

// Объединенный тип для всех возможных соотношений
type ColsRatio = 
  | '1'                                                           // для 1 колонки
  | '1:1' | '2:3' | '3:2' | '3:5' | '5:3'                        // для 2 колонок
  | '1:1:1' | '1:2:1' | '2:1:1' | '1:1:2' | '2:3:2' | '1:3:1'    // для 3 колонок
  | '1:1:1:1' | '1:2:1:1' | '1:1:2:1' | '1:1:1:2' | '2:1:1:1' | '1:2:2:1' | '2:1:1:2'; // для 4 колонок

interface CardsLayoutProps {
  children: ReactNode;
  cols?: ColsCount;
  colsRatio?: ColsRatio;
  horizontalGap?: SpacingSize;
  verticalGap?: SpacingSize;
  contentWidth?: ContentWidth;
  contentAlign?: ContentAlign;
  className?: string;
  animationType?: AnimationType;
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
  cardVariant?: 'default' | 'elevated' | 'outlined' | 'minimal';
}

const CardsLayout: React.FC<CardsLayoutProps> = ({
  children,
  cols = 'auto',
  colsRatio,
  horizontalGap = 'medium',
  verticalGap = 'medium',
  contentWidth = 'wide',
  contentAlign = 'top',
  className = '',
  animationType = 'none',
  animationDelay = 300,
  isActive = true,
  isVisited = false,
  cardVariant = 'default'
}) => {
  // Определяем соотношение по умолчанию для каждого типа колонок
  const getDefaultRatio = (colsCount: ColsCount): string => {
    switch (colsCount) {
      case '1': return '1';
      case '2': return '1:1';
      case '3': return '1:1:1';
      case '4': return '1:1:1:1';
      default: return '';
    }
  };

  // Валидация соотношения для текущего количества колонок
  const validateRatio = (ratio: string, colsCount: ColsCount): boolean => {
    const parts = ratio.split(':');
    switch (colsCount) {
      case '1': return parts.length === 1;
      case '2': return parts.length === 2;
      case '3': return parts.length === 3;
      case '4': return parts.length === 4;
      default: return false;
    }
  };

  const currentRatio = colsRatio && validateRatio(colsRatio, cols) 
    ? colsRatio 
    : getDefaultRatio(cols);
    
  const ratioClass = cols !== 'auto' && currentRatio ? `ratio-${cols}-${currentRatio.replace(/:/g, '-')}` : '';

  const containerClasses = [
    styles.slideContent,
    styles[`cols-${cols}`],
    ratioClass ? styles[ratioClass] : '',
    styles[`h-gap-${horizontalGap}`],
    styles[`v-gap-${verticalGap}`],
    styles[`content-${contentWidth}`],
    styles[`align-${contentAlign}`],
    className
  ].filter(Boolean).join(' ');

  const animatedChildren = React.Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      const childProps = child.props && typeof child.props === 'object' ? child.props : {};
      
      return cloneElement(child, {
        ...childProps,
        animationType,
        animationIndex: index,
        animationDelay,
        isActive,
        isVisited,
        cardVariant
      } as any);
    }
    return child;
  });

  return (
    <div className={containerClasses}>
      <div className={styles.cardsContainer}>
        {animatedChildren}
      </div>
    </div>
  );
};

export default CardsLayout;