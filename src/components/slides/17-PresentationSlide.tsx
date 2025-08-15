import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../wrappers/SlideWrapper";
import CardWrapper from '../wrappers/CardWrapper';
import GitHubProfileCard from '../cards/GitHubProfileCard';
import GridSpan from '../wrappers/GridSpan';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const PresentationSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <SlideWrapper
      title="Создание этой презентации"
      sign='🎩'
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
        <GridSpan cols={2}>
          <CardWrapper background="primary" size="large">
            <div style={{ textAlign: 'center' }}>
              <h3>🚀 Совместная разработка</h3>
              <p>Презентация создана двумя разработчиками с помощью <strong>Cursor AI</strong></p>
              <p>Каждый готовил свои слайды, синхронизируясь через Git</p>
            </div>
          </CardWrapper>
        </GridSpan>
        
        <GitHubProfileCard 
          username="AnaSerg"
          background="purple"
          animationType="appearance"
          animationIndex={1}
          animationDelay={300}
          isActive={isActive}
          isVisited={isVisited}
        />
        
        <GitHubProfileCard 
          username="sergeychernov"
          background="cyan"
          animationType="appearance"
          animationIndex={2}
          animationDelay={450}
          isActive={isActive}
          isVisited={isVisited}
        />
        
        <CardWrapper background="info">
          <div style={{ textAlign: 'center' }}>
            <h4>⚙️ Автоматизация</h4>
            <p><strong>GitHub Actions</strong> для автоматического деплоя</p>
            <p><strong>GitHub Pages</strong> для хостинга</p>
          </div>
        </CardWrapper>
        
        <CardWrapper background="warning">
          <div style={{ textAlign: 'center' }}>
            <h4>🎨 Контент</h4>
            <p>Изображения и мемы созданы с помощью <strong>ChatGPT</strong></p>
            <p>Адаптивный дизайн и анимации</p>
          </div>
        </CardWrapper>
        
        <GridSpan cols={2}>
          <CardWrapper background="success" size="large">
            <div style={{ textAlign: 'center' }}>
              <h3>🍴 Попробуйте сами!</h3>
              <p><strong>Сделайте fork</strong> этой презентации</p>
              <p>Откройте в <strong>Cursor</strong> и модифицируйте:</p>
              <ul style={{ textAlign: 'left', display: 'inline-block', margin: '1rem 0' }}>
                <li>Добавляйте новые слайды</li>
                <li>Создавайте карточки</li>
                <li>Изменяйте тексты и изображения</li>
                <li>Экспериментируйте с компонентами</li>
              </ul>
            </div>
          </CardWrapper>
        </GridSpan>
      </CardsLayout>
    </SlideWrapper>
  );
};

export default PresentationSlide;