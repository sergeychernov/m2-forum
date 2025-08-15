import React from 'react';
import CardWrapper from '../wrappers/CardWrapper';
import styles from './TaskCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';

interface TaskCardProps {
  title: string;
  description: string;
  tool: string;
  rating: 'conditional' | 'satisfactory' | 'excellent';
  icon: string;
  animationType?: AnimationType;
  animationIndex?: number;
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
  background?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'pink' | 'cyan';
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  tool,
  rating,
  icon,
  animationType = 'none',
  animationIndex = 0,
  animationDelay = 300,
  isActive = true,
  isVisited = false,
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
      variant="outlined" 
      hoverable={true}
      background={background}
      className={`${styles.taskContent} ${styles[rating]} ${animationClasses}`}
    >
      <div className={`${styles.taskBorderLeft} ${styles[`border${rating.charAt(0).toUpperCase() + rating.slice(1)}`]}`}></div>
      
      <div className={styles.taskBody}>
        <h3 className={styles.taskTitle}>{title}</h3>
        <p className={styles.taskDescription}>{description}</p>

        <div className={styles.taskFooter}>
          <span className={styles.taskTool}>{tool}</span>
          <span className={styles.taskIcon}>{icon}</span>
        </div>
      </div>
    </CardWrapper>
  );
};

export default TaskCard;