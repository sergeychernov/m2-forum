import React, { useEffect, useState } from 'react';
import CardsLayout from '../layouts/CardsLayout';
import QRCard from '../cards/QRCard';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const QRCodesSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  const [animateCards, setAnimateCards] = useState(false);

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
      title="Ссылки для быстрого доступа" 
      cols="2" 
      horizontalGap="large" 
      verticalGap="medium" 
      contentWidth="medium"
      footerNote="Отсканируйте QR-код камерой телефона для быстрого перехода"
      animate={animateCards}
      animationDelay={200}
    >
      <QRCard
        title="GitHub Repository"
        description="Исходный код презентации"
        url="https://github.com/sergeychernov/vibecoding-presentation"
        icon="📁"
      />
      
      <QRCard
        title="Презентация"
        description="Онлайн версия презентации"
        url="https://sergeychernov.github.io/vibecoding-presentation/"
        icon="🎯"
      />
    </CardsLayout>
  );
};

export default QRCodesSlide;