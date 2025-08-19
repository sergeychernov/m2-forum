import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import MarkdownCard from '../cards/MarkdownCard';
import SlideWrapper from "../wrappers/SlideWrapper";

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const ConclusionsSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  const conclusions = [
    {
      content: `**AI инструменты значительно повышают продуктивность** в большинстве задач. В нашей команде AI как новый сотрудник — потеряв одного старшего разработчика, производительность осталась прежней\n\n![График производительности команды](${process.env.PUBLIC_URL}/charts/performance-chart.svg)`,
      background: 'blue' as const
    },
    {
      content: '## Наибольшая эффективность\n\nДостигается в задачах:\n- Документации\n- Генерации кода \n- Работа с DB \n- Тесты \n- Logs \n- Bugs',
      background: 'green' as const
    },
    {
      content: '### Время адаптации\n\nЧтобы разработчику увеличить производительность потребуется **2-3 месяца**, чтобы выработался специфический навык:\n\n- Формулирования задач\n- Декомпозиции\n- Адаптации под специфику проекта',
      background: 'purple' as const
    },
    {
      content: '⚠️ **Всегда проверяйте и тестируйте сгенерированный код**\n\n### Баланс важен\n\nИспользуйте AI как **помощник**, а не замену собственных знаний.\n\n> Важно поддерживать баланс между автоматизацией и человеческим контролем',
      background: 'orange' as const
    }
  ];

  return (
    <SlideWrapper
      title="Выводы и перспективы"
      sign='👩🎩'
    >
      <CardsLayout
        cols="2"
        horizontalGap="medium"
        verticalGap="medium"
        contentWidth="wide"
        animationType="explosion"
        animationDelay={250}
        isActive={isActive}
        isVisited={isVisited}
      >
        {conclusions.map((conclusion, index) => (
          <MarkdownCard
            key={index}
            content={conclusion.content}
            index={index}
            background={conclusion.background}
            isActive={isActive}
            isVisited={isVisited}
          />
        ))}
      </CardsLayout>
    </SlideWrapper>
  );
};

export default ConclusionsSlide;