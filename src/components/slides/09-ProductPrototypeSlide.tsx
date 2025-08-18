import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../wrappers/SlideWrapper";
import PointsCard from '../cards/PointsCard';
import QRCard from '../cards/QRCard';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const ProductPrototypeSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <SlideWrapper
      title="Новый продукт: Чат бот"
      subtitle="Codex и Cursor: эмулятор чатом + прототип сайта"
      sign='🎩'
    >
      <CardsLayout
        cols="2"
        colsRatio="3:2"
        horizontalGap="large"
        verticalGap="medium"
        contentWidth="medium"
        animationType="appearance"
        animationDelay={150}
        isActive={isActive}
        isVisited={isVisited}
      >
        <PointsCard
          description="Ключевые особенности прототипа"
          points={[
            { text: "Моделирует путь пользователя: риелтор ↔ клиент ↔ бот", icon: "🎯" },
            { text: "Эмулятор чата вместо полноценного мессенджера", icon: "💡" },
            { text: "Демонстрация на защите гипотез снижает недопонимание", icon: "🚀" }
          ]}
          size="medium"
          animationType="appearance"
          animationIndex={0}
          animationDelay={150}
          isActive={isActive}
          isVisited={isVisited}
        />

        <QRCard
          title="Интерактивный прототип"
          url="https://sergeychernov.github.io/m2-prototype"
          icon="🎨"
          animationType="appearance"
          animationIndex={1}
          animationDelay={300}
          isActive={isActive}
          isVisited={isVisited}
        />
      </CardsLayout>
    </SlideWrapper>
  );
};

export default ProductPrototypeSlide;