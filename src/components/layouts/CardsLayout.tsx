import React, { ReactNode, cloneElement, isValidElement } from 'react';
import styles from './CardsLayout.module.css';
import { AnimationType } from '../../hooks/useCardAnimation';

type SpacingSize = 'none' | 'small' | 'medium' | 'large';
type ColsCount = '1' | '2' | '3' | '4' | 'auto';
type ContentWidth = 'narrow' | 'medium' | 'wide' | 'full';

interface CardsLayoutProps {
  title: string;
  children: ReactNode;
  cols?: ColsCount;
  horizontalGap?: SpacingSize;
  verticalGap?: SpacingSize;
  contentWidth?: ContentWidth;
  footerNote?: string;
  className?: string;
  scrollable?: boolean;
  animationType?: AnimationType;
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
}

const CardsLayout: React.FC<CardsLayoutProps> = ({
  title,
  children,
  cols = 'auto',
  horizontalGap = 'medium',
  verticalGap = 'medium',
  contentWidth = 'wide',
  footerNote,
  className = '',
  scrollable = false,
  animationType = 'none',
  animationDelay = 300,
  isActive = true,
  isVisited = false
}) => {
  const containerClasses = [
    styles.slideContent,
    styles[`cols-${cols}`],
    styles[`h-gap-${horizontalGap}`],
    styles[`v-gap-${verticalGap}`],
    styles[`content-${contentWidth}`],
    scrollable ? styles.scrollableSlide : '',
    className
  ].filter(Boolean).join(' ');

  // Клонируем дочерние элементы и добавляем анимацию
  const animatedChildren = React.Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      // Проверяем, что props является объектом
      const childProps = child.props && typeof child.props === 'object' ? child.props : {};
      
      return cloneElement(child, {
        ...childProps,
        animationType,
        animationIndex: index,
        animationDelay,
        isActive,
        isVisited
      } as any);
    }
    return child;
  });

  const content = (
    <>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardsContainer}>
        {animatedChildren}
        {footerNote && (
          <div className={styles.footerNote}>
            <p>{footerNote}</p>
          </div>
        )}
      </div>
    </>
  );

  if (scrollable) {
    return (
      <div className={containerClasses}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.scrollableWrapper}>
          <div className={styles.scrollableContent}>
            <div className={styles.cardsContainer}>
              {animatedChildren}
              {footerNote && (
                <div className={styles.footerNote}>
                  <p>{footerNote}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {content}
    </div>
  );
};

export default CardsLayout;