import React from 'react';
import CardWrapper from '../wrappers/CardWrapper';
import styles from './FeaturesListCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';
import cn from 'classnames';

interface Feature {
  icon: string;
  text: string;
}

interface FeaturesListCardProps {
  title: string;
  category?: string;
  features: Feature[];
  note?: {
    type: 'note' | 'warning' | 'advantage';
    text: string;
  };
  animationType?: AnimationType;
  animationIndex?: number;
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
  cardVariant?: 'default' | 'elevated' | 'outlined' | 'minimal';
  background?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'pink' | 'cyan';
}

const FeaturesListCard: React.FC<FeaturesListCardProps> = ({ 
  title, 
  category, 
  features, 
  note,
  animationType = 'none',
  animationIndex = 0,
  animationDelay = 300,
  isActive = true,
  isVisited = false,
  cardVariant = 'default',
  background = 'default'
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
      variant={cardVariant} 
      background={background}
      hoverable={true}
      className={cn(styles.featuresContent, animationClasses)}
    >
      <div className={styles.featuresHeader}>
        <h3>{title}</h3>
        {category && <p className={styles.featuresCategory}>{category}</p>}
      </div>
      
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <span className={styles.featureIcon}>{feature.icon}</span>
            <span className={styles.featureText}>{feature.text}</span>
          </div>
        ))}
      </div>
      
      {note && (
        <div className={`${styles.note} ${styles[note.type]}`}>
          {note.text}
        </div>
      )}
    </CardWrapper>
  );
};

export default FeaturesListCard;