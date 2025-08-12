import React from 'react';
import Img from '../../assets/img/regex-example.png';
import CardsLayout from '../layouts/CardsLayout';
import { PointsList } from '../blocks/PointsList';
import BlockLayout from "../layouts/BlockLayout";

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
        <BlockLayout
            title="Регулярные выражения и не только"
            subtitle='ИИ помогает с редко используемыми задачами, когда легко ошибиться или забыть синтаксис'
            layoutType="grid"
            cols="2"
            colsRatio="2:3"
            contentWidth="medium"
            contentAlign="center"
            animationType={isActive ? 'fade' : 'none'}
            animationDelay={200}
            isActive={isActive}
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
        </BlockLayout>
    );
};

export default RegexSlide;