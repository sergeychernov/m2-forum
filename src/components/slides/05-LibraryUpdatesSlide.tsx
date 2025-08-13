import React from 'react';
import CardsLayout from '../layouts/CardsLayout';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const LibraryUpdatesSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <CardsLayout 
      title="Обновление библиотек" 
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
        <h3>📦 Управление зависимостями</h3>
        <p>AI помощь в анализе совместимости и планировании обновлений библиотек</p>
      </div>
    </CardsLayout>
  );
};

export default LibraryUpdatesSlide;