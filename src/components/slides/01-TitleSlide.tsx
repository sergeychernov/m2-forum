import React, { useState, useImperativeHandle, forwardRef, useEffect, useCallback } from 'react';
import styles from '../layouts/CardsLayout.module.css';
import titleStyles from './TitleSlide.module.css';
import ImageCard from '../cards/ImageCard';
import { SlideProps } from '../../types/KeyboardTypes';

export type TitleSlidePublicProps = {
  title: string;
  subtitle?: string;
  meme1Src?: string;
  meme2Src?: string;
};

export type TitleSlideProps = SlideProps & TitleSlidePublicProps;

const TitleSlide = forwardRef<{ onNextAction: () => boolean }, TitleSlideProps>(({
  isActive,
  isVisited,
  onRegisterSlide,
  keyboardConfig,
  updateKeyboardConfig,
  title,
  subtitle,
  meme1Src,
  meme2Src,
}, ref) => {
  const [showMeme, setShowMeme] = useState(false);
  const buildVersion = process.env.REACT_APP_BUILD_VERSION || 'dev';
  const buildNumber = process.env.REACT_APP_BUILD_NUMBER || '1';

  const handleClockClick = useCallback(() => {
    if (!showMeme) {
      setShowMeme(true);
      return true; // Действие выполнено
    }
    return false; // Действий больше нет, переходим к следующему слайду
  }, [showMeme]);

  // Экспортируем метод onNextAction для использования системой клавиатуры
  useImperativeHandle(ref, () => ({
    onNextAction: handleClockClick
  }));

  // Регистрируем слайд в системе при монтировании
  useEffect(() => {
    if (onRegisterSlide) {
      onRegisterSlide({ onNextAction: handleClockClick });
    }
  }, [onRegisterSlide, handleClockClick]);

  const publicUrl = process.env.PUBLIC_URL || '';

  return (
    <div className={`${styles.slideContent} ${titleStyles.titleSlide}`}>
      <h1>{title}</h1>
      {subtitle && (
        <p className={titleStyles.subtitle}>{subtitle}</p>
      )}

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
            <div className={titleStyles.memeImages}>
              <ImageCard
                src={`${publicUrl}${meme1Src || '/01/meme01.png'}`}
                alt="AI мем 1"
                className={titleStyles.memeImage}
                objectFit="contain"
                maxHeight="40vh"
                animationType="none"
              />
              <ImageCard
                src={`${publicUrl}${meme2Src || '/01/meme02.png'}`}
                alt="AI мем 2"
                className={titleStyles.memeImage}
                objectFit="contain"
                maxHeight="40vh"
                animationType="none"
              />
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
        <span className={titleStyles.versionText}>{buildVersion}</span>
        <span className={titleStyles.separator}>•</span>
        <span className={titleStyles.buildText}>#{buildNumber}</span>
      </div>
    </div>
  );
});

export default TitleSlide;