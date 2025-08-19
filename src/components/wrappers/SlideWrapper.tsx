import React, { ReactNode, useRef, useCallback, forwardRef, useImperativeHandle, useState } from 'react';
import styles from './SlideWrapper.module.css';
import { ImageCardRef } from '../cards/ImageCard';

interface SlideWrapperProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
    footerNote?: string;
    className?: string;
    sign?: string;
    cardVariant?: 'default' | 'elevated' | 'outlined' | 'minimal';
    onRegisterSlideActions?: (actions: { onNextAction: () => boolean }) => void;
}

interface ImageCardProps {
    enableFullscreen?: boolean;
    [key: string]: any;
}

const SlideWrapper = forwardRef<{ onNextAction: () => boolean }, SlideWrapperProps>(({ 
    title,
    subtitle,
    children,
    footerNote,
    className = '',
    sign,
    cardVariant = 'default',
    onRegisterSlideActions
}, ref) => {
    const [actionStep, setActionStep] = useState(0);
    const imageCardRefs = useRef<(ImageCardRef | null)[]>([]);
    const totalActions = useRef(0);

    const containerClasses = [
        styles.slideContent,
        className,
    ].filter(Boolean).join(' ');

    // Функция для обработки последовательных действий
    const handleNextAction = useCallback((): boolean => {
        if (actionStep < totalActions.current) {
            const imageIndex = Math.floor(actionStep / 2);
            const isOpenAction = actionStep % 2 === 0;
            
            const imageCard = imageCardRefs.current[imageIndex];
            if (imageCard) {
                if (isOpenAction) {
                    imageCard.openFullscreen();
                } else {
                    imageCard.closeFullscreen();
                }
                setActionStep(prev => prev + 1);
                return true; // Действие обработано
            }
        }
        // Больше действий нет, переходим к следующему слайду
        return false;
    }, [actionStep]);

    // Предоставляем методы через ref
    useImperativeHandle(ref, () => ({
        onNextAction: handleNextAction
    }));

    // Сброс состояния при деактивации
    React.useEffect(() => {
        setActionStep(0);
    }, []);

    // Рекурсивная функция для поиска ImageCard в дереве компонентов
    const findImageCards = (element: React.ReactElement, refs: (ImageCardRef | null)[]): React.ReactElement => {
        const childType = element.type as any;
        
        // Если это ImageCard с enableFullscreen
        if (childType && (childType.displayName === 'ImageCard' || childType.name === 'ImageCard')) {
            const props = element.props as ImageCardProps;
            
            if (props.enableFullscreen) {
                const refIndex = refs.length;
                refs.push(null); // Заполним позже через callback ref
                
                // Создаем новые props с callback ref
                const newProps = {
                    ...props,
                    key: `image-card-${refIndex}`
                };
                
                // Используем callback ref для установки ссылки
                const callbackRef = (node: ImageCardRef | null) => {
                    refs[refIndex] = node;
                    // Если у элемента уже был ref, вызываем его тоже
                    const originalRef = (element as any).ref;
                    if (typeof originalRef === 'function') {
                        originalRef(node);
                    } else if (originalRef && typeof originalRef === 'object') {
                        originalRef.current = node;
                    }
                };
                
                return React.cloneElement(element, {
                    ...newProps,
                    ref: callbackRef
                } as any);
            }
        }
        
        // Рекурсивно обрабатываем дочерние элементы
        if (React.isValidElement(element) && element.props) {
            const elementProps = element.props as any;
            if (elementProps.children) {
                const enhancedChildren = React.Children.map(elementProps.children, (child) => {
                    if (React.isValidElement(child)) {
                        return findImageCards(child, refs);
                    }
                    return child;
                });
                
                return React.cloneElement(element, {
                    ...elementProps,
                    children: enhancedChildren
                } as any);
            }
        }
        
        return element;
    };

    const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            const childType = child.type as any;
            
            // Обрабатываем CardsLayout
            if (childType && (childType.displayName === 'CardsLayout' || childType.name === 'CardsLayout')) {
                const childProps = child.props || {};
                const enhancedChild = React.cloneElement(child as any, {
                    ...childProps,
                    cardVariant
                });
                
                // Ищем ImageCard внутри CardsLayout
                return findImageCards(enhancedChild, imageCardRefs.current);
            }
            
            // Ищем ImageCard на верхнем уровне
            return findImageCards(child, imageCardRefs.current);
        }
        return child;
    });

    // Подсчитываем общее количество действий и регистрируем слайд
    React.useEffect(() => {
        const validRefs = imageCardRefs.current.filter(ref => ref !== null);
        const newTotalActions = validRefs.length * 2;
        totalActions.current = newTotalActions;
        
        // Регистрируем действия слайда только если есть действия
        if (onRegisterSlideActions && newTotalActions > 0) {
            onRegisterSlideActions({ onNextAction: handleNextAction });
        }
    }, []); // Убираем onRegisterSlideActions из зависимостей

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

    return (
        <div className={containerClasses}>
            {content}
        </div>
    );
});

export default SlideWrapper;