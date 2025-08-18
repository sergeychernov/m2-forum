import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../wrappers/SlideWrapper";
import QRCard from '../cards/QRCard';
import PointsCard from '../cards/PointsCard';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const NpmLibrarySlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <SlideWrapper
      title="NPM библиотека"
      sign='👩'
    >
      <CardsLayout
        cols="2"
        horizontalGap="large"
        verticalGap="medium"
        contentWidth="narrow"
        animationType="appearance"
        animationDelay={150}
        isActive={isActive}
        isVisited={isVisited}
      >
        <QRCard
          title="fetch-retry-proxy"
          description="NPM библиотека для HTTP запросов с повторными попытками и прокси"
          url="https://www.npmjs.com/package/fetch-retry-proxy"
          icon="📦"
          animationType="appearance"
          animationIndex={0}
          animationDelay={150}
          isActive={isActive}
          isVisited={isVisited}
        />
        
        <PointsCard
          description="Как Cursor помог в разработке"
          points={[
            "🚀 Быстрое создание структуры проекта",
            "⚙️ Автоматическая настройка сборки и публикации",
            "💡 Подбор подходящего имени для библиотеки",
            "📝 Генерация документации и README",
            "🔧 Настройка TypeScript конфигурации",
            "✅ Создание тестов и CI/CD пайплайна"
          ]}
          size="medium"
          animationType="appearance"
          animationIndex={1}
          animationDelay={300}
          isActive={isActive}
          isVisited={isVisited}
          background="white"
        />
      </CardsLayout>
    </SlideWrapper>
  );
};

export default NpmLibrarySlide;