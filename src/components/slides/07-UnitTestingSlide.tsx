import React from 'react';
import CardsLayout from '../layouts/CardsLayout';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const UnitTestingSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <CardsLayout 
      title="Unit тестирование" 
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
        <h3>🔬 Модульное тестирование</h3>
        <p>Написание и поддержка unit тестов для обеспечения качества кода</p>
      </div>
    </CardsLayout>
  );
};

export default UnitTestingSlide;