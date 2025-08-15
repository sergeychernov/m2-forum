import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import CardWrapper from '../wrappers/CardWrapper';
import styles from './MarkdownCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';
import { CardBackground } from '../../types/CardBackground';
import { BorderAccent } from '../../types/BorderAccent';

interface MarkdownCardProps {
  content: string;
  index: number;
  chart?: React.ReactNode;
  animationType?: AnimationType;
  animationIndex?: number;
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
  background?: CardBackground;
  borderAccent?: BorderAccent;
}

const MarkdownCard: React.FC<MarkdownCardProps> = ({ 
  content, 
  index, 
  chart,
  animationType = 'none',
  animationIndex = 0,
  animationDelay = 300,
  isActive = true,
  isVisited = false,
  background,
  borderAccent
}) => {
  const [showExplosion, setShowExplosion] = useState(false);
  const [showLightning, setShowLightning] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  
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
  const isLastCard = index % 2 === 1;

  // Кастомный компонент для изображений
  const ImageComponent = ({ src, alt, ...props }: any) => {
    const handleImageClick = () => {
      setFullscreenImage(src);
    };

    return (
      <img
        src={src}
        alt={alt}
        className={styles.markdownImage}
        onClick={handleImageClick}
        {...props}
      />
    );
  };

  const handleFullscreenClose = () => {
    setFullscreenImage(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleFullscreenClose();
    }
  };

  return (
    <>
      <CardWrapper 
        variant="outlined" 
        hoverable={true}
        background={background}
        borderAccent={borderAccent}
        className={`${styles.markdownContent} ${animationClasses} ${
          isFirstCard ? styles.firstCard : ''
        } ${isLastCard ? styles.lastCard : ''}`}
      >
        {/* Убрать старую линию */}
        {/* <div className={`${styles.markdownBorderLeft} ${styles.blue}`}></div> */}
        
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
          <div className={styles.markdownRenderer}>
            <ReactMarkdown
              components={{
                img: ImageComponent
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
          {chart && (
            <div className={styles.chartContainer}>
              {chart}
            </div>
          )}
        </div>
      </CardWrapper>
      
      {/* Полноэкранный режим для изображений */}
      {fullscreenImage && (
        <div 
          className={styles.fullscreenOverlay}
          onClick={handleBackdropClick}
        >
          <div className={styles.fullscreenContainer}>
            <button 
              className={styles.closeButton}
              onClick={handleFullscreenClose}
              aria-label="Закрыть полноэкранный режим"
            >
              ×
            </button>
            <img
              alt="Полноэкранное изображение"
              src={fullscreenImage}
              className={styles.fullscreenImage}
              onClick={handleFullscreenClose}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MarkdownCard;