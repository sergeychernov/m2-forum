import React, { useEffect, useState } from 'react';
import TaskCard from '../cards/TaskCard';
import CardsLayout from '../layouts/CardsLayout';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const ResultsSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  const [animateCards, setAnimateCards] = useState(false);

  const tasks = [
    {
      title: 'e2e тесты',
      description: 'Генерировать тесты не получается, но можно уточнять синтаксис и помогает переносить тесты с codecept.js на playwright',
      tool: 'gemini, claude',
      rating: 'conditional' as const,
      icon: '🧪'
    },
    {
      title: 'GitHub pipeline',
      description: 'Работает, но требует понимания особенностей',
      tool: 'codex',
      rating: 'conditional' as const,
      icon: '🔄'
    },
    {
      title: 'Юнит тесты и TDD',
      description: 'В 80% пишет тесты под ключ, требует анализа со стороны разработчика, по результатам тестов предлагает валидные исправления в 90%',
      tool: 'gemini, claude',
      rating: 'satisfactory' as const,
      icon: '🧪'
    },
    {
      title: 'Разбор логов и ошибок',
      description: 'Находит паттерны, но может упустить контекст',
      tool: 'gemini, gpt, claude',
      rating: 'satisfactory' as const,
      icon: '🔍'
    },
    {
      title: 'Ревью кода',
      description: 'Помогает находить уязвимости, но не заменяет ревью от живых разработчиков',
      tool: 'gemini, gpt, claude',
      rating: 'satisfactory' as const,
      icon: '👀'
    },
    {
      title: 'Прототип продукта',
      description: 'Отличная замена Figma для разработчика',
      tool: 'gemini, claude',
      rating: 'satisfactory' as const,
      icon: '🎨'
    },
    {
      title: 'Обновление библиотек',
      description: 'Обновление версий, переход на другие решения с другим api',
      tool: 'gemini, claude',
      rating: 'satisfactory' as const,
      icon: '📦'
    },
    {
      title: 'Фикс локальных багов',
      description: 'Быстрое исправление простых ошибок',
      tool: 'gemini, claude',
      rating: 'satisfactory' as const,
      icon: '🐛'
    },
    {
      title: 'Работа с БД',
      description: 'Создание новых структур, написание миграций, обновление модели, учет изменений в БД в вызовах',
      tool: 'gemini, claude',
      rating: 'satisfactory' as const,
      icon: '🗄️'
    },
    {
      title: 'Документация',
      description: 'Готовый результат с минимальными правками, мы используем подход docs as a code, поэтому документация обновляется практически бесшовно',
      tool: 'gemini, claude',
      rating: 'excellent' as const,
      icon: '📚'
    },
    {
      title: 'Перевод документации',
      description: 'Сохраняет контекст и терминологию при локализации opensource библиотек',
      tool: 'gemini, claude, codex',
      rating: 'excellent' as const,
      icon: '🌍'
    },
    {
      title: 'Регулярные выражения',
      description: 'Генерация и объяснение regex',
      tool: 'различные',
      rating: 'excellent' as const,
      icon: '🔤'
    },
    {
      title: 'npm opensource библиотеки',
      description: 'Выделение кода в библиотеку и настройка публикации в npm репозиторий',
      tool: 'gemini, claude',
      rating: 'excellent' as const,
      icon: '📦'
    }
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
      title="Результаты по задачам" 
      cols="4" 
      horizontalGap="small" 
      verticalGap="small" 
      contentWidth="full"
      scrollable={true}
      animate={animateCards}
      animationDelay={100}
    >
      {tasks.map((task) => (
        <TaskCard
          key={task.title}
          title={task.title}
          description={task.description}
          tool={task.tool}
          rating={task.rating}
          icon={task.icon}
        />
      ))}
    </CardsLayout>
  );
};

export default ResultsSlide;