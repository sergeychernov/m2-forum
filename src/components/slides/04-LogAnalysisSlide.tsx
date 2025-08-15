import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../wrappers/SlideWrapper";
import TaskCard from '../cards/TaskCard';
import ImageCard from '../cards/ImageCard';
import GridSpan from '../wrappers/GridSpan';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const LogAnalysisSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <SlideWrapper
      title="Эволюция разбора логов"
      sign='🎩'
    >
      <CardsLayout
        cols="3"
        colsRatio='2:1:1'
        horizontalGap="large"
        verticalGap="medium"
        contentWidth="narrow"
        animationType="appearance"
        animationDelay={150}
        isActive={isActive}
        isVisited={isVisited}
      >
        
        <TaskCard
          title="1. Ручной анализ"
          description="Чтение логов глазами, ручные догадки"
          tool="Медленно, высок риск ошибок"
          borderAccent="yellow"
          icon="👀"
          animationType="appearance"
          animationIndex={0}
          animationDelay={150}
          isActive={isActive}
          isVisited={isVisited}
        />
 <GridSpan cols={2} rows={2}> <ImageCard
          src={`${process.env.PUBLIC_URL}/logs/2025-08-15_13-11-45.png`}
          alt="Log analysis example"
          animationType="appearance"
          animationIndex={3}
          animationDelay={150}
          isActive={isActive}
          isVisited={isVisited}
        /></GridSpan>
        <TaskCard
          title="2. ChatGPT вручную"
          description="Копируете логи → вставляете в чат → задаёте вопросы"
          tool="Быстрее, но требует усилий"
          borderAccent="blue"
          icon="💬"
          animationType="appearance"
          animationIndex={1}
          animationDelay={150}
          isActive={isActive}
          isVisited={isVisited}
        />

        <TaskCard
          title="3. Cursor + @terminal"
          description="Один клик вставляет лог из терминала в чат, AI сразу анализирует"
          tool="Максимально удобно, эффективно"
          borderAccent="green"
          icon="⚡"
          animationType="appearance"
          animationIndex={2}
          animationDelay={150}
          isActive={isActive}
          isVisited={isVisited}
        />
       
       
      </CardsLayout>
    </SlideWrapper>
  );
};

export default LogAnalysisSlide;