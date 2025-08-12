import React from 'react';
import ModelCard from '../cards/ModelCard';
import CardsLayout from '../layouts/CardsLayout';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const IBDecisionSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  const models = [
    { icon: '⚡', name: 'Cursor', description: 'У него есть Team тариф' },
    { icon: '🔒', name: 'Gemini plugin', description: 'Трудно оплачивать, нельзя переключать модели' },
    { icon: '🔄', name: 'Trae.ai', description: 'Функционально копирует Cursor, но нет Team тарифа' },
   ];

  return (
    <CardsLayout 
      title="Мы с безопасниками посовещались..." 
      subtitle='и Артем Олифиренко решил. Что будем использовать Cursor.'
      cols="3" 
      horizontalGap="large" 
      verticalGap="medium"
      contentWidth="narrow"
      animationType="grasshopper"
      animationDelay={150}
      isActive={isActive}
      isVisited={isVisited}
    >
      {models.map((model) => (
        <ModelCard
          size="medium"
          key={model.name}
          icon={model.icon}
          name={model.name}
          description={model.description}
        />
      ))}
    </CardsLayout>
  );
};

export default IBDecisionSlide;