import React, { useEffect, useState } from 'react';
import CardsLayout from '../layouts/CardsLayout';
import ConclusionCard from '../cards/ConclusionCard';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const ConclusionsSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  const [animateCards, setAnimateCards] = useState(false);

  const conclusions = [
    {
      text: 'AI инструменты значительно повышают продуктивность в большинстве задач. В нашей команде AI как новый сотрудник — потеряв одного старшего разработчика, производительность осталась прежней',
      hasChart: true
    },
    {
      text: 'Наибольшая эффективность достигается в задачах документации и генерации кода',
      hasChart: false
    },
    {
      text: 'Платные Cursor и trae.ai отличаются интерфейсом и тарифами, оба отлично работают с gemini и claude. Модели удобно переключать, если они начинают галюцинировать. Комбинируйте разные инструменты для максимальной эффективности',
      hasChart: false
    },
    {
      text: 'Чтобы разработчику увеличить производительность потребуется 2-3 месяца, чтобы выработался специфический навык формулирования и декомпозиции. Требуется время на изучение и адаптацию под специфику проекта',
      hasChart: false
    },
    {
      text: 'Всегда проверяйте и тестируйте сгенерированный код',
      hasChart: false
    },
    {
      text: 'Используйте AI как помощник, а не замену собственных знаний. Важно поддерживать баланс между автоматизацией и человеческим контролем',
      hasChart: false
    }
  ];

  useEffect(() => {
    if (isActive && !isVisited) {
      const timer = setTimeout(() => {
        setAnimateCards(true);
      }, 500);
      return () => clearTimeout(timer);
    } else if (isVisited) {
      setAnimateCards(true);
    }
  }, [isActive, isVisited]);

  const PerformanceChart = () => (
    <div style={{ padding: 'var(--space-16)' }}>
      <svg width="300" height="120" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="120" fill="var(--color-bg-1)" rx="8"></rect>
        
        <defs>
          <pattern id="grid" width="50" height="20" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 20" fill="none" stroke="rgba(var(--color-slate-500-rgb), 0.1)" strokeWidth="1"></path>
          </pattern>
          <filter id="chartGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="300" height="120" fill="url(#grid)"></rect>
        
        <text x="15" y="95" fontSize="10" fill="var(--color-text-secondary)" textAnchor="middle">20</text>
        <text x="15" y="75" fontSize="10" fill="var(--color-text-secondary)" textAnchor="middle">30</text>
        <text x="15" y="55" fontSize="10" fill="var(--color-text-secondary)" textAnchor="middle">40</text>
        <text x="15" y="35" fontSize="10" fill="var(--color-text-secondary)" textAnchor="middle">50</text>
        
        <text x="50" y="110" fontSize="10" fill="var(--color-text-secondary)" textAnchor="middle">Фев</text>
        <text x="90" y="110" fontSize="10" fill="var(--color-text-secondary)" textAnchor="middle">Мар</text>
        <text x="130" y="110" fontSize="10" fill="var(--color-text-secondary)" textAnchor="middle">Апр</text>
        <text x="170" y="110" fontSize="10" fill="var(--color-text-secondary)" textAnchor="middle">Май</text>
        <text x="210" y="110" fontSize="10" fill="var(--color-text-secondary)" textAnchor="middle">Июн</text>
        <text x="250" y="110" fontSize="10" fill="var(--color-text-secondary)" textAnchor="middle">Июл</text>
        
        <polyline 
          points="50,90 90,88 130,32 170,68 210,71 250,30" 
          fill="none" 
          stroke="#00d4ff" 
          strokeWidth="3" 
          strokeLinejoin="round" 
          strokeLinecap="round"
          filter="url(#chartGlow)"
        />
        
        <circle cx="50" cy="90" r="4" fill="#00d4ff" filter="url(#chartGlow)"></circle>
        <circle cx="90" cy="88" r="4" fill="#00d4ff" filter="url(#chartGlow)"></circle>
        <circle cx="130" cy="32" r="4" fill="#00d4ff" filter="url(#chartGlow)"></circle>
        <circle cx="170" cy="68" r="4" fill="#00d4ff" filter="url(#chartGlow)"></circle>
        <circle cx="210" cy="71" r="4" fill="#00d4ff" filter="url(#chartGlow)"></circle>
        <circle cx="250" cy="30" r="5" fill="#ff6b6b" stroke="#fff" strokeWidth="2" filter="url(#chartGlow)"></circle>
        
        <text x="50" y="85" fontSize="10" fontWeight="600" fill="var(--color-text)" textAnchor="middle">22</text>
        <text x="90" y="83" fontSize="10" fontWeight="600" fill="var(--color-text)" textAnchor="middle">23</text>
        <text x="130" y="27" fontSize="10" fontWeight="600" fill="var(--color-text)" textAnchor="middle">53</text>
        <text x="170" y="63" fontSize="10" fontWeight="600" fill="var(--color-text)" textAnchor="middle">34</text>
        <text x="210" y="66" fontSize="10" fontWeight="600" fill="var(--color-text)" textAnchor="middle">32</text>
        <text x="250" y="25" fontSize="10" fontWeight="600" fill="#ff6b6b" textAnchor="middle">54</text>
        
        <line x1="250" y1="35" x2="270" y2="15" stroke="#ff6b6b" strokeWidth="2" strokeDasharray="3,3"></line>
        <text x="275" y="12" fontSize="8" fill="#ff6b6b" fontWeight="500">Уход старшего</text>
        <text x="275" y="22" fontSize="8" fill="#ff6b6b" fontWeight="500">разработчика</text>
      </svg>
    </div>
  );

  return (
    <CardsLayout 
      title="Выводы и перспективы" 
      cols="2" 
      horizontalGap="medium" 
      verticalGap="medium" 
      contentWidth="wide"
      scrollable={true}
      animate={animateCards}
      animationDelay={250}
    >
      {conclusions.map((conclusion, index) => (
        <ConclusionCard
          key={index}
          text={conclusion.text}
          hasChart={conclusion.hasChart}
          index={index}
          chart={conclusion.hasChart ? <PerformanceChart /> : undefined}
        />
      ))}
    </CardsLayout>
  );
};

export default ConclusionsSlide;