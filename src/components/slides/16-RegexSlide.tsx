import React from 'react';
import { PointsList } from '../blocks/PointsList';
import SlideWrapper from "../blocks/SlideWrapper";
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
                <img
                    alt="ИИ помогает в разработке пример регулярки"
                    style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '400px',
                        objectFit: 'contain',
                        borderRadius: '8px'
                    }}
                    src="/public/img/regex-example.png"
                />
            </CardsLayout>
        </SlideWrapper>
    );
};

export default RegexSlide;