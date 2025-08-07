import React from 'react';
import CardsLayout from '../layouts/CardsLayout';
import QRCard from '../cards/QRCard';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const QRCodesSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <CardsLayout 
      title="Ссылки для быстрого доступа" 
      cols="2" 
      horizontalGap="large" 
      verticalGap="medium" 
      contentWidth="medium"
      footerNote="Отсканируйте QR-код камерой телефона для быстрого перехода"
      animationType="ghost"
      animationDelay={200}
      isActive={isActive}
      isVisited={isVisited}
    >
      <QRCard
        title="GitHub Repository"
        description="Исходный код презентации"
        url="https://github.com/sergeychernov/m2-forum"
        icon="📁"
      />
      
      <QRCard
        title="Презентация"
        description="Онлайн версия презентации"
        url="https://sergeychernov.github.io/m2-forum/"
        icon="🎯"
      />
    </CardsLayout>
  );
};

export default QRCodesSlide;