# AI Tools Presentation

Презентация об использовании AI инструментов в разработке - опыт внедрения и анализ эффективности.

## 🚀 Просмотр презентации

**[Открыть презентацию](https://sergeychernov.github.io/m2-forum/)**

## 📋 Содержание презентации

1. **Титульный слайд** - Введение в тему
2. **Обзор инструментов** - Основные AI инструменты для разработки
3. **Модели и технологии** - Используемые языковые модели
4. **Результаты внедрения** - Конкретные задачи и достижения
5. **Выводы и перспективы** - Анализ эффективности и планы
6. **QR-коды** - Быстрый доступ к ресурсам

---

## 🔧 Создание собственной презентации

### Вариант 1: Обычный форк через GitHub

#### Шаг 1: Создание форка

1. **Форкните репозиторий:**
   - Нажмите кнопку "Fork" в правом верхнем углу этой страницы
   - Выберите свой аккаунт GitHub как место назначения

2. **Клонируйте форк на локальную машину:**
   ```bash
   git clone https://github.com/ВАШ_USERNAME/m2-forum.git
   cd m2-forum
   ```

3. **Установите зависимости:**
   ```bash
   npm install
   ```

#### Шаг 2: Настройка GitHub Pages

1. **Обновите package.json:**
   ```json
   {
     "homepage": "https://ВАШ_USERNAME.github.io/m2-forum"
   }
   ```

2. **Включите GitHub Pages:**
   - Перейдите в Settings вашего репозитория
   - Найдите раздел "Pages" в левом меню
   - В разделе "Source" выберите **"GitHub Actions"** (не "Deploy from a branch")
   - Workflow уже настроен в `.github/workflows/deploy.yml`

3. **Запушьте изменения:**
   ```bash
   git add .
   git commit -m "Update homepage URL"
   git push origin main
   ```

### Вариант 2: Автоматическое создание собственного репозитория

Если вы хотите создать собственный репозиторий (не форк), используйте встроенный скрипт:

#### Предварительная настройка

1. **Установите GitHub CLI:**
   ```bash
   brew install gh
   ```

2. **Авторизуйтесь в GitHub:**
   ```bash
   gh auth login
   ```

#### Создание нового репозитория

```bash
npm run fork новое-имя-репозитория
```

Этот скрипт автоматически:
- Создаст новый приватный репозиторий на GitHub
- Склонирует текущий код в новую папку
- Настроит правильные git remote
- Запушит код в новый репозиторий

**Пример:**
```bash
npm run fork my-presentation
```

После выполнения скрипта:
1. Перейдите в созданную папку: `cd ../my-presentation`
2. Обновите `package.json` с новым URL
3. Настройте GitHub Pages как описано выше

### Шаг 3: Настройка контента

#### Обновление слайдов

Все слайды находятся в папке `src/components/slides/`:

- `TitleSlide.tsx` - Титульный слайд
- `ToolsOverviewSlide.tsx` - Обзор инструментов
- `ModelsSlide.tsx` - Модели и технологии
- `ResultsSlide.tsx` - Результаты
- `ConclusionsSlide.tsx` - Выводы
- `QRCodesSlide.tsx` - QR-коды и ссылки

#### Обновление стилей

- `src/styles/variables.css` - Основные переменные (цвета, шрифты)
- Каждый компонент имеет свой `.module.css` файл

#### Добавление нового слайда

1. **Создайте новый компонент слайда:**
   ```tsx
   // src/components/slides/MyNewSlide.tsx
   import React from 'react';
   import CardsLayout from '../layouts/CardsLayout';
   import SlideWrapper from '../SlideWrapper';
   import FeaturesListCard from '../cards/FeaturesListCard';

   interface SlideProps {
     isActive: boolean;
     isVisited: boolean;
   }

   const MyNewSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
     return (
       <SlideWrapper 
         title="Мой новый слайд"
         cardVariant="default"  // Задаем единый стиль для всех карточек
       >
         <CardsLayout
           cols="2"
           isActive={isActive}
           isVisited={isVisited}
         >
           <FeaturesListCard 
             title="Карточка 1"
             features={[/* ваши данные */]}
           />
           {/* Другие карточки автоматически получат cardVariant="default" */}
         </CardsLayout>
       </SlideWrapper>
     );
   };

   export default MyNewSlide;
   ```

2. **Добавьте слайд в презентацию:**
   ```tsx
   // src/components/Presentation.tsx
   import MyNewSlide from './slides/MyNewSlide';

   const slides = [
     { id: 1, component: TitleSlide },
     // ... другие слайды
     { id: 7, component: MyNewSlide }, // Новый слайд
   ];

   const totalSlides = 7; // Обновите количество
   ```

### Шаг 4: Локальная разработка

```bash
# Запуск в режиме разработки
npm start

# Сборка для продакшена
npm run build

# Деплой на GitHub Pages (если настроен gh-pages)
npm run deploy
```

### Шаг 5: Автоматический деплой

После настройки GitHub Pages каждый push в ветку `main` автоматически:
1. Собирает проект
2. Деплоит на GitHub Pages
3. Обновляет версию и дату сборки

**⚠️ Важно:** Убедитесь, что в настройках GitHub Pages выбран источник **"GitHub Actions"**, а не "Deploy from a branch".

---

## 🎨 Кастомизация

### Цветовая схема

Измените переменные в `src/styles/variables.css`:

```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  /* ... другие цвета */
}
```

### Унифицированные стили карточек

Все карточки используют компонент `CardWrapper` для единообразного внешнего вида. Вы можете управлять стилями карточек на уровне слайда с помощью свойства `cardVariant`:

#### Доступные варианты карточек:

- `default` - Стандартный стиль с базовой тенью
- `elevated` - Приподнятый стиль с более выраженной тенью
- `outlined` - Стиль с обводкой без тени
- `minimal` - Минималистичный стиль без теней и обводок

#### Использование cardVariant:

```tsx
// В SlideWrapper можно задать единый стиль для всех карточек на слайде
<SlideWrapper
  title="Заголовок слайда"
  cardVariant="elevated"  // Все карточки будут с приподнятым стилем
>
  <CardsLayout>
    <FeaturesListCard title="Карточка 1" />
    <QRCard title="Карточка 2" />
  </CardsLayout>
</SlideWrapper>
```

#### Преимущества единого стиля:

- **Визуальная согласованность** - все карточки на слайде имеют одинаковые тени и обводки
- **Простота управления** - один параметр на уровне слайда вместо настройки каждой карточки
- **Гибкость** - разные слайды могут использовать разные стили карточек

### Компоненты карточек

Доступные типы карточек:
- `FeaturesListCard` - Для списка функций (заменяет ToolCard)
- `ModelCard` - Для моделей
- `TaskCard` - Для задач
- `QRCard` - Для QR-кодов
- `ConclusionCard` - Для выводов
- `PointsCard` - Для отображения очков/баллов

Все карточки автоматически наследуют стиль, заданный через `cardVariant` в `SlideWrapper`.

### Управление размещением карточек в сетке

Для управления тем, сколько колонок или строк занимает карточка в сетке, используйте компонент `GridSpan`:

#### Импорт:
```tsx
import GridSpan from '../wrappers/GridSpan';
```

#### Основное использование:
```tsx
// Карточка на 2 колонки
<CardsLayout cols="3">
  <GridSpan cols={2}>
    <FeaturesListCard title="Широкая карточка" />
  </GridSpan>
  <FeaturesListCard title="Обычная карточка" />
</CardsLayout>

// Карточка на 2 строки
<CardsLayout cols="2">
  <GridSpan rows={2}>
    <FeaturesListCard title="Высокая карточка" />
  </GridSpan>
  <FeaturesListCard title="Карточка 1" />
  <FeaturesListCard title="Карточка 2" />
</CardsLayout>

// Карточка на 2 колонки и 2 строки (большой блок)
<CardsLayout cols="3">
  <GridSpan cols={2} rows={2}>
    <FeaturesListCard title="Большая карточка" />
  </GridSpan>
  <FeaturesListCard title="Маленькая 1" />
  <FeaturesListCard title="Маленькая 2" />
  <FeaturesListCard title="Маленькая 3" />
  <FeaturesListCard title="Маленькая 4" />
</CardsLayout>
```

#### Свойства GridSpan:
- `cols` (number, по умолчанию 1) - количество колонок для занятия
- `rows` (number, по умолчанию 1) - количество строк для занятия
- `className` (string) - дополнительные CSS классы

#### Особенности:
- **Адаптивность**: на мобильных устройствах (< 768px) автоматически сбрасывается до 1 колонки/строки
- **Универсальность**: работает с любыми дочерними компонентами
- **Гибкость**: можно комбинировать cols и rows для создания блоков любого размера

### Макеты

- `CardsLayout` - Основной макет с сеткой карточек
- Поддержка различных размеров сетки (1-4 колонки, auto)
- Настройка отступов и ширины контента
- Автоматическая передача `cardVariant` всем дочерним карточкам
- Совместимость с `GridSpan` для управления размещением карточек

## 🖼️ Работа с изображениями

### Структура папок для изображений

Изображения размещаются в папке `public/` с организацией по слайдам.

Приложение настроено для GitHub Pages с базовым путем /m2-forum/ . Нужно использовать переменную окружения PUBLIC_URL или process.env.PUBLIC_URL для правильного формирования путей к изображениям.


---

## 📱 Возможности

- ✅ Адаптивный дизайн
- ✅ Навигация клавиатурой (стрелки, пробел, Home, End)
- ✅ Поддержка touch-жестов
- ✅ Анимации появления карточек
- ✅ Прогресс-бар
- ✅ URL-роутинг для слайдов
- ✅ Автоматический деплой на GitHub Pages

---

## 🛠 Технологии

- **React 19** с TypeScript
- **CSS Modules** для стилизации
- **React Router** для навигации
- **GitHub Actions** для автоматического деплоя
- **QR Code генерация** для быстрого доступа

---

## 📝 Лицензия

Этот проект создан как шаблон для презентаций. Вы можете свободно использовать его для создания собственных презентаций.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
