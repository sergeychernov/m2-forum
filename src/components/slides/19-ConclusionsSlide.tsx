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
      content: `**AI инструменты значительно повышают продуктивность** в большинстве задач. В нашей команде AI как новый сотрудник — потеряв одного старшего разработчика, производительность осталась прежней\n\n![График производительности команды](${process.env.PUBLIC_URL}/charts/performance-chart.svg)`
    },
    {
      content: '## Наибольшая эффективность\n\nДостигается в задачах:\n- Документации\n- Генерации кода'
    },
    {
      content: '### Платные решения\n\n**Cursor** и **trae.ai** отличаются интерфейсом и тарифами, оба отлично работают с `gemini` и `claude`.\n\n> Модели удобно переключать, если они начинают галюцинировать. Комбинируйте разные инструменты для максимальной эффективности'
    },
    {
      content: '### Время адаптации\n\nЧтобы разработчику увеличить производительность потребуется **2-3 месяца**, чтобы выработался специфический навык:\n\n- Формулирования задач\n- Декомпозиции\n- Адаптации под специфику проекта'
    },
    {
      content: '⚠️ **Всегда проверяйте и тестируйте сгенерированный код**'
    },
    {
      content: '### Баланс важен\n\nИспользуйте AI как **помощник**, а не замену собственных знаний.\n\n> Важно поддерживать баланс между автоматизацией и человеческим контролем'
    }
  ];

  return (
    <SlideWrapper
      title="Выводы и перспективы"
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
          />
        ))}
      </CardsLayout>
    </SlideWrapper>
  );
};

export default ConclusionsSlide;