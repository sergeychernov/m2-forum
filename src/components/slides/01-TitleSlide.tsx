import React from 'react';
import styles from '../layouts/CardsLayout.module.css';
import titleStyles from './TitleSlide.module.css';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const TitleSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  const buildVersion = process.env.REACT_APP_BUILD_VERSION || 'dev';
  const buildDate = process.env.REACT_APP_BUILD_DATE || new Date().toLocaleDateString('ru-RU');
  const buildNumber = process.env.REACT_APP_BUILD_NUMBER || '1';

  return (
    <div className={`${styles.slideContent} ${titleStyles.titleSlide}`}>
      <h1>Использование AI инструментов в разработке</h1>
      <p className={titleStyles.subtitle}>Опыт внедрения и анализ эффективности</p>
      
      <div className={titleStyles.repositoryLink}>
        <a 
          href="https://github.com/sergeychernov/vibecoding-presentation" 
          target="_blank" 
          rel="noopener noreferrer"
          className={titleStyles.repoLink}
        >
          📁 GitHub Repository
        </a>
      </div>
      
      <div className={titleStyles.versionInfo}>
        <div className={titleStyles.versionItem}>
          <span className={titleStyles.versionLabel}>Версия:</span>
          <span className={titleStyles.versionValue}>{buildVersion}</span>
        </div>
        <div className={titleStyles.versionItem}>
          <span className={titleStyles.versionLabel}>Дата сборки:</span>
          <span className={titleStyles.versionValue}>{buildDate}</span>
        </div>
        <div className={titleStyles.versionItem}>
          <span className={titleStyles.versionLabel}>Сборка №:</span>
          <span className={titleStyles.versionValue}>{buildNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default TitleSlide;