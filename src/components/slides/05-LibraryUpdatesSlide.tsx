import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import SlideWrapper from "../SlideWrapper";
import FeaturesListCard from '../cards/FeaturesListCard';
import QRCard from '../cards/QRCard';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const LibraryUpdatesSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  const oldWayFeatures = [
    { icon: '📚', text: 'Искали в документации аналоги функций' },
    { icon: '✍️', text: 'Переписывали код вручную' },
    { icon: '🐛', text: 'Ловили и исправляли десятки ошибок' }
  ];

  const newWayFeatures = [
    { icon: '💬', text: 'В чат с проектом: "Перепиши проект с telegraf на grammY"' },
    { icon: '🤖', text: 'AI переписал весь код, заменив вызовы и структуры' },
    { icon: '🔧', text: 'Мы исправили пару багов и сразу продолжили разработку' },
    { icon: '⚡', text: 'Экономия времени в разы' }
  ];

  return (
    <SlideWrapper
      title="Обновление и миграция библиотек"
      subtitle="Telegraf  перестала активно поддерживаться. Выбрали grammY как современную и активно развивающуюся альтернативу."
      sign='Ч'
    >
      <CardsLayout
        cols="2"
        colsRatio="1:1"
        horizontalGap="large"
        verticalGap="medium"
        contentWidth="wide"
        animationType="appearance"
        animationDelay={150}
        isActive={isActive}
        isVisited={isVisited}
      >
          
          <FeaturesListCard
            title="Как это было раньше"
            category="Ручная миграция"
          features={oldWayFeatures}
          note={{
              type: 'warning',
              text: 'AI значительно ускоряет процесс миграции между библиотеками'
            }}
            animationType="appearance"
            animationIndex={1}
            animationDelay={300}
            isActive={isActive}
            isVisited={isVisited}
          />
          
          <FeaturesListCard
            title="Как это стало с AI"
            category="Автоматизированная миграция"
            features={newWayFeatures}
            note={{
              type: 'advantage',
              text: 'AI значительно ускоряет процесс миграции между библиотеками'
            }}
            animationType="appearance"
            animationIndex={2}
            animationDelay={450}
            isActive={isActive}
            isVisited={isVisited}
          />
      </CardsLayout>
    </SlideWrapper>
  );
};

export default LibraryUpdatesSlide;