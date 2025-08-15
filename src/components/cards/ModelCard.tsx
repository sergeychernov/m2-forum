import React from 'react';
import CardWrapper from '../wrappers/CardWrapper';
import styles from './ModelCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';
import { CardBackground } from '../../types/CardBackground';
import cn from "classnames";

interface ModelCardProps {
  icon: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
  description: string;
  animationType?: AnimationType;
  animationIndex?: number;
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
  background?: CardBackground;
}

const ModelCard: React.FC<ModelCardProps> = ({ 
  icon, 
  name,
  size = 'small',
  description,
  animationType = 'none',
  animationIndex = 0,
  animationDelay = 300,
  isActive = true,
  isVisited = false,
  background
}) => {
  const { animationClasses } = useCardAnimation({
    isActive,
    isVisited,
    animationType,
    delay: animationDelay,
    index: animationIndex
  });

  return (
    <CardWrapper 
      size={size} 
      variant="default" 
      hoverable={true}
      background={background}
      className={cn(styles.modelCardContent, animationClasses)}
    >
      <div className={styles.modelIcon}>{icon}</div>
      <h3>{name}</h3>
      <p>{description}</p>
    </CardWrapper>
  );
};

export default ModelCard;