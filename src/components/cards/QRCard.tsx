import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import styles from './QRCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';

interface QRCardProps {
  title: string;
  description: string;
  url: string;
  icon: string;
  animationType?: AnimationType;
  animationIndex?: number;
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
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
  isVisited = false
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
    <div className={`${styles.qrCard} ${animationClasses}`}>
      <div className={styles.qrCodeWrapper}>
        <canvas ref={canvasRef} className={styles.qrCode} />
      </div>
      
      <div className={styles.qrInfo}>
        <h3>{icon} {title}</h3>
        <p className={styles.qrDescription}>{description}</p>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.qrLink}
        >
          {url}
        </a>
      </div>
    </div>
  );
};

export default QRCard;