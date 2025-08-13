import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../blocks/SlideWrapper";

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const LogAnalysisSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
      <SlideWrapper
          title="Разбор логов и ошибок"
          subtitle="Sergey"
      >
        <CardsLayout
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
            <h3>🔍 Анализ логов и диагностика ошибок</h3>
            <p>Использование AI для быстрого поиска паттернов в логах и определения причин ошибок</p>
          </div>
        </CardsLayout>
      </SlideWrapper>
  );
};

export default LogAnalysisSlide;