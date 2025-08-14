import React from 'react';
import styles from './ImageCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';
import cn from "classnames";

interface ImageCardProps {
  src: string;
  alt: string;
  maxHeight?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  animationType?: AnimationType;
  animationIndex?: number;
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
  className?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ 
  src,
  alt,
  maxHeight = '400px',
  objectFit = 'cover',
  animationType = 'none',
  animationIndex = 0,
  animationDelay = 300,
  isActive = true,
  isVisited = false,
  className
}) => {
  const { animationClasses } = useCardAnimation({
    isActive,
    isVisited,
    animationType,
    delay: animationDelay,
    index: animationIndex
  });

  return (
    <div className={cn(styles.imageCard, animationClasses)}>
      <img
        alt={alt}
        src={src}
        className={cn(styles.image, className)}
        style={{ maxHeight, objectFit }}
      />
    </div>
  );
};

export default ImageCard;