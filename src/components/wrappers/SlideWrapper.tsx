import React, { ReactNode, useRef, useCallback, forwardRef, useImperativeHandle, useState } from 'react';
import styles from './SlideWrapper.module.css';
import { InteractiveRef } from '../../types/Interactive';
import { useSlideInstance } from './SlideContext';

interface SlideWrapperProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
    footerNote?: string;
    className?: string;
    sign?: string;
    cardVariant?: 'default' | 'elevated' | 'outlined' | 'minimal';
    onRegisterSlideActions?: (actions: { onNextAction: () => boolean }) => void;
    onRegisterSlide?: (actions: { onNextAction: () => boolean }) => void; // Новое: регистрируем напрямую в Presentation
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
    className,
    sign,
    cardVariant,
    onRegisterSlideActions,
    onRegisterSlide, // оставлен для обратной совместимости, если используется снаружи
}, ref) => {
    const [actionStep, setActionStep] = useState(0);
    const interactiveRefs = useRef<(InteractiveRef | null)[]>([]);
    const totalActions = useRef(0);

    const containerClasses = [
        styles.slideContent,
        className,
    ].filter(Boolean).join(' ');

    // Последовательные действия: open -> close для каждой интерактивной карточки
    const handleNextAction = useCallback((): boolean => {
        if (actionStep < totalActions.current) {
            const elementIndex = Math.floor(actionStep / 2);
            const isOpenAction = actionStep % 2 === 0;

            const interactive = interactiveRefs.current[elementIndex];
            if (interactive) {
                if (isOpenAction) {
                    interactive.openFullscreen();
                } else {
                    interactive.closeFullscreen();
                }
                setActionStep(prev => prev + 1);
                return true;
            }
        }
        return false;
    }, [actionStep]);

    // Регистрация слайда через контекст
    const { registerSlide } = useSlideInstance();

    // Экспорт действий наружу через ref
    useImperativeHandle(ref, () => ({
        onNextAction: handleNextAction
    }));

    // Сброс состояния при деактивации
    React.useEffect(() => {
        setActionStep(0);
    }, []);

    // Рекурсивная функция: находим все интерактивные элементы (только через статический метод isInteractive)
    const findInteractiveElements = (
        element: React.ReactElement<any, any>,
        refs: (InteractiveRef | null)[]
    ): React.ReactElement<any, any> => {
        const elementProps = (element.props || {}) as any;
        const elementType: any = (element as any).type;

        // Только статический метод компонента
        const isInteractive =
            typeof elementType?.isInteractive === 'function'
                ? !!elementType.isInteractive(elementProps)
                : false;

        if (isInteractive) {
            const refIndex = refs.length;
            refs.push(null);

            const newProps = {
                ...elementProps,
                key: element.key ?? `interactive-${refIndex}`,
            };

            const callbackRef = (node: InteractiveRef | null) => {
                refs[refIndex] = node;
                const originalRef = (element as any).ref;
                if (typeof originalRef === 'function') {
                    originalRef(node);
                } else if (originalRef && typeof originalRef === 'object') {
                    (originalRef as any).current = node;
                }
            };

            return React.cloneElement(element, {
                ...newProps,
                ref: callbackRef,
            } as any);
        }

        // Рекурсивно обрабатываем детей
        if ((elementProps as any)?.children) {
            const enhancedChildren = React.Children.map((elementProps as any).children, (child) => {
                if (React.isValidElement(child)) {
                    return findInteractiveElements(child as React.ReactElement<any, any>, refs);
                }
                return child;
            });

            return React.cloneElement(element, {
                ...elementProps,
                children: enhancedChildren,
            } as any);
        }

        return element;
    };

    // ВАЖНО: собираем refs с нуля на каждый рендер и только потом присваиваем в interactiveRefs.current
    const collectedRefs: (InteractiveRef | null)[] = [];

    const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            const childType = child.type as any;

            // Пробрасываем cardVariant внутрь CardsLayout и продолжаем поиск рефов
            if (childType && (childType.displayName === 'CardsLayout' || childType.name === 'CardsLayout')) {
                const childProps = child.props || {};
                const enhancedChild = React.cloneElement(child as any, {
                    ...childProps,
                    cardVariant,
                });
                return findInteractiveElements(enhancedChild, collectedRefs);
            }

            return findInteractiveElements(child, collectedRefs);
        }
        return child;
    });

    interactiveRefs.current = collectedRefs;

    // Пересчёт количества действий и регистрация
    React.useEffect(() => {
        const validRefs = interactiveRefs.current.filter(Boolean);
        totalActions.current = validRefs.length * 2;

        if (onRegisterSlideActions) {
            onRegisterSlideActions({ onNextAction: handleNextAction });
        }
        if (registerSlide) {
            registerSlide({ onNextAction: handleNextAction });
        }
        if (onRegisterSlide) {
            onRegisterSlide({ onNextAction: handleNextAction });
        }
    }, [children, onRegisterSlideActions, handleNextAction, registerSlide, onRegisterSlide]);

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