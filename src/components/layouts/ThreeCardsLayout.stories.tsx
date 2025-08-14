import type { Meta, StoryObj } from '@storybook/react';
import ThreeCardsLayout from './ThreeCardsLayout';
import ConclusionCard from '../cards/ConclusionCard';
import FeaturesListCard from '../cards/FeaturesListCard';
import ImageCard from '../cards/ImageCard';
import ModelCard from '../cards/ModelCard';
import PointsList from '../cards/PointsList';
import QRCard from '../cards/QRCard';
import TaskCard from '../cards/TaskCard';
import ToolCard from '../cards/ToolCard';
import CardsLayout from "./CardsLayout";

// Типы карточек
const CARD_TYPES = {
    ConclusionCard: 'ConclusionCard',
    FeaturesListCard: 'FeaturesListCard',
    ImageCard: 'ImageCard',
    ModelCard: 'ModelCard',
    PointsList: 'PointsList',
    QRCard: 'QRCard',
    TaskCard: 'TaskCard',
    ToolCard: 'ToolCard'
} as const;

type CardType = keyof typeof CARD_TYPES;

// Тип для props
type ThreeCardsLayoutProps = React.ComponentProps<typeof ThreeCardsLayout> & {
    cardType: CardType;
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
    {
        title: 'Unit тесты',
        description: 'Отлично генерирует тесты и моки',
        tool: 'cursor, gpt',
        rating: 'excellent' as const,
        icon: '⚡'
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
    {
        title: 'Demo',
        url: 'https://demo.example.com',
        description: 'Демо приложения',
        icon: '🎮'
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
    {
        text: 'Планы на будущее',
        index: 2
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
    {
        title: 'Cursor',
        category: 'AI IDE',
        features: sampleFeatures,
        note: { type: 'advantage' as const, text: 'Встроенный ИИ помощник' }
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
    {
        src: '/img/end-to-end-images.jpeg',
        alt: 'Another illustration',
        maxHeight: '200px'
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
    {
        items: [
            'Инновационные решения',
            'Современные технологии',
            'Надежная архитектура'
        ],
        bulletColor: '#722ed1'
    },
];

// Функция для рендеринга карточек по типу
const renderCards = (cardType: CardType) => {
    const cards = [];

    for (let i = 0; i < 3; i++) {
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

const meta: Meta<ThreeCardsLayoutProps> = {
    title: 'Layouts/ThreeCardsLayout',
    component: ThreeCardsLayout,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        cardType: {
            control: { type: 'select' },
            options: Object.keys(CARD_TYPES),
            description: 'Тип карточек для отображения',
        },
        colsRatio: {
            control: { type: 'select' },
            options: [
                '1x2:1', '2x2:3', '3x2:2', '3x2:5', '5x2:3',
                '1:1x2', '2:3x2', '3:2x2', '3:5x2', '5:3x2'
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
        contentAlign: {
            control: { type: 'select' },
            options: ['top', 'center', 'bottom'],
        },
        animation: {
            control: { type: 'object' },
        },
    },
};

export default meta;
type Story = StoryObj<ThreeCardsLayoutProps>;

// История с динамическим выбором карточек
export const DynamicCards: Story = {
    args: {
        cardType: 'FeaturesListCard',
        colsRatio: '1x2:1',
        horizontalGap: 'medium',
        verticalGap: 'medium',
        contentWidth: 'wide',
        contentAlign: 'top',
        animation: {
            animationType: 'bubbling',
            animationDelay: 150,
            isActive: true,
            isVisited: false
        },
    },
    render: (args) => {
        const { cardType, ...layoutProps } = args;
        return (
            <ThreeCardsLayout {...layoutProps}>
                {renderCards(cardType)}
            </ThreeCardsLayout>
        );
    },
};