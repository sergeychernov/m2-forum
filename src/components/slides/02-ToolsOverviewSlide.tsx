import React, { useEffect, useState } from 'react';
import ToolCard from '../cards/ToolCard';
import CardsLayout from '../layouts/CardsLayout';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const ToolsOverviewSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  const [animateCards, setAnimateCards] = useState(false);

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

  useEffect(() => {
    if (isActive && !isVisited) {
      const timer = setTimeout(() => {
        setAnimateCards(true);
      }, 300);
      return () => clearTimeout(timer);
    } else if (isVisited) {
      setAnimateCards(true);
    }
  }, [isActive, isVisited]);

  return (
    <CardsLayout 
      title="Обзор инструментов" 
      cols="2" 
      horizontalGap="medium" 
      verticalGap="medium" 
      contentWidth="medium"
      animate={animateCards}
      animationDelay={200}
    >
      <ToolCard
        title="Gemini Plugin, Cursor и Trae.ai"
        category="Продвинутые IDE с автодополнением кода и встроенным AI-ассистентом"
        features={cursorToolFeatures}
        note={{
          type: 'note',
          text: 'Отличие Gemini Plugin: работает только с Google моделью и требует Google Cloud'
        }}
      />
      
      <ToolCard
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