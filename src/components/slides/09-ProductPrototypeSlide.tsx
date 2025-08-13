import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../SlideWrapper";

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const ProductPrototypeSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
      <SlideWrapper
          title="Прототип продукта"
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
            <h3>🎨 Быстрое прототипирование</h3>
            <p>Создание MVP и интерактивных прототипов с помощью AI инструментов</p>
          </div>
        </CardsLayout>
      </SlideWrapper>
  );
};

export default ProductPrototypeSlide;