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
}

const SlideWrapper: React.FC<SlideWrapperProps> = ({
                                                     title,
                                                     subtitle,
                                                     children,
                                                     footerNote,
                                                     className = '',
                                                     scrollable = false,
                                                     sign,
                                                 }) => {

    const containerClasses = [
        styles.slideContent,
        scrollable ? styles.scrollableSlide : '',
        className,
    ].filter(Boolean).join(' ');

    const content = (
        <>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            {children}
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
                <h2 className={styles.title}>{title}</h2>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                <div className={styles.scrollableWrapper}>
                    <div className={styles.scrollableContent}>
                        {children}
                        {footerNote && (
                            <div className={styles.footerNote}>
                                <p>{footerNote}</p>
                            </div>
                        )}
                    </div>
                </div>
                {sign && (
                    <div className={styles.speakerSign}>
                        {sign}
                    </div>
                )}
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