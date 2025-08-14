import type { Meta, StoryObj } from '@storybook/react';
import CardsLayout from './CardsLayout';
import ConclusionCard from '../cards/ConclusionCard';
import FeaturesListCard from '../cards/FeaturesListCard';
import ImageCard from '../cards/ImageCard';
import ModelCard from '../cards/ModelCard';
import PointsCard from '../cards/PointsCard';
import PointsList from '../cards/PointsList';
import QRCard from '../cards/QRCard';
import TaskCard from '../cards/TaskCard';
import ToolCard from '../cards/ToolCard';

// Типы карточек
const CARD_TYPES = {
  ConclusionCard: 'ConclusionCard',
  FeaturesListCard: 'FeaturesListCard',
  ImageCard: 'ImageCard',
  ModelCard: 'ModelCard',
  PointsCard: 'PointsCard',
  PointsList: 'PointsList',
  QRCard: 'QRCard',
  TaskCard: 'TaskCard',
  ToolCard: 'ToolCard'
} as const;

type CardType = keyof typeof CARD_TYPES;

// Добавьте тип для props
type CardsLayoutProps = React.ComponentProps<typeof CardsLayout> & {
  cardType: CardType;
  cardCount: number;
};

// Примеры данных для каждого типа карточек
const sampleFeatures = [
  { icon: '🚀', text: 'Быстрая разработка' },
  { icon: '🎯', text: 'Точные результаты' },
  { icon: '⚡', text: 'Высокая производительность' },
];

const sampleModels = [
  { icon: '⚡', name: 'Cursor', description: 'У него есть Team тариф' },
  { icon: '🔒', name: 'Gemini plugin', description: 'Трудно оплачивать' },
  { icon: '��', name: 'Trae.ai', description: 'Функциональная копия Cursor' },
];

const samplePointsCards = [
  {
    description: "Проблемы с зависимостями",
    points: [
      "Конфликты версий пакетов",
      "Устаревшие зависимости",
      "Проблемы с peer dependencies",
      "Циклические зависимости"
    ]
  },
  {
    description: "Проблемы с конфигурацией",
    points: [
      "Webpack/Vite конфигурация",
      "Babel/TypeScript настройки",
      "ESLint/Prettier конфликты",
      "Environment variables"
    ]
  },
  {
    description: "Асинхронные ошибки",
    points: [
      "Race conditions",
      "Memory leaks в useEffect",
      "Проблемы с Promise.all/Promise.race",
      "Неправильная обработка async/await"
    ]
  }
];

const sampleTasks = [
  {
    title: 'E2E тесты',
    description: 'Генерировать тесты не получается, но можно уточнять синтаксис',
    tool: 'gemini, claude',
    rating: 'conditional' as const,
    icon: '🧪'
  },
  {
    title: 'Разбор логов',
    description: 'Находит паттерны, но может упустить контекст',
    tool: 'gemini, gpt, claude',
    rating: 'satisfactory' as const,
    icon: '🔍'
  },
];

const sampleQRCards = [
  {
    title: 'GitHub',
    url: 'https://github.com',
    description: 'Репозиторий проекта',
    icon: '🔗'
  },
  {
    title: 'Documentation',
    url: 'https://docs.example.com',
    description: 'Документация проекта',
    icon: '📚'
  },
];

const sampleConclusions = [
  {
    text: 'Общие выводы по проекту',
    index: 0
  },
  {
    text: 'Рекомендации для дальнейшего развития',
    index: 1
  },
];

const sampleTools = [
  {
    title: 'VS Code',
    category: 'IDE',
    features: sampleFeatures,
    note: { type: 'note' as const, text: 'Рекомендуется для начинающих' }
  },
  {
    title: 'WebStorm',
    category: 'IDE',
    features: sampleFeatures,
    note: { type: 'warning' as const, text: 'Платная лицензия' }
  },
];

const sampleImages = [
  {
    src: '/img/end-to-end-images.jpeg',
    alt: 'E2E testing illustration',
    maxHeight: '300px'
  },
  {
    src: '/img/regex-example.png',
    alt: 'Regex example',
    maxHeight: '250px'
  },
];

const samplePointsLists = [
  {
    items: [
      'Быстрая разработка',
      'Точные результаты',
      'Высокая производительность'
    ],
    bulletColor: '#1890ff'
  },
  {
    items: [
      'Простота использования',
      'Гибкость настроек',
      'Отличная документация'
    ],
    bulletColor: '#52c41a'
  },
];

// Функция для рендеринга карточек по типу
const renderCards = (cardType: CardType, count: number) => {
  const cards = [];

  for (let i = 0; i < count; i++) {
    switch (cardType) {
      case 'ConclusionCard':
        const conclusionData = sampleConclusions[i % sampleConclusions.length];
        cards.push(
            <ConclusionCard
                key={`conclusion-${i}`}
                text={conclusionData.text}
                index={conclusionData.index}
            />
        );
        break;

      case 'FeaturesListCard':
        const featureData = sampleTools[i % sampleTools.length];
        cards.push(
            <FeaturesListCard
                key={`features-${i}`}
                title={featureData.title}
                category={featureData.category}
                features={featureData.features}
                note={featureData.note}
            />
        );
        break;

      case 'ImageCard':
        const imageData = sampleImages[i % sampleImages.length];
        cards.push(
            <ImageCard
                key={`image-${i}`}
                src={imageData.src}
                alt={imageData.alt}
                maxHeight={imageData.maxHeight}
            />
        );
        break;

      case 'ModelCard':
        const modelData = sampleModels[i % sampleModels.length];
        cards.push(
            <ModelCard
                key={`model-${i}`}
                icon={modelData.icon}
                name={modelData.name}
                description={modelData.description}
            />
        );
        break;

      case 'PointsCard':
        const pointsCardData = samplePointsCards[i % samplePointsCards.length];
        cards.push(
            <PointsCard
                key={`pointscard-${i}`}
                description={pointsCardData.description}
                points={pointsCardData.points}
                size="medium"
                bulletColor="#1890ff"
            />
        );
        break;

      case 'PointsList':
        const pointsData = samplePointsLists[i % samplePointsLists.length];
        cards.push(
            <PointsList
                key={`points-${i}`}
                items={pointsData.items}
                bulletColor={pointsData.bulletColor}
            />
        );
        break;

      case 'QRCard':
        const qrData = sampleQRCards[i % sampleQRCards.length];
        cards.push(
            <QRCard
                key={`qr-${i}`}
                title={qrData.title}
                url={qrData.url}
                description={qrData.description}
                icon={qrData.icon}
            />
        );
        break;

      case 'TaskCard':
        const taskData = sampleTasks[i % sampleTasks.length];
        cards.push(
            <TaskCard
                key={`task-${i}`}
                title={taskData.title}
                description={taskData.description}
                tool={taskData.tool}
                rating={taskData.rating}
                icon={taskData.icon}
            />
        );
        break;

      case 'ToolCard':
        const toolData = sampleTools[i % sampleTools.length];
        cards.push(
            <ToolCard
                key={`tool-${i}`}
                title={toolData.title}
                category={toolData.category}
                features={toolData.features}
                note={toolData.note}
            />
        );
        break;

      default:
        break;
    }
  }

  return cards;
};

const meta: Meta<CardsLayoutProps> = {
  title: 'Layouts/CardsLayout',
  component: CardsLayout,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    cardType: {
      control: { type: 'select' },
      options: Object.keys(CARD_TYPES),
      description: 'Тип карточек для отображения',
    },
    cardCount: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Количество карточек',
    },
    cols: {
      control: { type: 'select' },
      options: ['1', '2', '3', '4', 'auto'],
    },
    colsRatio: {
      control: { type: 'select' },
      options: [
        '1',
        '1:1', '2:3', '3:2', '3:5', '5:3',
        '1:1:1', '1:2:1', '2:1:1', '1:1:2', '2:3:2', '1:3:1',
        '1:1:1:1', '1:2:1:1', '1:1:2:1', '1:1:1:2', '2:1:1:1', '1:2:2:1', '2:1:1:2'
      ],
    },
    horizontalGap: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large'],
    },
    verticalGap: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large'],
    },
    contentWidth: {
      control: { type: 'select' },
      options: ['narrow', 'medium', 'wide', 'full'],
    },
    animationType: {
      control: { type: 'select' },
      options: ['none', 'bubbling', 'grasshopper', 'pendulum', 'appearance', 'explosion', 'ghost'],
    },
    animationDelay: {
      control: { type: 'range', min: 0, max: 1000, step: 50 },
    },
    isActive: {
      control: { type: 'boolean' },
    },
    isVisited: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<CardsLayoutProps>;

// Единственная история с динамическим выбором карточек
export const DynamicCards: Story = {
  args: {
    cardType: 'PointsCard',
    cardCount: 3,
    cols: '3',
    horizontalGap: 'medium',
    verticalGap: 'medium',
    contentWidth: 'wide',
    animationType: 'bubbling',
    animationDelay: 150,
    isActive: true,
    isVisited: false,
  },
  render: (args) => {
    const { cardType, cardCount, ...layoutProps } = args;
    return (
        <CardsLayout {...layoutProps}>
          {renderCards(cardType, cardCount)}
        </CardsLayout>
    );
  },
};