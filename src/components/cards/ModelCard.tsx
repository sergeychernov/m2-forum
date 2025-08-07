import React from 'react';
import styles from './ModelCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';

interface ModelCardProps {
  icon: string;
  name: string;
  description: string;
  animationType?: AnimationType;
  animationIndex?: number;
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
}

const ModelCard: React.FC<ModelCardProps> = ({ 
  icon, 
  name, 
  description,
  animationType = 'none',
  animationIndex = 0,
  animationDelay = 300,
  isActive = true,
  isVisited = false
}) => {
  const { animationClasses } = useCardAnimation({
    isActive,
    isVisited,
    animationType,
    delay: animationDelay,
    index: animationIndex
  });

  return (
    <div className={`${styles.modelCard} ${animationClasses}`}>
      <div className={styles.modelIcon}>{icon}</div>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ModelCard;