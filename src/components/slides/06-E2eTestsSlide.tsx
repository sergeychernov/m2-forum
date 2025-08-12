import React from 'react';
import Img from '../../assets/img/end-to-end-images.jpeg'
import CardsLayout from '../layouts/CardsLayout';
import ModelCard from "../cards/ModelCard";

interface SlideProps {
    isActive: boolean;
    isVisited: boolean;
}

const E2eTestsSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
    const cards = [
        { icon: '🔥', name: 'Достоинства', description: 'Сокращает время написания тестов, так как избавляет от рутинных операций' },
        { icon: '😩', name: 'Недостатки', description: 'Нет возможности автогенерации e2e-тестов' },
    ];

    return (
        <CardsLayout
            title="Написание e2e-тестов"
            subtitle='Была задача переписать e2e-тесты c Codecept на Playwright'
            cols="2"
            colsRatio="2:3"
            horizontalGap="medium"
            verticalGap="medium"
            contentWidth="medium"
            contentAlign="center"
            animationType="bubbling"
            animationDelay={200}
            isActive={isActive}
            isVisited={isVisited}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {cards.map((card) => (
                    <ModelCard
                        size="medium"
                        key={card.name}
                        icon={card.icon}
                        name={card.name}
                        description={card.description}
                    />
                ))}
            </div>
            <img alt="robot reading book" style={{width: '80%', height: '70%'}} src={Img}/>
        </CardsLayout>
    );
};

export default E2eTestsSlide;