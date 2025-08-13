import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../SlideWrapper";

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const BugFixingSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
      <SlideWrapper
          title="Фикс багов"
          subtitle="Nastya"
      >
        <CardsLayout
            cols="1"
            horizontalGap="large"
            verticalGap="medium"
            contentWidth="narrow"
            animationType="appearance"
            animationDelay={150}
            isActive={isActive}
            isVisited={isVisited}
        >
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h3>🐛 Исправление ошибок</h3>
            <p>Быстрая диагностика и решение проблем в коде с помощью AI</p>
          </div>
        </CardsLayout>

      </SlideWrapper>
  );
};

export default BugFixingSlide;