import React from 'react';
import CardWrapper from '../wrappers/CardWrapper';
import styles from './PointsCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';
import { CardBackground } from '../../types/CardBackground';
import cn from "classnames";
import { BorderAccent } from '../../types/BorderAccent';

type PointItem = string | { text: string; icon?: string };

interface PointsCardProps {
    description: string;
    points: PointItem[];
    size?: 'small' | 'medium' | 'large';
    animationType?: AnimationType;
    animationIndex?: number;
    animationDelay?: number;
    isActive?: boolean;
    isVisited?: boolean;
    background?: CardBackground;
    borderAccent?: BorderAccent;
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

    // Функция для обработки элемента списка
    const processPoint = (point: PointItem) => {
        if (typeof point === 'string') {
            // Пытаемся извлечь эмодзи из начала строки
            const emojiRegex = /^([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F018}-\u{1F270}]|[\u{238C}-\u{2454}]|[\u{20D0}-\u{20FF}])+\s*/u;
            const match = point.match(emojiRegex);
            
            if (match) {
                return {
                    icon: match[0].trim(),
                    text: point.replace(emojiRegex, '').trim()
                };
            }
            
            return {
                icon: null,
                text: point
            };
        }
        
        // Если это объект, используем его напрямую
        return {
            icon: point.icon || null,
            text: point.text
        };
    };

    return (
        <CardWrapper 
            variant="default" 
            hoverable={true}
            background={background}
            borderAccent={borderAccent}
            className={cn(styles.pointsContent, styles[size], animationClasses)}
        >
            <p className={styles.description}>{description}</p>
            <div className={styles.pointsList}>
                {points.map((point, index) => {
                    const { icon, text } = processPoint(point);
                    
                    return (
                        <div key={index} className={styles.pointItem}>
                            {icon ? (
                                <span className={styles.icon}>
                                    {icon}
                                </span>
                            ) : (
                                <span className={styles.bullet}>
                                    •
                                </span>
                            )}
                            <span className={styles.pointText}>{text}</span>
                        </div>
                    );
                })}
            </div>
        </CardWrapper>
    );
};

export default PointsCard;