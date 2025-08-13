import React from 'react';
import CardsLayout from '../layouts/CardsLayout';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const BugFixingSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <CardsLayout 
      title="Фикс багов" 
      subtitle="Nastya"
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
  );
};

export default BugFixingSlide;