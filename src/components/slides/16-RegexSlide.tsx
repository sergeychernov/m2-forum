import React from 'react';
import { PointsList } from '../cards/PointsList';
import ImageCard from '../cards/ImageCard';
import SlideWrapper from "../SlideWrapper";
import CardsLayout from "../layouts/CardsLayout";

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const RegexSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
    const features = [
        'Валидация сложных данных (телефоны, email, пароли)',
        'Парсинг и форматирование дат/времени',
        'Обработка и фильтрация JSON-ответов API',
        'Рефакторинг и оптимизация существующего кода',
        'Генерация тестовых данных и моков'
    ];

    return (
        <SlideWrapper
            title="Регулярные выражения и не только"
            subtitle='ИИ помогает с редко используемыми задачами, когда легко ошибиться или забыть синтаксис'
        >
            <CardsLayout
                colsRatio="2:3"
                horizontalGap="medium"
                verticalGap="medium"
                contentWidth="medium"
                animationType="bubbling"
                animationDelay={200}
                isActive={isActive}
                isVisited={isVisited}
            >
                <PointsList items={features} />
                <ImageCard
                    src={`${process.env.PUBLIC_URL}/img/regex-example.png`}
                    alt="ИИ помогает в разработке пример регулярки"
                    maxHeight="400px"
                    objectFit="contain"
                />
            </CardsLayout>
        </SlideWrapper>
    );
};

export default RegexSlide;