import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../SlideWrapper";

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const NpmLibrarySlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
      <SlideWrapper
          title="NPM библиотека"
          subtitle="Nastya"
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
            <h3>📚 Разработка библиотек</h3>
            <p>Создание и публикация переиспользуемых компонентов и утилит</p>
          </div>
        </CardsLayout>
      </SlideWrapper>
  );
};

export default NpmLibrarySlide;