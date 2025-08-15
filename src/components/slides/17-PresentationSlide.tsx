import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../wrappers/SlideWrapper";
import CardWrapper from '../wrappers/CardWrapper';
import GitHubProfileCard from '../cards/GitHubProfileCard';
import GridSpan from '../wrappers/GridSpan';
import StubCard from '../cards/StubCard';
import ImageCard from '../cards/ImageCard';

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
          <CardWrapper background="purple" size="large">
            <div style={{ textAlign: 'center' }}>
              <h3>🚀 Совместная разработка</h3>
              <p>Презентация создана двумя разработчиками с помощью <strong>Cursor AI</strong></p>
              <p>Каждый готовил свои слайды, синхронизируясь через Git</p>
            </div>
          </CardWrapper>
        </GridSpan>
        
        <GitHubProfileCard 
          username="AnaSerg"
          background="pink"
          animationType="appearance"
          animationIndex={1}
          animationDelay={300}
          isActive={isActive}
          isVisited={isVisited}
        />
        
        <GitHubProfileCard 
          username="sergeychernov"
          background="blue"
          animationType="appearance"
          animationIndex={2}
          animationDelay={450}
          isActive={isActive}
          isVisited={isVisited}
        />
        
        <CardWrapper background="cyan">  {/* было info */}
          <div style={{ textAlign: 'center' }}>
            <h4>⚙️ Автоматизация</h4>
            <p><strong>GitHub Actions</strong> для автоматического деплоя</p>
            <p><strong>GitHub Pages</strong> для хостинга</p>
          </div>
        </CardWrapper>
        
        <CardWrapper background="orange">  {/* было warning */}
          <div style={{ textAlign: 'center' }}>
            <h4>🎨 Контент</h4>
            <p>Изображения и мемы созданы с помощью <strong>ChatGPT</strong></p>
            <p>Адаптивный дизайн и анимации</p>
          </div>
        </CardWrapper>
        
        <GridSpan cols={2}>
          <CardWrapper background="green" size="large">  {/* было success */}
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
        <StubCard />
        <GridSpan cols={2}>
          <ImageCard 
            src={`${process.env.PUBLIC_URL}/jokes/2025-08-14_16-36-44.png`}
            alt="Шутка о программировании"
            maxHeight="300px"
          />
        </GridSpan>
        <StubCard/>
      </CardsLayout>
    </SlideWrapper>
  );
};

export default PresentationSlide;