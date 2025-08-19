import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { PointsList } from '../cards/PointsList';
import ImageCard from '../cards/ImageCard';
import SlideWrapper from "../wrappers/SlideWrapper";
import CardsLayout from "../layouts/CardsLayout";
import { SlideProps } from '../../types/KeyboardTypes';

const RegexSlide = forwardRef<{ onNextAction: () => boolean }, SlideProps>(({
    isActive,
    isVisited,
    onRegisterSlide,
    keyboardConfig,
    updateKeyboardConfig
}, ref) => {
    const features = [
        "🤖 ИИ анализирует контекст задачи",
        "📝 Генерирует точные регулярные выражения",
        "✅ Проверяет корректность на примерах",
        "🔧 Предлагает оптимизации и улучшения",
        "📚 Объясняет логику работы паттерна"
    ];

    return (
        <SlideWrapper
            title="Регулярные выражения с ИИ"
            subtitle="Автоматическая генерация и оптимизация regex-паттернов"
            footerNote="ИИ помогает создавать сложные регулярные выражения быстро и без ошибок"
        >
            <CardsLayout
                colsRatio="2:3"
                horizontalGap="medium"
                verticalGap="medium"
                contentWidth="medium"
                animationType="bubbling"
                animationDelay={200}
                isActive={isActive}
                isVisited={isVisited}
            >
                <PointsList items={features} />
                <ImageCard
                    src={`${process.env.PUBLIC_URL}/img/regex-example.png`}
                    alt="ИИ помогает в разработке пример регулярки"
                    maxHeight="400px"
                    objectFit="contain"
                    enableFullscreen={true}
                    className="imageCard"
                />
            </CardsLayout>
        </SlideWrapper>
    );
});

export default RegexSlide;