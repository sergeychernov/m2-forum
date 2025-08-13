import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../blocks/SlideWrapper";

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const DatabaseSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
      <SlideWrapper
          title="База данных"
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
            <h3>🗄️ Работа с базами данных</h3>
            <p>Оптимизация запросов и проектирование схем БД с помощью AI</p>
          </div>
        </CardsLayout>
      </SlideWrapper>
  );
};

export default DatabaseSlide;