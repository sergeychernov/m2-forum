import React from 'react';
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
    <div className={`${styles.featuresGroup} ${animationClasses}`}>
      <div className={styles.featuresHeader}>
        <h3>{title}</h3>
        <p className={styles.featuresCategory}>{category}</p>
      </div>
      <div className={styles.featuresContent}>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <span className={styles.featureIcon}>{feature.icon}</span>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
        {note && (
          <div className={cn(styles.features, styles[`features-${note.type}`])}>
            {note.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturesListCard;