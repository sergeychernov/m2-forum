import React from 'react';
import styles from './PointsCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';
import cn from "classnames";

interface PointsCardProps {
    description: string;
    points: string[];
    size?: 'small' | 'medium' | 'large';
    bulletColor?: string;
    animationType?: AnimationType;
    animationIndex?: number;
    animationDelay?: number;
    isActive?: boolean;
    isVisited?: boolean;
}

const PointsCard: React.FC<PointsCardProps> = ({
                                                   description,
                                                   points,
                                                   size = 'small',
                                                   bulletColor = '#1890ff',
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
        <div className={cn(styles.pointsCard, styles[size], animationClasses)}>
            <p className={styles.description}>{description}</p>
            <div className={styles.pointsList}>
                {points.map((point, index) => (
                    <div key={index} className={styles.pointItem}>
            <span
                className={styles.bullet}
                style={{ color: bulletColor }}
            >
              •
            </span>
                        <span className={styles.pointText}>{point}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PointsCard;