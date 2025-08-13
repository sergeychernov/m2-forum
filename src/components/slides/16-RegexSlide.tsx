import React from 'react';
import CardsLayout from '../layouts/CardsLayout';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const RegexSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <CardsLayout 
      title="Регулярные выражения" 
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
        <h3>🔤 Обработка текста</h3>
        <p>Создание и отладка сложных регулярных выражений для парсинга данных</p>
      </div>
    </CardsLayout>
  );
};

export default RegexSlide;