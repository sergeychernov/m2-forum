import React, { useEffect, useState } from 'react';
import CardWrapper from '../wrappers/CardWrapper';
import styles from './ConclusionCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';

interface ConclusionCardProps {
  text: string;
  hasChart?: boolean;
  index: number;
  chart?: React.ReactNode;
  animationType?: AnimationType;
  animationIndex?: number;
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
}

const ConclusionCard: React.FC<ConclusionCardProps> = ({ 
  text, 
  hasChart = false, 
  index, 
  chart,
  animationType = 'none',
  animationIndex = 0,
  animationDelay = 300,
  isActive = true,
  isVisited = false
}) => {
  const [showExplosion, setShowExplosion] = useState(false);
  const [showLightning, setShowLightning] = useState(false);
  
  const { shouldAnimate, animationClasses } = useCardAnimation({
    isActive,
    isVisited,
    animationType,
    delay: animationDelay,
    index: animationIndex
  });

  useEffect(() => {
    if (shouldAnimate && animationType === 'explosion') {
      const lightningTimer = setTimeout(() => {
        setShowLightning(true);
      }, 100);

      const explosionTimer = setTimeout(() => {
        setShowExplosion(true);
      }, 200);

      const cleanupTimer = setTimeout(() => {
        setShowLightning(false);
        setShowExplosion(false);
      }, 2000);

      return () => {
        clearTimeout(lightningTimer);
        clearTimeout(explosionTimer);
        clearTimeout(cleanupTimer);
      };
    }
  }, [shouldAnimate, animationType]);

  const isFirstCard = index === 0;
  const isLastCard = index % 2 === 1; // Предполагаем четное количество карточек

  return (
    <CardWrapper 
      variant="outlined" 
      hoverable={true}
      className={`${styles.conclusionContent} ${animationClasses} ${
        isFirstCard ? styles.firstCard : ''
      } ${isLastCard ? styles.lastCard : ''}`}
    >
      <div className={`${styles.conclusionBorderLeft} ${styles.blue}`}></div>
      
      {/* Специальные эффекты для explosion анимации */}
      {showLightning && (
        <div className={styles.lightningContainer}>
          <div className={styles.lightning}></div>
        </div>
      )}
      
      {showExplosion && (
        <div className={styles.explosionContainer}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.explosionParticle} style={{
              '--particle-angle': `${i * 45}deg`
            } as React.CSSProperties}></div>
          ))}
        </div>
      )}
      
      <div className={styles.textContent}>
        <p>{text}</p>
        {hasChart && chart && (
          <div className={styles.chartContainer}>
            {chart}
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

export default ConclusionCard;