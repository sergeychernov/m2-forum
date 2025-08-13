import React, { ReactNode } from 'react';
import styles from './ThreeCardsLayout.module.css';
import { AnimationType } from '../../hooks/useCardAnimation';
import cn from "classnames";

type SpacingSize = 'none' | 'small' | 'medium' | 'large';
type ContentWidth = 'narrow' | 'medium' | 'wide' | 'full';
type ContentAlign = 'top' | 'center' | 'bottom';

type ColsRatio =
    | '1x2:1' | '2x2:3' | '3x2:2' | '3x2:5' | '5x2:3' | '1:1x2' | '2:3x2' | '3:2x2' | '3:5x2' | '5:3x2';


interface AnimationProps {
    animationType?: AnimationType;
    animationIndex?: number;
    animationDelay?: number;
    isActive?: boolean;
    isVisited?: boolean;
}

interface CardsLayoutProps {
    children: ReactNode;
    colsRatio?: ColsRatio;
    horizontalGap?: SpacingSize;
    verticalGap?: SpacingSize;
    contentWidth?: ContentWidth;
    contentAlign?: ContentAlign;
    className?: string;
    animation?: AnimationProps;
}

const ThreeCardsLayout: React.FC<CardsLayoutProps> = ({
    children,
    colsRatio = '1:1',
    horizontalGap = 'medium',
    verticalGap = 'medium',
    contentWidth = 'wide',
    contentAlign = 'top',
    className = '',
    animation = {
        animationType: 'none',
        animationDelay: 300,
        isActive: true,
        isVisited: false
    },
}) => {
    const { animationType, animationDelay, isActive, isVisited } = animation;
    const parseLayout = (layoutString: string) => {
        return layoutString.split(':').map(part => {
            const hasVerticalSplit = part.includes('x2');
            const width = parseFloat(part.replace('x2', ''));
            return {
                widthFr: width || 1,
                isVerticalSplit: hasVerticalSplit
            };
        });
    };

    const generateGridStyles = (parsedLayout: ReturnType<typeof parseLayout>) => {
        const columns = parsedLayout.length;
        const rows = parsedLayout.some(col => col.isVerticalSplit) ? 2 : 1;

        const areas = [];
        for (let row = 0; row < rows; row++) {
            let rowAreas = [];
            for (let col = 0; col < columns; col++) {
                if (parsedLayout[col].isVerticalSplit) {
                    // Для вертикально разделенных колонок используем разные области для каждого ряда
                    rowAreas.push(`area-${col}-${row}`);
                } else {
                    // Для обычных колонок используем одну область на оба ряда
                    rowAreas.push(`area-${col}`);
                }
            }
            areas.push(`"${rowAreas.join(' ')}"`);
        }

        return {
            gridTemplateColumns: parsedLayout.map(col => `${col.widthFr}fr`).join(' '),
            gridTemplateRows: `repeat(${rows}, auto)`,
            gridTemplateAreas: areas.join(' ')
        };
    };

    const parsedLayout = parseLayout(colsRatio);
    const gridStyles = generateGridStyles(parsedLayout);

    const processedChildren = React.Children.map(children, (child, index) => {
        if (!React.isValidElement<AnimationProps>(child)) return null;

        return React.cloneElement<AnimationProps>(child, {
            ...child.props,
            animationType,
            animationIndex: index,
            animationDelay,
            isActive,
            isVisited
        });
    })?.filter(Boolean);

    if (!processedChildren || processedChildren.length === 0) {
        return null;
    }

    let childIndex = 0;

    const containerClasses = [
        styles.slideContent,
        styles[`h-gap-${horizontalGap}`],
        styles[`v-gap-${verticalGap}`],
        styles[`content-${contentWidth}`],
        styles[`align-${contentAlign}`],
        className,
    ].filter(Boolean).join(' ');

    const renderGridItems = () => {
        return parsedLayout.map((column, colIndex) => {
            if (column.isVerticalSplit) {
                return (
                    <React.Fragment key={colIndex}>
                        <div
                            style={{ gridArea: `area-${colIndex}-0` }}
                            className={styles.gridItem}
                        >
                            {processedChildren[childIndex++]}
                        </div>
                        <div
                            style={{ gridArea: `area-${colIndex}-1` }}
                            className={styles.gridItem}
                        >
                            {processedChildren[childIndex++]}
                        </div>
                    </React.Fragment>
                );
            } else {
                return (
                    <div
                        key={colIndex}
                        style={{
                            gridArea: `area-${colIndex}`,
                            height: '100%'
                        }}
                        className={cn(styles.gridItem, styles[`align-${contentAlign}`])}
                    >
                        {processedChildren[childIndex++]}
                    </div>
                );
            }
        });
    };

    return (
        <div className={containerClasses}>
            <div className={styles.cardsContainer} style={gridStyles}>
                {renderGridItems()}
            </div>
        </div>
    );
};

export default ThreeCardsLayout;