import React from 'react';
import CardsLayout from '../layouts/CardsLayout';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const PresentationSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <CardsLayout 
      title="Презентация" 
      subtitle="Sergey"
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
        <h3>🎯 Создание презентаций</h3>
        <p>Подготовка материалов и визуализация данных для выступлений</p>
      </div>
    </CardsLayout>
  );
};

export default PresentationSlide;