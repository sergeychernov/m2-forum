import React from 'react';
import CardsLayout from '../layouts/CardsLayout';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const CodeReviewSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <CardsLayout 
      title="Ревью кода" 
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
        <h3>👀 Анализ качества кода</h3>
        <p>AI-ассистированное ревью для выявления потенциальных проблем и улучшений</p>
      </div>
    </CardsLayout>
  );
};

export default CodeReviewSlide;