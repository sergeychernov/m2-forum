import React from 'react';
import CardWrapper from '../wrappers/CardWrapper';
import styles from './PointsCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';
import { CardBackground } from '../../types/CardBackground';
import cn from "classnames";

interface PointsCardProps {
    description: string;
    points: string[];
    size?: 'small' | 'medium' | 'large';
    animationType?: AnimationType;
    animationIndex?: number;
    animationDelay?: number;
    isActive?: boolean;
    isVisited?: boolean;
    background?: CardBackground;
}

const PointsCard: React.FC<PointsCardProps> = ({
    description,
    points,
    size = 'small',
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
            variant="default" 
            hoverable={true}
            background={background}
            className={cn(styles.pointsContent, styles[size], animationClasses)}
        >
            <p className={styles.description}>{description}</p>
            <div className={styles.pointsList}>
                {points.map((point, index) => (
                    <div key={index} className={styles.pointItem}>
                        <span className={styles.bullet}>
                            •
                        </span>
                        <span className={styles.pointText}>{point}</span>
                    </div>
                ))}
            </div>
        </CardWrapper>
    );
};

export default PointsCard;