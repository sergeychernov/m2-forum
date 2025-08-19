import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../wrappers/SlideWrapper";
import PointsCard from '../cards/PointsCard';
import GridSpan from '../wrappers/GridSpan';
import NPMCard from '../cards/NPMCard';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const NpmLibrarySlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <SlideWrapper
      title="NPM библиотека"
      sign='👩🎩'
    >
      <CardsLayout
        cols="4"
        horizontalGap="large"
        verticalGap="large"
        contentWidth="wide"
        animationType="appearance"
        animationDelay={150}
        isActive={isActive}
        isVisited={isVisited}
      >
        <NPMCard
          packageName="telegram-quiz"
          title="telegram-quiz"
          description="Простой и гибкий конструктор викторин для Telegram ботов"
          icon="🤖"
          animationType="appearance"
          animationIndex={0}
          animationDelay={150}
          isActive={isActive}
          isVisited={isVisited}
        />
        {/* Заменяем на NPMCard */}
        <NPMCard
          packageName="fetch-retry-proxy"
          title="fetch-retry-proxy"
          description="NPM библиотека для HTTP запросов с повторными попытками и прокси"
          icon="📦"
          animationType="appearance"
          animationIndex={1}
          animationDelay={300}
          isActive={isActive}
          isVisited={isVisited}
        />
        <GridSpan cols={2}><PointsCard
          description="Как Cursor помог в разработке"
          points={[
            { text: "Быстрое создание структуры проекта", icon: "🚀" },
            { text: "Автоматическая настройка сборки и публикации", icon: "⚙️" },
            { text: "Подбор подходящего имени для библиотеки", icon: "💡" },
            { text: "Генерация документации и README", icon: "📝" },
            { text: "Настройка TypeScript конфигурации", icon: "🔧" },
            { text: "Создание тестов и CI/CD пайплайна", icon: "✅" }
          ]}
          size="large"
          animationType="appearance"
          animationIndex={2}
          animationDelay={450}
          isActive={isActive}
          isVisited={isVisited}
          background="blue"
        /></GridSpan>



      </CardsLayout>
    </SlideWrapper>
  );
};

export default NpmLibrarySlide;