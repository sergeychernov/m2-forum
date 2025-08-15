import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../SlideWrapper";
import ModelCard from "../cards/ModelCard";

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const UnitTestingSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  const cards = [
    { icon: '⚡', description: 'Быстрая генерация базовых тест-кейсов на основе анализа кода' },
    { icon: '🔧', description: 'Автоматическое создание моков и стабов для внешних зависимостей' },
    { icon: '🎯', description: 'Покрытие edge cases и граничных значений, которые легко пропустить' },
    { icon: '📚', description: 'Обучение правильным паттернам тестирования через готовые примеры' },
    { icon: '⚙️', description: 'Автоматическая настройка тестового окружения для разных фреймворков' },
    { icon: '🚀', description: 'Снижение времени на написание boilerplate кода и рутинных операций' },
  ];

  return (
      <SlideWrapper
          title="Unit тестирование"
          subtitle="С unit-тестами ИИ показал себя гораздо лучше"
          sign='👩'
      >
        <CardsLayout
            cols="3"
            horizontalGap="large"
            verticalGap="medium"
            contentWidth="narrow"
            animationType="ghost"
            animationDelay={150}
            isActive={isActive}
            isVisited={isVisited}
        >
          {cards.map((card) => (
              <ModelCard
                  key={card.description}
                  size="medium"
                  icon={card.icon}
                  description={card.description}
              />
          ))}
        </CardsLayout>
      </SlideWrapper>
  );
};

export default UnitTestingSlide;