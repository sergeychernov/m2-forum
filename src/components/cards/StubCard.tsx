import React from 'react';
import styles from './StubCard.module.css';
import { AnimationType } from '../../hooks/useCardAnimation';
import { CardBackground } from '../../types/CardBackground';

interface StubCardProps {
  // Пропсы для совместимости с CardsLayout
  animationType?: AnimationType;
  animationIndex?: number;
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
  background?: CardBackground;
  cardVariant?: 'default' | 'elevated' | 'outlined' | 'minimal';
  
  // Опциональные пропсы для кастомизации
  visible?: boolean; // показывать ли границы (для отладки)
  minHeight?: string; // минимальная высота
}

const StubCard: React.FC<StubCardProps> = ({
  visible = false,
  minHeight = '200px',
  // Остальные пропсы игнорируются, но принимаются для совместимости
  ...props
}) => {
  return (
    <div 
      className={`${styles.stubCard} ${visible ? styles.visible : ''}`}
      style={{ minHeight }}
    >
      {visible && (
        <div className={styles.debugText}>
          Stub Card
        </div>
      )}
    </div>
  );
};

export default StubCard;