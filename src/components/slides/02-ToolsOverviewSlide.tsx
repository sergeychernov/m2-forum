import React from 'react';
import FeaturesListCard from '../cards/FeaturesListCard';
import CardsLayout from '../layouts/CardsLayout';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const ToolsOverviewSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  const cursorToolFeatures = [
    { icon: '📁', text: 'Ссылки на файлы и участки кода' },
    { icon: '🖼️', text: 'Прикрепление изображений и схем' },
    { icon: '⚡', text: 'Генерация кодовых фрагментов' },
    { icon: '🔍', text: 'Анализ логов и code review' },
    { icon: '💻', text: 'Работа с встроенным терминалом' },
  ];

  const codexToolFeatures = [
    { icon: '🚀', text: 'Создание прототипов' },
    { icon: '🌍', text: 'Автоматизация локализации' },
    { icon: '🔓', text: 'Open-source проекты' },
    { icon: '📋', text: 'Структура задач (issue → PR)' },
  ];

  return (
    <CardsLayout 
      title="Обзор инструментов" 
      subtitle='3 месяца назад мы начали постепенно пробовать внедрять vibecoding в нашу работу, хотя изначально мы даже не слышали об этом термине'
      cols="2" 
      horizontalGap="medium" 
      verticalGap="medium" 
      contentWidth="medium"
      animationType="bubbling"
      animationDelay={200}
      isActive={isActive}
      isVisited={isVisited}
    >
      <FeaturesListCard
        title="Gemini Plugin, Cursor и Trae.ai"
        category="Продвинутые IDE с автодополнением кода и встроенным AI-ассистентом"
        features={cursorToolFeatures}
        note={{
          type: 'note',
          text: 'Отличие Gemini Plugin: работает только с Google моделью и требует Google Cloud'
        }}
      />
      
      <FeaturesListCard
        title="Codex"
        category="Интегрируется с GitHub-репозиторием: любая задача = Pull Request"
        features={codexToolFeatures}
        note={{
          type: 'warning',
          text: 'Ограничение: технология еще сырая — требует доработки для продакшн-среды'
        }}
      />
    </CardsLayout>
  );
};

export default ToolsOverviewSlide;