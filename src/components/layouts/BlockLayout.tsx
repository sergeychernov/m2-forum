import React, { ReactNode, cloneElement, isValidElement } from 'react';
import styles from './BlockLayout.module.css';

type SpacingSize = 'none' | 'small' | 'medium' | 'large';
type ContentWidth = 'narrow' | 'medium' | 'wide' | 'full';
type ContentAlign = 'top' | 'center' | 'bottom';
type LayoutType = 'grid' | 'flex-row' | 'flex-col' | 'mixed';
type AnimationType = 'none' | 'fade' | 'slide' | 'zoom';
type ColsCount = '1' | '2' | '3' | '4' | 'auto';

// Объединенный тип для всех возможных соотношений
type ColsRatio =
    | '1'                                                           // для 1 колонки
    | '1:1' | '2:3' | '3:2' | '3:5' | '5:3'                        // для 2 колонок
    | '1:1:1' | '1:2:1' | '2:1:1' | '1:1:2' | '2:3:2' | '1:3:1'    // для 3 колонок
    | '1:1:1:1' | '1:2:1:1' | '1:1:2:1' | '1:1:1:2' | '2:1:1:1' | '1:2:2:1' | '2:1:1:2'; // для 4 колонок

interface BlockLayoutProps {
    title?: string;
    subtitle?: string;
    children: ReactNode;
    layoutType?: LayoutType;
    cols?: ColsCount;               // Аналог cols из CardsLayout
    colsRatio?: ColsRatio;          // Аналог colsRatio из CardsLayout
    contentWidth?: ContentWidth;
    contentAlign?: ContentAlign;
    gap?: SpacingSize;
    className?: string;
    animationType?: AnimationType;
    animationDelay?: number;
    isActive?: boolean;
    isFullWidth?: boolean;          // Для отдельных элементов в mixed layout
}

const BlockLayout: React.FC<BlockLayoutProps> = ({
                                                     title,
                                                     subtitle,
                                                     children,
                                                     layoutType = 'grid',
                                                     cols = 'auto',
                                                     colsRatio,
                                                     contentWidth = 'wide',
                                                     contentAlign = 'top',
                                                     gap = 'medium',
                                                     className = '',
                                                     animationType = 'none',
                                                     animationDelay = 200,
                                                     isActive = true,
                                                 }) => {
    // Определяем соотношение по умолчанию для каждого типа колонок
    const getDefaultRatio = (colsCount: ColsCount): string => {
        switch (colsCount) {
            case '1': return '1';
            case '2': return '1:1';
            case '3': return '1:1:1';
            case '4': return '1:1:1:1';
            default: return '';
        }
    };

    // Валидация соотношения для текущего количества колонок
    const validateRatio = (ratio: string, colsCount: ColsCount): boolean => {
        const parts = ratio.split(':');
        switch (colsCount) {
            case '1': return parts.length === 1;
            case '2': return parts.length === 2;
            case '3': return parts.length === 3;
            case '4': return parts.length === 4;
            default: return false;
        }
    };

    const currentRatio = colsRatio && validateRatio(colsRatio, cols)
        ? colsRatio
        : getDefaultRatio(cols);

    const ratioClass = cols !== 'auto' && currentRatio ? `ratio-${cols}-${currentRatio.replace(/:/g, '-')}` : '';

    // Генерируем классы для контейнера
    const containerClasses = [
        styles.blockContainer,
        styles[`width-${contentWidth}`],
        styles[`align-${contentAlign}`],
        styles[`gap-${gap}`],
        className,
    ].filter(Boolean).join(' ');

    // Генерируем классы для внутреннего layout
    const layoutClasses = [
        styles.layoutWrapper,
        styles[`layout-${layoutType}`],
        styles[`cols-${cols}`],
        ratioClass ? styles[ratioClass] : '',
        styles[`align-${contentAlign}`],
        animationType !== 'none' && isActive ? styles[`animate-${animationType}`] : '',
    ].filter(Boolean).join(' ');

    // Обрабатываем children
    const processedChildren = React.Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        return (
            <div
                className={styles.blockItem}
                style={{
                    animationDelay: `${index * animationDelay}ms`,
                }}
            >
                {child}
            </div>
        );
    });

    return (
        <div className={containerClasses}>
            {title && <h2 className={styles.blockTitle}>{title}</h2>}
            {subtitle && <p className={styles.blockSubtitle}>{subtitle}</p>}

            <div className={layoutClasses}>
                {processedChildren}
            </div>
        </div>
    );
};

export default BlockLayout;