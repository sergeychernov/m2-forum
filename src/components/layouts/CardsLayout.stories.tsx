import type { Meta, StoryObj } from '@storybook/react';
import CardsLayout from './CardsLayout';
import ThreeCardsLayout from './ThreeCardsLayout';
import SlideWrapper from '../SlideWrapper';
import ConclusionCard from '../cards/ConclusionCard';
import FeaturesListCard from '../cards/FeaturesListCard';
import ImageCard from '../cards/ImageCard';
import ModelCard from '../cards/ModelCard';
import PointsList from '../cards/PointsList';
import QRCard from '../cards/QRCard';
import TaskCard from '../cards/TaskCard';
// Удалить импорт
// import ToolCard from '../cards/ToolCard';

// Типы лейаутов
const LAYOUT_TYPES = {
  CardsLayout: 'CardsLayout',
  ThreeCardsLayout: 'ThreeCardsLayout'
} as const;

type LayoutType = keyof typeof LAYOUT_TYPES;

// Типы карточек
const CARD_TYPES = {
  ConclusionCard: 'ConclusionCard',
  FeaturesListCard: 'FeaturesListCard',
  ImageCard: 'ImageCard',
  ModelCard: 'ModelCard',
  PointsList: 'PointsList',
  QRCard: 'QRCard',
  TaskCard: 'TaskCard'
  // ToolCard: 'ToolCard' - удалить эту строку
} as const;

type CardType = keyof typeof CARD_TYPES;

// Импортируем типы из компонентов
type CardsLayoutProps = React.ComponentProps<typeof CardsLayout>;
type ThreeCardsLayoutProps = React.ComponentProps<typeof ThreeCardsLayout>;

// Типы для ThreeCardsLayout
type ThreeColsRatio = '1x2:1' | '2x2:3' | '3x2:2' | '3x2:5' | '5x2:3' | '1:1x2' | '2:3x2' | '3:2x2' | '3:5x2' | '5:3x2';

// Исправленный тип для props
type LayoutProps = {
  layoutType: LayoutType;
  cardType: CardType;
  cardCount: number;
  // Общие пропсы
  horizontalGap?: 'none' | 'small' | 'medium' | 'large';
  verticalGap?: 'none' | 'small' | 'medium' | 'large';
  contentWidth?: 'narrow' | 'medium' | 'wide' | 'full';
  contentAlign?: 'top' | 'center' | 'bottom';
  className?: string;
  // Пропсы для CardsLayout - используем правильный тип
  cols?: '1' | '2' | '3' | '4' | 'auto';
  colsRatio?: CardsLayoutProps['colsRatio']; // Используем тип из CardsLayout
  // Пропсы для ThreeCardsLayout
  threeColsRatio?: ThreeColsRatio;
  // Анимационные пропсы
  animationType?: 'none' | 'bubbling' | 'grasshopper' | 'pendulum' | 'appearance' | 'explosion' | 'ghost';
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
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
  { icon: '🔄', name: 'Trae.ai', description: 'Функциональная копия Cursor' },
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
const renderCards = (
  cardType: CardType, 
  count: number, 
  animationProps?: {
    animationType?: 'none' | 'bubbling' | 'grasshopper' | 'pendulum' | 'appearance' | 'explosion' | 'ghost';
    animationDelay?: number;
    isActive?: boolean;
    isVisited?: boolean;
  }
) => {
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
            animationType={animationProps?.animationType}
            animationIndex={i}
            animationDelay={animationProps?.animationDelay}
            isActive={animationProps?.isActive}
            isVisited={animationProps?.isVisited}
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
        
      case 'PointsList':
        const pointsData = samplePointsLists[i % samplePointsLists.length];
        cards.push(
          <PointsList
            key={`points-${i}`}
            items={pointsData.items}
            bulletColor={pointsData.bulletColor}
            animationType={animationProps?.animationType}
            animationIndex={i}
            animationDelay={animationProps?.animationDelay}
            isActive={animationProps?.isActive}
            isVisited={animationProps?.isVisited}
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
        
      default:
        break;
    }
  }
  
  return cards;
};

const meta: Meta<LayoutProps> = {
  title: 'Layouts/CardsLayout',
  component: CardsLayout,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    layoutType: {
      control: { type: 'select' },
      options: Object.keys(LAYOUT_TYPES),
      description: 'Тип лейаута для отображения',
    },
    cardType: {
      control: { type: 'select' },
      options: Object.keys(CARD_TYPES),
      description: 'Тип карточек для отображения',
    },
    cardCount: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Количество карточек',
    },
    // CardsLayout props
    cols: {
      control: { type: 'select' },
      options: ['1', '2', '3', '4', 'auto'],
      if: { arg: 'layoutType', eq: 'CardsLayout' },
    },
    colsRatio: {
      control: { type: 'select' },
      options: [
        '1',
        '1:1', '2:3', '3:2', '3:5', '5:3',
        '1:1:1', '1:2:1', '2:1:1', '1:1:2', '2:3:2', '1:3:1',
        '1:1:1:1', '1:2:1:1', '1:1:2:1', '1:1:1:2', '2:1:1:1', '1:2:2:1', '2:1:1:2'
      ],
      if: { arg: 'layoutType', eq: 'CardsLayout' },
    },
    // ThreeCardsLayout props
    threeColsRatio: {
      control: { type: 'select' },
      options: ['1x2:1', '2x2:3', '3x2:2', '3x2:5', '5x2:3', '1:1x2', '2:3x2', '3:2x2', '3:5x2', '5:3x2'],
      if: { arg: 'layoutType', eq: 'ThreeCardsLayout' },
      description: 'Соотношение колонок для ThreeCardsLayout',
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
type Story = StoryObj<LayoutProps>;

// Единственная история с динамическим выбором лейаутов и карточек
export const DynamicCards: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    layoutType: 'CardsLayout',
    cardType: 'FeaturesListCard',
    cardCount: 3,
    cols: '3',
    threeColsRatio: '2x2:3',
    horizontalGap: 'medium',
    verticalGap: 'medium',
    contentWidth: 'wide',
    animationType: 'bubbling',
    animationDelay: 150,
    isActive: true,
    isVisited: false,
  },
  render: (args) => {
    const { layoutType, cardType, cardCount, threeColsRatio, ...commonProps } = args;
    const cards = renderCards(cardType, cardCount, {
      animationType: commonProps.animationType,
      animationDelay: commonProps.animationDelay,
      isActive: commonProps.isActive,
      isVisited: commonProps.isVisited
    });
    
    const layoutTitle = layoutType === 'ThreeCardsLayout' ? 'Three Cards Layout' : 'Cards Layout';
    const subtitle = `${cardType} × ${cardCount} | ${commonProps.animationType} animation`;
  
    if (layoutType === 'ThreeCardsLayout') {
      return (
        <SlideWrapper
          title={layoutTitle}
          subtitle={subtitle}
          sign="Storybook Demo"
        >
          <ThreeCardsLayout
            colsRatio={threeColsRatio}
            horizontalGap={commonProps.horizontalGap}
            verticalGap={commonProps.verticalGap}
            contentWidth={commonProps.contentWidth}
            contentAlign={commonProps.contentAlign}
            className={commonProps.className}
            animation={{
              animationType: commonProps.animationType,
              animationDelay: commonProps.animationDelay,
              isActive: commonProps.isActive,
              isVisited: commonProps.isVisited
            }}
          >
            {cards}
          </ThreeCardsLayout>
        </SlideWrapper>
      );
    }
  
    return (
      <div style={{ height: '100vh', overflowY: 'auto' }}>
        <SlideWrapper
          title={layoutTitle}
          subtitle={subtitle}
          sign="Storybook Demo"
        >
          <CardsLayout {...commonProps}>
            {cards}
          </CardsLayout>
        </SlideWrapper>
      </div>
    );
  },
};