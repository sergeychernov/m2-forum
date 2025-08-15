import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import CardWrapper from '../wrappers/CardWrapper';
import styles from './QRCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';
import { CardBackground } from '../../types/CardBackground';
import { BorderAccent } from '../../types/BorderAccent';

interface QRCardProps {
  title: string;
  description?: string;
  url: string;
  icon: string;
  animationType?: AnimationType;
  animationIndex?: number;
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
  cardVariant?: 'default' | 'elevated' | 'outlined' | 'minimal';
  background?: CardBackground;
  borderAccent?: BorderAccent;
}

const QRCard: React.FC<QRCardProps> = ({
  title,
  description,
  url,
  icon,
  animationType = 'none',
  animationIndex = 0,
  animationDelay = 300,
  isActive = true,
  isVisited = false,
  cardVariant = 'default',
  background,
  borderAccent
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const expandedCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const { animationClasses } = useCardAnimation({
    isActive,
    isVisited,
    animationType,
    delay: animationDelay,
    index: animationIndex
  });

  useEffect(() => {
    // Обычный QR код
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 120,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    }
  }, [url]);

  useEffect(() => {
    // Увеличенный QR код - генерируется только когда нужен
    if (expandedCanvasRef.current && isExpanded) {
      QRCode.toCanvas(expandedCanvasRef.current, url, {
        width: 250,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    }
  }, [url, isExpanded]);

  const handleQRClick = async () => {
    setIsExpanded(!isExpanded);
    
    // Генерируем увеличенный QR код при открытии
    if (!isExpanded && expandedCanvasRef.current) {
      await QRCode.toCanvas(expandedCanvasRef.current, url, {
        width: 250,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    }
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <CardWrapper 
        variant={cardVariant} 
        size="medium"
        hoverable={true}
        background={background}
        className={`${styles.qrContent} ${animationClasses}`}
      >
        <div className={styles.qrCodeWrapper}>
          <canvas 
            ref={canvasRef} 
            className={styles.qrCode} 
            onClick={handleQRClick}
            style={{
              cursor: 'pointer',
              opacity: isExpanded ? 0 : 1,
              transition: 'opacity 0.3s ease'
            }}
          />
        </div>
        
        <div className={styles.qrInfo} style={{
          opacity: isExpanded ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}>
          <h3>{icon} {title}</h3>
          {description && <p className={styles.qrDescription}>{description}</p>}
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.qrLink}
          >
            {url}
          </a>
        </div>
      </CardWrapper>
      
      {/* Увеличенный QR код поверх всего содержимого */}
      {isExpanded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-background-secondary)',
          zIndex: 10,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            background: 'white',
            padding: 'var(--space-16)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
          }}>
            <canvas 
              ref={expandedCanvasRef} 
              onClick={handleQRClick}
              style={{
                cursor: 'pointer',
                display: 'block',
                borderRadius: 'var(--radius-sm)'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCard;