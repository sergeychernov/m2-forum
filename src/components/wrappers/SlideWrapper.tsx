import React, { ReactNode } from 'react';
import styles from './SlideWrapper.module.css';

interface SlideWrapperProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
    footerNote?: string;
    className?: string;
    scrollable?: boolean;
    sign?: string;
    cardVariant?: 'default' | 'elevated' | 'outlined' | 'minimal';
}

const SlideWrapper: React.FC<SlideWrapperProps> = ({
    title,
    subtitle,
    children,
    footerNote,
    className = '',
    scrollable = false,
    sign,
    cardVariant = 'default',
}) => {

    const containerClasses = [
        styles.slideContent,
        scrollable ? styles.scrollableSlide : '',
        className,
    ].filter(Boolean).join(' ');

    const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            const childType = child.type as any;
            if (childType && (childType.displayName === 'CardsLayout' || childType.name === 'CardsLayout')) {
                const childProps = child.props || {};
                return React.cloneElement(child as any, {
                    ...childProps,
                    cardVariant
                });
            }
        }
        return child;
    });

    const content = (
        <>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            {enhancedChildren}
            {footerNote && (
                <div className={styles.footerNote}>
                    <p>{footerNote}</p>
                </div>
            )}
            {sign && (
                <div className={styles.speakerSign}>
                    {sign}
                </div>
            )}
        </>
    );

    if (scrollable) {
        return (
            <div className={`${containerClasses}`}>
                <div className={styles.scrollContainer}>
                    {content}
                </div>
            </div>
        );
    }

    return (
        <div className={containerClasses}>
            {content}
        </div>
    );
};

export default SlideWrapper;