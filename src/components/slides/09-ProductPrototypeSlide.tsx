import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../SlideWrapper";
import PointsCard from '../cards/PointsCard';
import QRCard from '../cards/QRCard';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const ProductPrototypeSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <SlideWrapper
      title="Прототип чат-флоу: из идеи — в гипотезу на защите"
      subtitle="Sergey"
      sign='Ч'
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
            "🎯 Моделирует путь пользователя: риелтор ↔ клиент ↔ бот",
            "💡 Эмулятор чата вместо полноценного мессенджера",
            "🚀 Демонстрация на защите гипотез снижает недопонимание"
          ]}
          size="medium"
          bulletColor="#1890ff"
          animationType="appearance"
          animationIndex={0}
          animationDelay={150}
          isActive={isActive}
          isVisited={isVisited}
        />
        
        <QRCard
          title="Интерактивный прототип"
          description="Демонстрация чат-флоу"
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