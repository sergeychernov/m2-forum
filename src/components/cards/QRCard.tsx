import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import CardWrapper from '../wrappers/CardWrapper';
import styles from './QRCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';

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
  cardVariant = 'default'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { animationClasses } = useCardAnimation({
    isActive,
    isVisited,
    animationType,
    delay: animationDelay,
    index: animationIndex
  });

  useEffect(() => {
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

  return (
    <CardWrapper 
      variant={cardVariant} 
      size="medium"
      hoverable={true}
      className={`${styles.qrContent} ${animationClasses}`}
    >
      <div className={styles.qrCodeWrapper}>
        <canvas ref={canvasRef} className={styles.qrCode} />
      </div>
      
      <div className={styles.qrInfo}>
        <h3>{icon} {title}</h3>
        {description && <p className={styles.qrDescription}>{description}</p>}
        <div className={styles.qrUrl}>{url}</div>
      </div>
    </CardWrapper>
  );
};

export default QRCard;