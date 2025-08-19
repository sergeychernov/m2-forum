import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../wrappers/SlideWrapper";
import QRCard from '../cards/QRCard';
import PointsCard from '../cards/PointsCard';
import GridSpan from '../wrappers/GridSpan';

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
        verticalGap="medium"
        contentWidth="wide"
        animationType="appearance"
        animationDelay={150}
        isActive={isActive}
        isVisited={isVisited}
      >
        <QRCard
          title="telegram-quiz"
          description="Простой и гибкий конструктор викторин для Telegram ботов"
          url="https://www.npmjs.com/package/telegram-quiz"
          icon="🤖"
          animationType="appearance"
          animationIndex={0}
          animationDelay={150}
          isActive={isActive}
          isVisited={isVisited}
        />
        <QRCard
          title="fetch-retry-proxy"
          description="NPM библиотека для HTTP запросов с повторными попытками и прокси"
          url="https://www.npmjs.com/package/fetch-retry-proxy"
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