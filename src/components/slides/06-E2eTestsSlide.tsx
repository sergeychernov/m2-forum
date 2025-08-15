import React from 'react';
import ModelCard from "../cards/ModelCard";
import ImageCard from "../cards/ImageCard";
import ThreeCardsLayout from "../layouts/ThreeCardsLayout";
import SlideWrapper from "../SlideWrapper";

interface SlideProps {
    isActive: boolean;
    isVisited?: boolean;
}

const E2eTestsSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
    const cards = [
        { icon: '🔥', name: 'Достоинства', description: 'Сокращает время написания тестов, так как избавляет от рутинных операций' },
        { icon: '😩', name: 'Недостатки', description: 'Нет возможности автогенерации e2e-тестов' },
    ];

    return (
        <SlideWrapper
            title="Написание e2e-тестов"
            subtitle="Была задача переписать e2e-тесты c Codecept на Playwright"
            sign='👩'
        >
            <ThreeCardsLayout
                colsRatio="2x2:3"
                horizontalGap="large"
                verticalGap="medium"
                contentWidth="narrow"
                contentAlign="center"
                animation={{
                    animationType: "grasshopper",
                    animationDelay: 150,
                    isActive,
                    isVisited
                }}
            >
                {cards.map((card) => (
                    <ModelCard
                        key={card.name}
                        size="large"
                        icon={card.icon}
                        name={card.name}
                        description={card.description}
                    />
                ))}
                <ImageCard
                    src={`${process.env.PUBLIC_URL}/img/end-to-end-images.jpeg`}
                    alt="robot reading book"
                    maxHeight="400px"
                />
            </ThreeCardsLayout>
        </SlideWrapper>
    );
};

export default E2eTestsSlide;