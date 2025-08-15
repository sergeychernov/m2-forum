import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../wrappers/SlideWrapper";
import TaskCard from '../cards/TaskCard';

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
          rating="conditional"
          icon="👀"
          animationType="appearance"
          animationIndex={0}
          animationDelay={150}
          isActive={isActive}
          isVisited={isVisited}
        />

        <TaskCard
          title="2. ChatGPT вручную"
          description="Копируете логи → вставляете в чат → задаёте вопросы"
          tool="Быстрее, но требует усилий"
          rating="satisfactory"
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
          rating="excellent"
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