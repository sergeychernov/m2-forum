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

## ⌨️ Управление презентацией

Презентация поддерживает полноценное управление с клавиатуры, что делает её совместимой с **пультами для презентаций** и удобной для выступлений.

### Основные клавиши навигации

| Клавиша | Действие | Описание |
|---------|----------|----------|
| `→` (Стрелка вправо) | Следующий слайд | Переход к следующему слайду |
| `Enter` | Следующий слайд | Альтернативный способ перехода вперёд |
| `←` (Стрелка влево) | Предыдущий слайд | Возврат к предыдущему слайду |
| `Пробел` | Следующее действие | Выполнение следующего шага внутри текущего слайда (анимации, интерактив) или переход к следующему слайду, если действий больше нет |
| `Home` | Первый слайд | Быстрый переход к началу презентации |
| `End` | Последний слайд | Быстрый переход к концу презентации |

### Сенсорное управление

- **Свайп влево** - следующий слайд
- **Свайп вправо** - предыдущий слайд
- **Тап по элементам** - интерактивные действия (например, показ мемов на титульном слайде)

### Совместимость с пультами для презентаций

Презентация полностью совместима с популярными пультами для презентаций:

- **Logitech Spotlight/R400/R500** - используют стрелки и пробел
- **Kensington Wireless Presenter** - стандартные клавиши навигации
- **DIKI Wireless Presenter** - поддержка всех основных команд
- **Любые USB/Bluetooth пульты** - работают как обычная клавиатура

### Интерактивные элементы

Некоторые слайды содержат интерактивные элементы:

- **Титульный слайд**: Клик по часам или нажатие `Пробел` показывает мем
- **Карточки с изображениями**: Клик открывает изображение в полноэкранном режиме
- **QR-коды**: Интерактивные ссылки для быстрого доступа

### Настройка клавиш

Система поддерживает настройку клавиатурных биндингов через код:

```typescript
const keyboardConfig = {
  'ArrowRight': 'nextSlide',     // → следующий слайд
  'Enter': 'nextSlide',          // Enter следующий слайд  
  'ArrowLeft': 'previousSlide',  // ← предыдущий слайд
  ' ': 'nextAction',             // Пробел следующее действие
};
```

### Как добавить действия на слайд (для разработчиков)

Действия — это последовательные шаги внутри слайда, запускаемые событием `nextAction`; конкретная клавиша задаётся биндингом в `src/components/Presentation.tsx` (объект `keyboardConfig`). По умолчанию `nextAction` привязан к `Enter`, а `Пробел` — к `previousSlide`.  
Чтобы слайд поддерживал действия:

1) Оберните компонент слайда в `forwardRef` и пробросьте `ref` в `SlideWrapper`.  
2) Внутри слайда делегируйте метод `onNextAction` в `SlideWrapper` через `useImperativeHandle`.  
3) Передайте в `SlideWrapper` проп `onRegisterSlideActions`, который вызывает `onRegisterSlide` из пропсов слайда — так презентация узнаёт о доступных действий.  
4) Используйте механизмы действий:
   - Пошаговые анимации карточек задаются через `CardsLayout` (`animationType`, `animationDelay`, и пр.) — каждое появление считается отдельным действием.
   - Полноэкранный режим у `ImageCard` включается `enableFullscreen={true}` — это добавляет действие открытия/закрытия изображения.

### Как слайд находит интерактивные карточки

SlideWrapper рекурсивно обходит дерево дочерних элементов и считает карточку интерактивной ТОЛЬКО если сам компонент карточки предоставляет статический метод `isInteractive(props)` и он возвращает `true`.  
Если у компонента нет метода `isInteractive`, он рассматривается как НЕинтерактивный и не участвует в последовательности действий.

Готовые компоненты:
- ImageCard: интерактивна, если `enableFullscreen === true`.
- MarkdownCard: интерактивна, если `enableFullscreen === true` и в контенте есть изображения (Markdown или HTML).

Требования к собственным интерактивным карточкам:
- Экспортируйте ref c интерфейсом `InteractiveRef` (методы `openFullscreen()` и `closeFullscreen()`), например через `forwardRef` + `useImperativeHandle`.
- Определите статический метод `isInteractive(props): boolean`, который решает, интерактивен ли компонент на основе его пропсов.

Пример минимального слайда с поддержкой действий:

```tsx
// src/components/slides/MyInteractiveSlide.tsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import SlideWrapper from '../wrappers/SlideWrapper';
import CardsLayout from '../layouts/CardsLayout';
import ImageCard from '../cards/ImageCard';
import { SlideProps } from '../../types/KeyboardTypes';

const MyInteractiveSlide = forwardRef<{ onNextAction: () => boolean }, SlideProps>(({
  isActive, isVisited, onRegisterSlide, keyboardConfig, updateKeyboardConfig
}, ref) => {
  const slideWrapperRef = useRef<{ onNextAction: () => boolean }>(null);

  useImperativeHandle(ref, () => ({
    onNextAction: () => slideWrapperRef.current?.onNextAction() || false
  }));

  return (
    <SlideWrapper
      ref={slideWrapperRef}
      title="Пример слайда с действиями"
      onRegisterSlideActions={(actions) => onRegisterSlide?.(actions)}
    >
      <CardsLayout
        animationType="appearance"  // карточки появляются по шагам (nextAction)
        animationDelay={150}
        isActive={isActive}
        isVisited={isVisited}
      >
        {/* Появление элементов будет разбито на шаги nextAction */}
        <ImageCard
          src="/img/example.png"
          alt="Пример"
          enableFullscreen={true}  // добавляет действие fullscreen
          maxHeight="400px"
        />
      </CardsLayout>
    </SlideWrapper>
  );
});

export default MyInteractiveSlide;
```

Чеклист:
- forwardRef + slideWrapperRef + `useImperativeHandle` для делегирования `onNextAction`.  
- Проброс `onRegisterSlideActions={(actions) => onRegisterSlide?.(actions)}` в `SlideWrapper`.  
- Для пошаговых анимаций — настройте `CardsLayout.animationType`.  
- Для полноэкранного изображения — `ImageCard` с `enableFullscreen={true}`.  
- Если на слайде нет доступных действий — `Пробел` сразу переключает на следующий слайд.

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

Все слайды располагаются в папке `src/components/slides/`. Конкретный набор и имена файлов могут меняться со временем — ориентируйтесь на актуальное содержимое директории.

Рекомендации:
- Подключайте новые слайды в `src/components/Presentation.tsx` (массив `slides`).
- Для заголовка, единого стиля карточек и шагов действий используйте `SlideWrapper`.
- Для пошагового появления элементов применяйте `CardsLayout` и его параметры анимации.
- Интерактивность карточек определяется только статическим методом `isInteractive(props)` внутри самих компонентов карточек (без общего пропса `interactive`). Примеры:
  - `ImageCard`: интерактивна, если `enableFullscreen === true`.
  - `MarkdownCard`: интерактивна, если `enableFullscreen === true` и в контенте есть изображения.

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

Все карточки поддерживают унифицированную систему стилей через `CardWrapper`:

#### Цветовые варианты фонов:
- `white` - белый фон (темный текст)
- `gray` - серый градиент
- `black` - черный градиент
- `red` - красный градиент
- `green` - зеленый градиент
- `blue` - синий градиент
- `purple` - фиолетовый градиент
- `pink` - розовый градиент
- `cyan` - голубой градиент
- `orange` - оранжевый градиент
- `yellow` - желтый градиент

#### Автоматическое наследование цвета текста:

Все текстовые элементы в карточках автоматически адаптируются к цвету фона:
- **На белом фоне** (`white`) - темный текст
- **На цветных фонах** (`gray`, `black`, `red`, `green`, `blue`, `purple`, `pink`, `cyan`, `orange`, `yellow`) - белый текст

Это достигается через CSS-свойство `color: inherit` в следующих элементах:
- Заголовки (`h1`, `h2`, `h3`)
- Описания и основной текст (`p`)
- Маркеры списков (bullet points)
- Ссылки и интерактивные элементы

#### Пример использования:
```tsx
// Карточка с оранжевым фоном и белым текстом
<PointsCard
  description="Основные возможности"
  points={["Пункт 1", "Пункт 2", "Пункт 3"]}
  background="warning"
/>

// Карточка с фиолетовым фоном и белым текстом
<TaskCard
  title="Задача"
  description="Описание задачи"
  background="purple"
/>
```

#### Преимущества системы:
- **Автоматическая адаптация** - не нужно вручную настраивать цвет текста
- **Консистентность** - единообразный внешний вид всех карточек
- **Простота управления** - один параметр на уровне слайда вместо настройки каждой карточки
- **Гибкость** - разные слайды могут использовать разные стили карточек
- **Доступность** - автоматическое обеспечение контрастности текста

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
- `MarkdownCard` - Для отображения Markdown-контента с поддержкой графиков и изображений

#### MarkdownCard

Компонент для отображения Markdown-контента с расширенными возможностями:

##### Основные свойства:
- `content` (string, обязательно) - Markdown-текст для отображения
- `index` (number, обязательно) - Индекс карточки для анимаций
- `borderAccent` (BorderAccent, необязательно) - Цвет или градиент границы карточки
- `hasChart` (boolean, по умолчанию false) - Включает отображение графика
- `chart` (React.ReactNode) - React-компонент графика для отображения
- `animationType` - Тип анимации появления карточки
- `animationIndex` - Индекс для анимации
- `animationDelay` - Задержка анимации
- `isActive` / `isVisited` - Состояния для анимаций
- `background` - Фоновая тема карточки

##### Настройка границ карточек:

Свойство `borderAccent` позволяет настроить цвет или градиент левой границы карточки:

```tsx
// Одноцветная граница
<MarkdownCard
  content="## Заголовок\n\nТекст карточки"
  borderAccent="blue"
  index={0}
/>

// Градиентная граница
<MarkdownCard
  content="## Заголовок\n\nТекст карточки"
  borderAccent={{ from: "#06b6d4", to: "#ef4444" }}
  index={0}
/>
```

**Доступные одноцветные варианты:**
- `yellow`, `red`, `green`, `blue`, `purple`, `pink`, `cyan`

**Градиентные границы:**
- Объект с полями `from` и `to` для создания градиента
- Поддерживает любые CSS-цвета (hex, rgb, hsl)

**Пример с градиентом от голубого к красному:**
```tsx
<MarkdownCard
  content="**Важная информация** с яркой границей"
  borderAccent={{ from: "#06b6d4", to: "#ef4444" }}
  index={0}
/>
```

##### Базовое использование:
```tsx
import MarkdownCard from '../cards/MarkdownCard';

<MarkdownCard
  content="## Заголовок\n\nОбычный текст с **жирным** и *курсивом*."
  index={0}
/>
```

##### Поддерживаемые Markdown-элементы:
- **Заголовки** (H1-H6): `# Заголовок`, `## Подзаголовок`
- **Текстовое форматирование**: `**жирный**`, `*курсив*`
- **Списки**: 
  ```markdown
  - Элемент списка 1
  - Элемент списка 2
  
  1. Нумерованный список
  2. Второй элемент
  ```
- **Цитаты**: `> Это цитата`
- **Код**: \`inline code\` и блоки кода:
  \`\`\`javascript
  const example = 'code block';
  \`\`\`
- **Ссылки**: `[текст ссылки](https://example.com)`

##### Добавление изображений:

Для добавления изображений используйте стандартный Markdown-синтаксис:

```tsx
<MarkdownCard
  content={`
    ## Пример с изображением
    
    ![Описание изображения](/img/example.png)
    
    Текст после изображения.
  `}
  index={0}
/>
```

**Важно**: 
- Изображения должны находиться в папке `public/img/`
- Используйте абсолютные пути от корня проекта: `/img/filename.ext`
- Поддерживаются форматы: PNG, JPG, JPEG, SVG, GIF

##### Добавление графиков:

Для встраивания интерактивных графиков используйте пропсы `hasChart` и `chart`:

```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const chartData = [
  { name: 'Янв', value: 400 },
  { name: 'Фев', value: 300 },
  { name: 'Мар', value: 600 }
];

const MyChart = () => (
  <LineChart width={300} height={200} data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="value" stroke="#8884d8" />
  </LineChart>
);

<MarkdownCard
  content={`
    ## Статистика продаж
    
    График показывает динамику продаж за первый квартал.
  `}
  hasChart={true}
  chart={<MyChart />}
  index={0}
/>
```

##### Комбинирование с анимациями:

```tsx
<CardsLayout
  animationType="explosion"
  animationDelay={250}
  isActive={isActive}
  isVisited={isVisited}
>
  <MarkdownCard
    content="### Анимированная карточка\n\nЭта карточка появится с эффектом взрыва."
    index={0}
    animationType="explosion"
    animationDelay={250}
    isActive={isActive}
    isVisited={isVisited}
  />
</CardsLayout>
```

##### Пример из реального использования:

```tsx
const conclusions = [
  {
    content: `**AI инструменты значительно повышают продуктивность** в большинстве задач.
    
    В нашей команде AI как новый сотрудник — потеряв одного старшего разработчика, 
    производительность команды не упала.`,
    hasChart: false
  },
  {
    content: `## Наибольшая эффективность
    
    Достигается в задачах:
    - Документации
    - Генерации кода
    - Рефакторинга`,
    hasChart: false
  }
];

<CardsLayout cols="2">
  {conclusions.map((conclusion, index) => (
    <MarkdownCard
      key={index}
      content={conclusion.content}
      hasChart={conclusion.hasChart}
      index={index}
    />
  ))}
</CardsLayout>
```

##### Стилизация:

- Карточки автоматически получают градиентную левую границу
- Поддерживают эффекты наведения с подсветкой
- Первая и последняя карточка в ряду получают специальные градиентные фоны
- Адаптивный дизайн для мобильных устройств
- Центрированное выравнивание текста по умолчанию

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
