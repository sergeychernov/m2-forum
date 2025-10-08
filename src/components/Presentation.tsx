import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Presentation.module.css';
import { KeyboardAction, KeyboardConfig, SlideWithActions } from '../types/KeyboardTypes';
import { slideComponentRegistry } from './slide-registry';
import { SlideInstanceProvider } from './wrappers/SlideContext';
import Ajv from 'ajv';

// Реестр компонентов слайдов по имени — вынесен в отдельный модуль
const componentRegistry = slideComponentRegistry;

const Presentation: React.FC = () => {
  const { slideNumber } = useParams<{ slideNumber?: string }>();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [visitedSlides, setVisitedSlides] = useState(new Set<number>());
  const slideRefs = useRef<{ [key: number]: SlideWithActions }>({});
  const [slides, setSlides] = useState<React.ComponentType<any>[]>([]);
  const [slidePropsList, setSlidePropsList] = useState<Array<Record<string, unknown>>>([]);
  const ajvRef = useRef<any>(null);

  useEffect(() => {
    const slideNum = parseInt(slideNumber || '1', 10);
    setCurrentSlide(slideNum);
    setVisitedSlides(prev => new Set(prev).add(slideNum));
  }, [slideNumber]);

  const [keyboardConfig, setKeyboardConfig] = useState<KeyboardConfig>({
    'ArrowRight': 'nextSlide',
    'Enter': 'nextAction',
    'ArrowLeft': 'previousSlide',
    ' ': 'previousSlide', // space
  });

  // Загружаем порядок слайдов из внешнего JSON
  useEffect(() => {
    if (!ajvRef.current) {
      ajvRef.current = new Ajv({ allErrors: true } as { allErrors: true });
    }
    const loadSlides = async () => {
      try {
        const response = await fetch((process.env.PUBLIC_URL || '') + '/slides.json');
        if (!response.ok) {
          throw new Error('Failed to load slides.json');
        }
        const data: Array<{ component: string; props?: Record<string, unknown> }> = await response.json();
        const ajv = ajvRef.current!;
        // Загружаем схемы (может быть пусто, если генератор ещё не запускался)
        // Импортируем схемы статически; файл генерируется скриптом
        const { slideComponentSchemas } = await import('./slide-schemas');

        const filtered: Array<{ Comp: React.ComponentType<any>, props: Record<string, unknown> }> = [];
        for (const item of data) {
          const Comp = componentRegistry[item.component];
          if (!Comp) {
            console.warn(`Не найден компонент с именем "${item.component}" в реестре слайдов`);
            continue;
          }
          const schema = slideComponentSchemas[item.component];
          const props = item.props || {};
          if (schema) {
            const validate = ajv.compile(schema);
            const valid = validate(props);
            if (!valid) {
              console.warn(`Пропсы для слайда "${item.component}" не прошли валидацию, слайд пропущен:`, validate.errors);
              continue;
            }
          }
          filtered.push({ Comp, props });
        }

        setSlides(filtered.map(x => x.Comp));
        setSlidePropsList(filtered.map(x => x.props));
      } catch (e) {
        console.error(e);
        setSlides([
        ]);
        setSlidePropsList([{}]);
      }
    };
    loadSlides();
  }, []);

  const totalSlides = slides.length;

  const updateURL = useCallback((slideNum: number) => {
    if (slideNum === 1) {
      navigate('/');
    } else {
      navigate(`/slide/${slideNum}`);
    }
  }, [navigate]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides) {
      const newSlide = currentSlide + 1;
      updateURL(newSlide);
      setVisitedSlides(prev => {
        const newSet = new Set(prev);
        newSet.add(newSlide);
        return newSet;
      });
    }
  }, [currentSlide, totalSlides, updateURL]);

  const previousSlide = useCallback(() => {
    if (currentSlide > 1) {
      const newSlide = currentSlide - 1;
      updateURL(newSlide);
    }
  }, [currentSlide, updateURL]);

  const nextAction = useCallback(() => {
    const currentSlideRef = slideRefs.current[currentSlide];
    if (currentSlideRef && currentSlideRef.onNextAction) {
      const actionHandled = currentSlideRef.onNextAction();
      if (!actionHandled) {
        // Если действие не было обработано, переходим к следующему слайду
        if (currentSlide < totalSlides) {
          const newSlide = currentSlide + 1;
          updateURL(newSlide);
          setVisitedSlides(prev => {
            const newSet = new Set(prev);
            newSet.add(newSlide);
            return newSet;
          });
        }
      }
    } else {
      // Если у слайда нет внутренних действий, переходим к следующему слайду
      if (currentSlide < totalSlides) {
        const newSlide = currentSlide + 1;
        updateURL(newSlide);
        setVisitedSlides(prev => {
          const newSet = new Set(prev);
          newSet.add(newSlide);
          return newSet;
        });
      }
    }
  }, [currentSlide, slideRefs, totalSlides, updateURL]);

  const goToSlide = useCallback((slideNumber: number) => {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
      updateURL(slideNumber);
      setVisitedSlides(prev => {
        const newSet = new Set(prev);
        newSet.add(slideNumber);
        return newSet;
      });
    }
  }, [totalSlides, updateURL]);

  // Функция для обновления конфигурации клавиатуры
  const updateKeyboardConfig = useCallback((newConfig: Partial<KeyboardConfig>) => {
    setKeyboardConfig(prev => {
      const updated = { ...prev };
      Object.entries(newConfig).forEach(([key, action]) => {
        if (action !== undefined) {
          updated[key] = action;
        }
      });
      return updated;
    });
  }, []);

  // Функция для регистрации слайда с поддержкой действий
  const registerSlide = useCallback((slideNumber: number, slideRef: SlideWithActions) => {
    slideRefs.current[slideNumber] = slideRef;
  }, []); // Убедиться что зависимостей нет

  // Обновляем visitedSlides при изменении текущего слайда
  useEffect(() => {
    if (currentSlide >= 1 && currentSlide <= totalSlides) {
      setVisitedSlides(prev => {
        const newSet = new Set(prev);
        newSet.add(currentSlide);
        return newSet;
      });
    }
  }, [currentSlide, totalSlides]);

  // Перенаправляем на первый слайд, если URL некорректный
  useEffect(() => {
    if (totalSlides === 0) return;
    if (slideNumber && (isNaN(currentSlide) || currentSlide < 1 || currentSlide > totalSlides)) {
      navigate('/');
    }
  }, [slideNumber, currentSlide, totalSlides, navigate]);

  // Обновленная обработка клавиатуры
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const action = keyboardConfig[e.key];

      if (action) {
        e.preventDefault();

        switch (action) {
          case 'nextSlide':
            nextSlide();
            break;
          case 'previousSlide':
            previousSlide();
            break;
          case 'nextAction':
            nextAction();
            break;
        }
      }

      // Сохраняем специальные клавиши для навигации
      switch (e.key) {
        case 'Home':
          if (!e.ctrlKey) {
            e.preventDefault();
            goToSlide(1);
          }
          break;
        case 'End':
          if (!e.ctrlKey) {
            e.preventDefault();
            goToSlide(totalSlides);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keyboardConfig, goToSlide, totalSlides, nextSlide, previousSlide, nextAction]); // Добавляем функции в зависимости

  // Touch support
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!startX || !startY) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = startX - endX;
      const deltaY = startY - endY;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          nextSlide();
        } else {
          previousSlide();
        }
      }

      startX = 0;
      startY = 0;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, previousSlide]);

  const progressPercentage = (totalSlides > 0 ? (currentSlide / totalSlides) : 0) * 100;

  return (
    <div className={styles.presentationContainer}>
      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className={styles.navigation}>
        <button
          className={styles.navBtn}
          onClick={previousSlide}
          disabled={currentSlide === 1}
          style={{
            opacity: currentSlide === 1 ? 0.5 : 1,
            cursor: currentSlide === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          ← Назад
        </button>
        <span className={styles.slideCounter}>
          <span>{currentSlide}</span> / <span>{totalSlides}</span>
        </span>
        <button
          className={styles.navBtn}
          onClick={nextSlide}
          disabled={currentSlide === totalSlides}
          style={{
            opacity: currentSlide === totalSlides ? 0.5 : 1,
            cursor: currentSlide === totalSlides ? 'not-allowed' : 'pointer'
          }}
        >
          Вперед →
        </button>
      </nav>

      {/* Slides Container */}
      <div className={styles.slidesContainer}>
        {slides.map((SlideComponent, index) => {
          const slideId = index + 1;
          return (
            <div
              key={slideId}
              className={`${styles.slide} ${slideId === currentSlide
                ? styles.active
                : slideId < currentSlide
                  ? styles.prev
                  : styles.next
                }`}
              data-slide={slideId}
            >
              <SlideInstanceProvider registerSlide={(actions: SlideWithActions) => registerSlide(slideId, actions)}>
                <SlideComponent
                  isActive={slideId === currentSlide}
                  isVisited={visitedSlides.has(slideId)}
                  onRegisterSlide={(slideRef: SlideWithActions) => registerSlide(slideId, slideRef)}
                  keyboardConfig={keyboardConfig}
                  updateKeyboardConfig={updateKeyboardConfig}
                  {...(slidePropsList[index] || {})}
                />
              </SlideInstanceProvider>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Presentation;