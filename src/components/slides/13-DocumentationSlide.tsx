import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../wrappers/SlideWrapper";
import FeaturesListCard from '../cards/FeaturesListCard';
import QRCard from '../cards/QRCard';
import GridSpan from '../wrappers/GridSpan';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const DocumentationSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <SlideWrapper
      title="Документация"
      sign='🎩'
    >
      <CardsLayout
        cols="2"
        horizontalGap="large"
        verticalGap="medium"
        contentWidth="wide"
        animationType="appearance"
        animationDelay={150}
        isActive={isActive}
        isVisited={isVisited}
      >
        <FeaturesListCard
          title="📝 Создание документации"
          category="Генерация с нуля"
          features={[
            { icon: "🚀", text: "Автоматическое создание README файлов" },
            { icon: "📋", text: "Генерация API документации" },
            { icon: "📖", text: "Создание пользовательских руководств" },
            { icon: "🔧", text: "Документирование архитектуры проекта" }
          ]}
          note={{
            type: "advantage",
            text: "AI анализирует код и создает структурированную документацию"
          }}
          animationType="appearance"
          animationIndex={0}
          animationDelay={200}
          isActive={isActive}
          isVisited={isVisited}
        />

        <FeaturesListCard
          title="✏️ Улучшение документации"
          category="Редактирование и исправление"
          features={[
            { icon: "🔍", text: "Исправление грамматических ошибок" },
            { icon: "📊", text: "Улучшение структуры и читаемости" },
            { icon: "🎯", text: "Добавление недостающих разделов" },
            { icon: "💡", text: "Предложения по улучшению контента" }
          ]}
          note={{
            type: "note",
            text: "Выделите текст и попросите AI улучшить его"
          }}
          animationType="appearance"
          animationIndex={1}
          animationDelay={350}
          isActive={isActive}
          isVisited={isVisited}
        />

        <FeaturesListCard
          title="🌍 Локализация"
          category="Перевод на разные языки"
          features={[
            { icon: "🇺🇸", text: "Перевод на английский язык" },
            { icon: "🇷🇺", text: "Перевод на русский язык" },
            { icon: "🇩🇪", text: "Поддержка множества языков" },
            { icon: "🔄", text: "Сохранение технической терминологии" }
          ]}
          note={{
            type: "advantage",
            text: "AI сохраняет контекст и техническую точность при переводе"
          }}
          animationType="appearance"
          animationIndex={2}
          animationDelay={500}
          isActive={isActive}
          isVisited={isVisited}
        />

        <FeaturesListCard
          title="🤖 Примеры команд"
          category="Полезные промпты для Cursor"
          features={[
            { icon: "📝", text: "\"Создай README для этого проекта\"" },
            { icon: "🔧", text: "\"Добавь раздел об установке\"" },
            { icon: "🌍", text: "\"Переведи эту документацию на английский\"" },
            { icon: "✨", text: "\"Улучши читаемость этого текста\"" }
          ]}
          note={{
            type: "note",
            text: "Используйте Cmd+K для быстрого вызова AI помощника"
          }}
          animationType="appearance"
          animationIndex={3}
          animationDelay={650}
          isActive={isActive}
          isVisited={isVisited}
        />

        {/* QR-код растянут на две колонки с помощью GridSpan */}
        <GridSpan cols={2}>
          <QRCard
            title="Статья на habr за 40 минут"
            description="Написана по тезисам и документации проекта с помощью ChatGPT"
            url="https://habr.com/ru/articles/926944/"
            icon="📄"
            animationType="appearance"
            animationIndex={4}
            animationDelay={800}
            isActive={isActive}
            isVisited={isVisited}
          />
        </GridSpan>
      </CardsLayout>
    </SlideWrapper>
  );
};

export default DocumentationSlide;