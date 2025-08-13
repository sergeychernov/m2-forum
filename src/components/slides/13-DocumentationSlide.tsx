import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../blocks/SlideWrapper";

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const DocumentationSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
      <SlideWrapper
          title="Документация"
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
            <h3>📖 Техническая документация</h3>
            <p>Создание и поддержка документации проектов с помощью AI</p>
          </div>
        </CardsLayout>
      </SlideWrapper>
  );
};

export default DocumentationSlide;