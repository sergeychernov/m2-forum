#!/bin/bash

NEW_REPO_NAME="$1"

if [ -z "$NEW_REPO_NAME" ]; then
  echo "❌ Укажи имя нового репозитория:"
  echo "Пример: npm run fork новое-имя"
  exit 1
fi

# Получаем URL origin
SOURCE_REPO=$(git -C . remote get-url origin 2>/dev/null)
if [ -z "$SOURCE_REPO" ]; then
  echo "❌ Не найден git-репозиторий или origin"
  exit 1
fi

# Получаем имя пользователя или организации
TARGET_USER=$(echo "$SOURCE_REPO" | sed -E 's|.*github\.com[:/](.*)/.*\.git|\1|')

if [ -z "$TARGET_USER" ]; then
  echo "❌ Не удалось определить имя пользователя из URL: $SOURCE_REPO"
  exit 1
fi

DEFAULT_BRANCH=$(git symbolic-ref --short HEAD)

TARGET_DIR="../$NEW_REPO_NAME"
echo "📦 Клонируем $SOURCE_REPO → $TARGET_DIR"
git clone "$SOURCE_REPO" "$TARGET_DIR" || exit 1
cd "$TARGET_DIR" || exit 1

# Проверяем, установлен ли gh
if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI (gh) не установлен. Установи его: https://cli.github.com/"
  exit 1
fi

# Создаём новый репозиторий
gh repo create "$TARGET_USER/$NEW_REPO_NAME" --confirm || exit 1

# Перенастраиваем origin
git remote remove origin
git remote add origin "https://github.com/$TARGET_USER/$NEW_REPO_NAME.git"

# Пушим код
git push -u origin "$DEFAULT_BRANCH"

echo "✅ Готово: https://github.com/$TARGET_USER/$NEW_REPO_NAME"
