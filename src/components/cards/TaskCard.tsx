import React from 'react';
import CardWrapper from '../wrappers/CardWrapper';
import styles from './TaskCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';
import { CardBackground } from '../../types/CardBackground';
import { BorderAccent } from '../../types/BorderAccent';

interface TaskCardProps {
  title: string;
  description: string;
  tool: string;
  icon: string;
  animationType?: AnimationType;
  animationIndex?: number;
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
  background?: CardBackground;
  borderAccent?: BorderAccent;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  tool,
  icon,
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
      variant="outlined" 
      hoverable={true}
      background={background}
      borderAccent={borderAccent}
      className={`${styles.taskContent} ${animationClasses}`}
    >
      {/* Убрать старую линию */}
      {/* <div className={`${styles.taskBorderLeft} ${styles[`border${rating.charAt(0).toUpperCase() + rating.slice(1)}`]}`}></div> */}
      
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