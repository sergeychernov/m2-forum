import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../SlideWrapper";
import PointsCard from '../cards/PointsCard';
import ImageCard from '../cards/ImageCard';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const GithubPipelineSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
      <SlideWrapper
          title="GitHub Pipeline"
          subtitle="Автоматизация процессов CI/CD с помощью Codex"
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
          <PointsCard
            description="Основные возможности GitHub Pipeline"
            points={[
              "Публикация ветки main на GitHub Pages",
              "Публикация pull requests в фичеветки на GitHub Pages",
              "Задачи формулируются в виде запросов в чат, в ответ на которые создается pull request",
              "Работа по задаче ведется в рамках pull request в том же чате",
              "Можно использовать привычные средства разработки добавляя свои коммиты в pull request"
            ]}
            size="medium"
            bulletColor="#1890ff"
          />
          
          <ImageCard
          src={`${process.env.PUBLIC_URL}/pipeline/2025-08-15_10-35-40.png`}
            alt="GitHub Pipeline схема"
          maxHeight="400px"
        enableFullscreen={true}
          />
        </CardsLayout>
      </SlideWrapper>
  );
};

export default GithubPipelineSlide;