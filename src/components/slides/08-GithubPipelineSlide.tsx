// Импорт и компонент GithubPipelineSlide
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../wrappers/SlideWrapper";
import PointsCard from '../cards/PointsCard';
import ImageCard from '../cards/ImageCard';
import { SlideProps } from '../../types/KeyboardTypes';

const GithubPipelineSlide = forwardRef<{ onNextAction: () => boolean }, SlideProps>(({
    isActive,
    isVisited,
    onRegisterSlide,
    keyboardConfig,
    updateKeyboardConfig
}, ref) => {
    const slideWrapperRef = useRef<{ onNextAction: () => boolean }>(null);

    useImperativeHandle(ref, () => ({
        onNextAction: () => {
            return slideWrapperRef.current?.onNextAction() || false;
        }
    }));

    // Удаляем slideWrapperRef и useImperativeHandle — регистрация через SlideWrapper
    return (
        <SlideWrapper
            title="CI/CD через GitHub Actions"
            subtitle="Автоматизация процессов CI/CD с помощью Codex"
            sign='🎩'
            onRegisterSlideActions={(actions) => {
                if (onRegisterSlide) {
                    onRegisterSlide(actions);
                }
            }}
        >
            <CardsLayout
                cols="2"
                colsRatio='2:3'
                horizontalGap="large"
                verticalGap="large"
                contentWidth="narrow"
                animationType="appearance"
                animationDelay={150}
                isActive={isActive}
                isVisited={isVisited}
            >
                <PointsCard
                    description="Основные возможности GitHub Pipeline"
                    points={[
                        "Публикация ветки main на GitHub Pages",
                        "Публикация pull requests в фичеветки на GitHub Pages",
                        "Задачи формулируются в виде запросов в чат, в ответ на которые создается pull request",
                        "Работа по задаче ведется в рамках pull request в том же чате",
                        "Можно использовать привычные средства разработки добавляя свои коммиты в pull request"
                    ]}
                    size="medium"
                />

                <ImageCard
                    src={`${process.env.PUBLIC_URL}/pipeline/2025-08-15_10-35-40.png`}
                    alt="GitHub Pipeline схема"
                    maxHeight="400px"
                    enableFullscreen={true}
                />
            </CardsLayout>
        </SlideWrapper>
    );
});

export default GithubPipelineSlide;