import React from 'react';
import CardWrapper from '../wrappers/CardWrapper';
import styles from './IconCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';
import { CardBackground } from '../../types/CardBackground';
import cn from "classnames";
import { BorderAccent } from '../../types/BorderAccent';

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
  borderAccent?: BorderAccent;
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
  background,
  borderAccent
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
      borderAccent={borderAccent}
      className={cn(styles.modelCardContent, animationClasses)}
    >
      <div className={styles.modelIcon}>{icon}</div>
      <h3>{name}</h3>
      <p>{description}</p>
    </CardWrapper>
  );
};

export default ModelCard;