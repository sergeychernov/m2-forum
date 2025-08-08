import React, { useState } from 'react';
import styles from '../layouts/CardsLayout.module.css';
import titleStyles from './TitleSlide.module.css';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const TitleSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  const [showMeme, setShowMeme] = useState(false);
  const buildVersion = process.env.REACT_APP_BUILD_VERSION || 'dev';
  const buildNumber = process.env.REACT_APP_BUILD_NUMBER || '1';

  const handleClockClick = () => {
    setShowMeme(true);
  };

  return (
    <div className={`${styles.slideContent} ${titleStyles.titleSlide}`}>
      <h1>Использование AI инструментов в команде CMS</h1>
      <p className={titleStyles.subtitle}>Опыт внедрения и анализ эффективности</p>
      
      <div className={titleStyles.clockContainer} onClick={handleClockClick}>
        {!showMeme ? (
          <div className={titleStyles.animatedClock}>
            <div className={titleStyles.clockFace}>
              <div className={titleStyles.clockNumbers}>
                <span className={titleStyles.number12}>12</span>
                <span className={titleStyles.number3}>3</span>
                <span className={titleStyles.number6}>6</span>
                <span className={titleStyles.number9}>9</span>
              </div>
              <div className={titleStyles.clockHands}>
                <div className={titleStyles.hourHand}></div>
                <div className={titleStyles.minuteHand}></div>
                <div className={titleStyles.secondHand}></div>
                <div className={titleStyles.clockCenter}></div>
              </div>
            </div>
            <div className={titleStyles.clockLabel}>Время для AI!</div>
          </div>
        ) : (
          <div className={titleStyles.memeContainer}>
            <div className={titleStyles.memeImage}>🤖</div>
            <div className={titleStyles.memeText}>
              <div>Когда AI делает твою работу</div>
              <div>за 5 минут вместо 5 часов</div>
            </div>
          </div>
        )}
      </div>
      
      <div className={titleStyles.authorshipInfo}>
        <a 
          href="https://github.com/sergeychernov/m2-forum" 
          target="_blank" 
          rel="noopener noreferrer"
          className={titleStyles.authorLink}
        >
          📁 sergeychernov/m2-forum
        </a>
        <span className={titleStyles.separator}>•</span>
        <span className={titleStyles.versionText}>v{buildVersion}</span>
        <span className={titleStyles.separator}>•</span>
        <span className={titleStyles.buildText}>#{buildNumber}</span>
      </div>
    </div>
  );
};

export default TitleSlide;