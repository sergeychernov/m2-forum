import React, { useEffect, useState } from 'react';
import ModelCard from '../cards/ModelCard';
import CardsLayout from '../layouts/CardsLayout';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const ModelsSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  const models = [
    { icon: '🤖', name: 'GPT', description: 'Модель от OpenAI' },
    { icon: '💎', name: 'Gemini', description: 'Модель от Google' },
    { icon: '🎭', name: 'Claude', description: 'Модель от Anthropic' },
    { icon: '🌙', name: 'Kimi', description: 'Модель от Moonshot AI' },
    { icon: '🔍', name: 'DeepSeek', description: 'Модель от DeepSeek' },
    { icon: '⚡', name: 'Grok', description: 'Модель от xAI' },
  ];

  return (
    <CardsLayout 
      title="Протестированные модели" 
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
          key={model.name}
          icon={model.icon}
          name={model.name}
          description={model.description}
        />
      ))}
    </CardsLayout>
  );
};

export default ModelsSlide;