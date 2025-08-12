import React from 'react';
import Img from '../../assets/img/end-to-end-images.jpeg';
import BlockLayout from '../layouts/BlockLayout';
import ModelCard from "../cards/ModelCard";

interface SlideProps {
    isActive: boolean;
    isVisited?: boolean;
}

const E2eTestsSlide: React.FC<SlideProps> = ({ isActive }) => {
    const cards = [
        { icon: '🔥', name: 'Достоинства', description: 'Сокращает время написания тестов, так как избавляет от рутинных операций' },
        { icon: '😩', name: 'Недостатки', description: 'Нет возможности автогенерации e2e-тестов' },
    ];

    return (
        <BlockLayout
            title="Написание e2e-тестов"
            subtitle="Была задача переписать e2e-тесты c Codecept на Playwright"
            layoutType="grid"
            cols="2"
            colsRatio="1:1"
            contentWidth="medium"
            contentAlign="center"
            gap="large"
            animationType={isActive ? 'slide' : 'none'}
            animationDelay={150}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {cards.map((card) => (
                    <ModelCard
                        key={card.name}
                        size="large"
                        icon={card.icon}
                        name={card.name}
                        description={card.description}
                    />
                ))}
            </div>

                <img
                    alt="robot reading book"
                    style={{
                        width: '80%',
                        height: 'auto',
                        maxHeight: '400px',
                        borderRadius: '8px'
                    }}
                    src={Img}
                />
        </BlockLayout>
    );
};

export default E2eTestsSlide;