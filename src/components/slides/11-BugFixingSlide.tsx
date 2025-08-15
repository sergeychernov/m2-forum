import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../wrappers/SlideWrapper";
import PointsCard from "../cards/PointsCard";

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const BugFixingSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  const cards = [
    {
      description: "Проблемы с зависимостями",
      points: [
        "Конфликты версий пакетов",
        "Устаревшие зависимости",
        "Проблемы с peer dependencies",
        "Циклические зависимости"
      ]
    },
    {
      description: "Проблемы с конфигурацией",
      points: [
        "Webpack/Vite конфигурация",
        "Babel/TypeScript настройки",
        "ESLint/Prettier конфликты",
        "Environment variables"
      ]
    },
    {
      description: "Асинхронные ошибки",
      points: [
        "Race conditions",
        "Memory leaks в useEffect",
        "Проблемы с Promise.all/Promise.race",
        "Неправильная обработка async/await"
      ]
    }
  ];

  return (
    <SlideWrapper
      title="Фикс локальных багов"
      subtitle="с которыми не справляются линтеры"
      sign='👩'
    >
      <CardsLayout
        cols="3"
        horizontalGap="large"
        verticalGap="medium"
        contentWidth="narrow"
        animationType="appearance"
        animationDelay={150}
        isActive={isActive}
        isVisited={isVisited}
      >
        {cards.map((card, index) => (
          <PointsCard
            key={card.description}
            size="large"
            description={card.description}
            points={card.points}
            animationIndex={index}
            bulletColor="#1890ff"
          />
        ))}
      </CardsLayout>
    </SlideWrapper>
  );
};

export default BugFixingSlide;