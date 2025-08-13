import React from 'react';
import CardsLayout from '../layouts/CardsLayout';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const GithubPipelineSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <CardsLayout 
      title="GitHub Pipeline" 
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
        <h3>🔄 CI/CD автоматизация</h3>
        <p>Настройка и оптимизация процессов непрерывной интеграции и развертывания</p>
      </div>
    </CardsLayout>
  );
};

export default GithubPipelineSlide;