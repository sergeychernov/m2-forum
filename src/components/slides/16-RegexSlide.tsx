import React from 'react';
import Img from '../../assets/img/regex-example.png';
import CardsLayout from '../layouts/CardsLayout';
import { PointsList } from '../blocks/PointsList';

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
        <CardsLayout
            title="Регулярные выражения и не только"
            subtitle='ИИ помогает с редко используемыми задачами, когда легко ошибиться или забыть синтаксис'
            cols="2"
            colsRatio="2:3"
            horizontalGap="medium"
            verticalGap="medium"
            contentWidth="medium"
            contentAlign="center"
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
                src={Img}
            />
        </CardsLayout>
    );
};

export default RegexSlide;