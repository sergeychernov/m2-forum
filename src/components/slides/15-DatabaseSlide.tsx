import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../SlideWrapper";
import FeaturesListCard from "../cards/FeaturesListCard";

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const DatabaseSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  const cards = [
    {
      title: "Запросы к БД",
      category: "MongoDB & SQL",
      features: [
        { icon: "⚡", text: "Быстрая генерация точных запросов" },
        { icon: "💎", text: "Не ошибается в запросах" },
        { icon: "✨", text: "Практически не нужно дорабатывать" }
      ],
      note: {
        type: "advantage" as const,
        text: "Отличный результат с MongoDB и SQL"
      }
    },
    {
      title: "Проектирование схем",
      category: "Структура БД",
      features: [
        { icon: "📐", text: "Создание оптимальной структуры" },
        { icon: "🔗", text: "Правильные связи между таблицами" },
        { icon: "📊", text: "Добавление новых полей" }
      ],
      note: {
        type: "advantage" as const,
        text: "Хорошо помогает с архитектурой БД"
      }
    },
    {
      title: "Миграции",
      category: "Сложности",
      features: [
        { icon: "😩", text: "Проблемы с миграциями SQL" },
        { icon: "🚫", text: "Предлагал неправильный синтаксис" },
        { icon: "✋", text: "Приходилось делать вручную" }
      ],
      note: {
        type: "warning" as const,
        text: "MongoDB миграции - неплохо, а c sql нужно быть осторожнее"
      }
    },
  ];

  return (
      <SlideWrapper
          title="База данных"
          subtitle="ИИ отлично справляется с запросами, проектированием БД, но с миграциями не всегда везет"
          sign='🎩'
      >
        <CardsLayout
            cols="3"
            horizontalGap="large"
            verticalGap="medium"
            contentWidth="medium"
            animationType="appearance"
            animationDelay={150}
            isActive={isActive}
            isVisited={isVisited}
        >
          {cards.map((card, index) => (
              <FeaturesListCard
                  key={card.title}
                  title={card.title}
                  category={card.category}
                  features={card.features}
                  note={card.note}
                  animationIndex={index}
              />
          ))}
        </CardsLayout>
      </SlideWrapper>
  );
};

export default DatabaseSlide;