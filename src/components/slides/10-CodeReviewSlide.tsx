import React from 'react';
import FeaturesListCard from "../cards/FeaturesListCard";
import SlideWrapper from "../SlideWrapper";
import CardsLayout from "../layouts/CardsLayout";

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const CodeReviewSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
    const pros = [
        { icon: '📦', text: 'Неиспользуемые импорты' },
        { icon: '🗑️', text: 'Неиспользуемые переменные и фрагменты кода' },
        { icon: '🔄', text: 'Повторяющаяся логика' },
        { icon: '🧩', text: 'Слишком сложные конструкции' },
    ];

    const cons = [
        { icon: '🤖', text: 'Не понимает бизнес-логику' },
        { icon: '👥', text: 'Не учитывает договоренности команды' },
        { icon: '🏗️', text: 'Предлагает нереалистичные решения' },
    ];

    return (
        <SlideWrapper
            title="Code Review"
            subtitle='Не заменит ревью от разработчиков, но облегчит им работу, благодаря первичному ревью от ИИ'
        >
            <CardsLayout
                colsRatio="1:1"
                horizontalGap="medium"
                verticalGap="medium"
                contentWidth="medium"
                animationType="bubbling"
                animationDelay={200}
                isActive={isActive}
                isVisited={isVisited}
            >
                <FeaturesListCard
                    title="Достоинства"
                    category="ИИ может быстро проанализировать пулл-реквест и исправить базовые проблемы"
                    features={pros}
                />

                <FeaturesListCard
                    title="Недостатки"
                    category="Более сложные моменты все равно требуют ревью от разработчика"
                    features={cons}
                />
            </CardsLayout>
        </SlideWrapper>
    );
};

export default CodeReviewSlide;