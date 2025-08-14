import React from 'react';
import styles from './ToolCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';

interface Feature {
  icon: string;
  text: string;
}

interface ToolCardProps {
  title: string;
  category: string;
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

const ToolCard: React.FC<ToolCardProps> = ({ 
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
    <div className={`${styles.toolGroup} ${animationClasses}`}>
      <div className={styles.toolHeader}>
        <h3>{title}</h3>
        <p className={styles.toolCategory}>{category}</p>
      </div>
      <div className={styles.toolFeatures}>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <span className={styles.featureIcon}>{feature.icon}</span>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
        {note && (
          <div className={note.type === 'note' ? styles.toolNote : styles.toolWarning}>
            {note.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolCard;