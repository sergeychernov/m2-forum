// файл: MarkdownCard.tsx (компонент MarkdownCard)
import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import ReactMarkdown from 'react-markdown';
import CardWrapper from '../wrappers/CardWrapper';
import styles from './MarkdownCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';
import { CardBackground } from '../../types/CardBackground';
import { BorderAccent } from '../../types/BorderAccent';
import { InteractiveRef } from '../../types/Interactive';

interface MarkdownCardProps {
  content: string;
  chart?: React.ReactNode;
  animationType?: AnimationType;
  animationIndex?: number;
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
  background?: CardBackground;
  borderAccent?: BorderAccent;
  // Новый проп: включает управление fullscreen через nextAction
  enableFullscreen?: boolean;
  // Унифицированный флаг интерактивности
  interactive?: boolean;
}

const MarkdownCard = forwardRef<InteractiveRef, MarkdownCardProps>(({ 
  content, 
  chart,
  animationType = 'none',
  animationIndex = 0,
  animationDelay = 300,
  isActive = true,
  isVisited = false,
  background,
  borderAccent,
  enableFullscreen = false,
  interactive
}, ref) => {
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

  // Будем сохранять первую встреченную картинку, чтобы уметь открывать её по nextAction
  const firstImageRef = useRef<string | null>(null);
  // Сбрасываем перед рендером markdown (на каждой отрисовке)
  firstImageRef.current = null;

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

  // Ленивая загрузка — включаем разово при первом появлении активного слайда
  const [shouldLoadImages, setShouldLoadImages] = useState(false);
  useEffect(() => {
    if (isActive && !shouldLoadImages) {
      setShouldLoadImages(true);
    }
  }, [isActive, shouldLoadImages]);

  // Единый флаг интерактивности (совместимость с enableFullscreen)
  const isInteractive = (interactive ?? enableFullscreen) === true;

  // Кастомный компонент для изображений: используем shouldLoadImages вместо isActive
  const ImageComponent = ({ src, alt, ...props }: any) => {
    const handleImageClick = () => {
      if (!isInteractive) return;
      setFullscreenImage(src);
    };

    if (!shouldLoadImages) {
      return (
        <div
          className={styles.markdownImage}
          style={{ background: 'var(--color-background-secondary)' }}
        />
      );
    }

    // Запоминаем первую картинку
    if (typeof src === 'string' && !firstImageRef.current) {
      firstImageRef.current = src;
    }

    return (
      <img
        key={src} // Добавить стабильный ключ
        src={src}
        alt={alt}
        className={styles.markdownImage}
        onClick={handleImageClick}
        loading="lazy"
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

  // Императивные методы для интеграции с nextAction
  useImperativeHandle(ref, () => ({
    openFullscreen: () => {
      if (!isInteractive) return;
      const src = firstImageRef.current;
      if (src) {
        setFullscreenImage(src);
      }
    },
    closeFullscreen: () => {
      setFullscreenImage(null);
    },
    isFullscreenOpen: () => !!fullscreenImage
  }), [isInteractive, fullscreenImage]);

  return (
    <>
      <CardWrapper 
        variant="outlined" 
        hoverable={true}
        background={background}
        borderAccent={borderAccent}
        className={`${styles.markdownContent} ${animationClasses}`}
      >
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
});

MarkdownCard.displayName = 'MarkdownCard';

// Статический метод: компонент сам решает, интерактивный он или нет
// Правило: интерактивна, если enableFullscreen === true И в контенте есть изображение
(MarkdownCard as any).isInteractive = (props: { content?: string; enableFullscreen?: boolean }) => {
  if (props?.enableFullscreen !== true) return false;
  const text = props?.content || '';
  const hasMarkdownImage = /!\[[^\]]*\]\([^)]+\)/.test(text); // ![alt](src)
  const hasHtmlImage = /<img\s[^>]*src=["'][^"']+["'][^>]*>/i.test(text); // <img src="...">
  return hasMarkdownImage || hasHtmlImage;
};

export default MarkdownCard;