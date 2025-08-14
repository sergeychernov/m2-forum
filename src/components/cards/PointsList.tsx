import React from 'react';
import styles from './PointsList.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';

interface PointsListProps {
    items: string[];
    bulletColor?: string;
    gap?: string;
    animationType?: AnimationType;
    animationIndex?: number;
    animationDelay?: number;
    isActive?: boolean;
    isVisited?: boolean;
}

export const PointsList: React.FC<PointsListProps> = ({
    items,
    bulletColor = '#1890ff',
    gap = '16px',
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
        <div className={`${styles.list} ${animationClasses}`} style={{ gap }}>
            {items.map((item, index) => (
                <div key={index} className={styles.item}>
                    <span
                        className={styles.bullet}
                        style={{ color: bulletColor }}
                    >
                        •
                    </span>
                    <span className={styles.text}>{item}</span>
                </div>
            ))}
        </div>
    );
};

export default PointsList;