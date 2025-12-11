# 📁 Структура проєкту - Візуальне пояснення

## 🎯 Ключове розуміння

**Ваш проєкт = React застосунок з Vite**

Це означає що код треба **ЗБИРАТИ** (build), а не просто копіювати!

---

## 📊 Візуалізація процесу

```
┌─────────────────────────────────────────────────────────────┐
│                    ЛОКАЛЬНА МАШИНА                          │
│                                                             │
│  Rezerv/                                                    │
│  ├── src/                  ← ВИ ПИШЕТЕ КОД ТУТ             │
│  │   └── main.tsx                                          │
│  ├── components/           ← REACT КОМПОНЕНТИ               │
│  │   └── IdCard.tsx                                        │
│  ├── public/               ← СТАТИЧНІ ФАЙЛИ                 │
│  │   ├── manifest.json                                     │
│  │   └── icon-*.png                                        │
│  ├── index.html            ← HTML ШАБЛОН                    │
│  └── vite.config.ts        ← КОНФІГУРАЦІЯ ЗБІРКИ           │
│                                                             │
│  git add . && git commit && git push                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                    GITHUB REPOSITORY                        │
│                                                             │
│  github.com/Katywenkatwins/Rezerv                          │
│                                                             │
│  ✅ Всі файли збережені                                     │
│  ✅ GitHub Actions запускається                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                    GITHUB ACTIONS                           │
│                    (.github/workflows/deploy.yml)           │
│                                                             │
│  1. Завантажує код з репозиторію                           │
│  2. npm ci          ← Встановлює залежності                │
│  3. npm run build   ← VITE ЗБИРАЄ ПРОЄКТ                   │
│                                                             │
│     ┌──────────────────────────────────┐                   │
│     │    VITE BUILD PROCESS            │                   │
│     │                                  │                   │
│     │  src/*.tsx    → assets/main.js   │                   │
│     │  (React kod)     (JavaScript)    │                   │
│     │                                  │                   │
│     │  public/*     → dist/*           │                   │
│     │  (Copy files)                    │                   │
│     │                                  │                   │
│     │  index.html   → index.html       │                   │
│     │  (Inject scripts)                │                   │
│     └──────────────────────────────────┘                   │
│                                                             │
│  4. Створює папку dist/ з готовими файлами                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                    DIST/ (Build Output)                     │
│                    НЕ КОМІТИТЬСЯ НА GITHUB!                 │
│                                                             │
│  dist/                                                      │
│  ├── index.html            ← Готовий HTML з JS              │
│  ├── assets/                                                │
│  │   ├── main-abc123.js   ← Зкомпільований React           │
│  │   └── main-def456.css  ← Стилі                          │
│  ├── manifest.json         ← З /public                      │
│  ├── service-worker.js     ← З /public                      │
│  ├── app.js                ← З /public                      │
│  └── icon-*.png            ← З /public                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                    GITHUB PAGES                             │
│                    (Публікація)                             │
│                                                             │
│  https://katywenkatwins.github.io/Rezerv/                  │
│                                                             │
│  Публікується ТІЛЬКИ вміст dist/                           │
│  ├── index.html                                            │
│  ├── assets/main-abc123.js                                 │
│  ├── manifest.json       ← Працює! Шлях /Rezerv/           │
│  └── icon-192x192.png    ← Працює! Шлях /Rezerv/icon...    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔍 Детальний розбір

### 1️⃣ Локальна машина

**Що ви маєте:**
```
Rezerv/
├── src/                    # TypeScript/React код
│   └── main.tsx           # Вхідна точка React
├── components/            # React компоненти
│   ├── IdCard.tsx
│   └── ActionMenu.tsx
├── public/                # Статичні файли
│   ├── manifest.json      # PWA manifest
│   ├── service-worker.js  # Service Worker
│   └── icon-*.png         # Іконки
├── index.html             # HTML шаблон
└── vite.config.ts         # base: '/Rezerv/'
```

**Що це означає:**
- `src/` - код який треба компілювати (браузер не розуміє TSX)
- `public/` - файли які копіюються "як є"
- `index.html` - шаблон (Vite вставить туди `<script>` автоматично)

### 2️⃣ GitHub Repository

**Що там зберігається:**
- ✅ Вихідний код (src, components)
- ✅ Статичні файли (public)
- ✅ Конфігурація (vite.config.ts, package.json)
- ✅ GitHub Actions workflow (.github/workflows/deploy.yml)
- ❌ **НЕ ЗБЕРІГАЄТЬСЯ** dist/ (в .gitignore)

**Чому не зберігається dist/?**
- Генерується автоматично при збірці
- Різний на кожній машині
- GitHub Actions створить свій dist/ при деплої

### 3️⃣ GitHub Actions (Збірка)

**Що відбувається:**

```bash
# 1. Встановлення залежностей
npm ci
# Завантажує React, Vite, TypeScript та інше

# 2. Збірка проєкту
npm run build
# = tsc && vite build
```

**Vite build робить:**

```
1. Компілює TypeScript → JavaScript
   src/main.tsx → dist/assets/main-abc123.js

2. Обробляє React компоненти
   components/*.tsx → включає в main.js

3. Мінімізує код
   Видаляє коментарі, скорочує назви змінних

4. Копіює public/ → dist/
   public/manifest.json → dist/manifest.json
   public/icon-*.png → dist/icon-*.png

5. Обробляє index.html
   Додає <script src="/Rezerv/assets/main-abc123.js">
   Додає <link href="/Rezerv/assets/main-def456.css">
```

**Результат:**
```
dist/
├── index.html              # З вставленими скриптами
├── assets/
│   ├── main-abc123.js     # Весь React код
│   └── main-def456.css    # Всі стилі
├── manifest.json           # Скопійовано з public/
├── service-worker.js       # Скопійовано з public/
└── icon-*.png              # Скопійовано з public/
```

### 4️⃣ GitHub Pages (Публікація)

**Що публікується:**
- Тільки вміст папки `dist/`
- Доступно за адресою: https://katywenkatwins.github.io/Rezerv/

**Структура URL:**

| Локальний файл | URL на GitHub Pages |
|----------------|---------------------|
| dist/index.html | /Rezerv/ |
| dist/manifest.json | /Rezerv/manifest.json |
| dist/icon-192x192.png | /Rezerv/icon-192x192.png |
| dist/assets/main.js | /Rezerv/assets/main-abc123.js |

---

## ❌ Чому НЕ МОЖНА просто скопіювати src/ в корінь?

### Що станеться якщо скопіювати:

```
Rezultat/
├── main.tsx              ❌ Браузер не розуміє TypeScript!
├── IdCard.tsx            ❌ Браузер не розуміє JSX!
├── manifest.json         ❌ Шляхи будуть неправильні!
└── index.html            ❌ Немає посилань на скрипти!
```

**Браузер побачить:**
```javascript
import React from 'react';  ❌ ПОМИЛКА! Не знає що таке 'react'
const App = () => <div/>    ❌ ПОМИЛКА! Не розуміє JSX
```

**Правильно (після збірки):**
```javascript
// Весь React вже включений в один файл
// JSX перетворений на звичайний JavaScript
const e = React.createElement;
const App = () => e('div', null);
```

---

## ✅ Правильний процес

### Локально (розробка):
```bash
npm run dev
# Запускає dev сервер на http://localhost:3000
# Vite компілює код "на льоту"
```

### Деплой на GitHub Pages:
```bash
git add .
git commit -m "Update"
git push

# GitHub Actions автоматично:
# 1. npm ci
# 2. npm run build
# 3. Публікує dist/ на GitHub Pages
```

---

## 🎯 Відповідь на ваше питання

### Ви запитали:
> "Чи можу я просто видалити все в корневому та скопіювати в нього вміст папки src?"

### Відповідь:
**НІ, це зламає проєкт! ❌**

### Чому:
1. **Браузер не розуміє TypeScript** (.tsx файли)
2. **Браузер не розуміє JSX** (React синтаксис)
3. **Браузер не розуміє import** з node_modules
4. **Шляхи будуть неправильні** (manifest, service worker)

### Що треба робити:
**НІЧОГО не переміщувати! ✅**

GitHub Actions + Vite **АВТОМАТИЧНО**:
- Скомпілюють код
- Створять правильну структуру
- Опублікують на GitHub Pages

---

## 📝 Підсумок

```
┌─────────────────┐
│  Ви пишете код  │
│   в src/        │
└────────┬────────┘
         │
         ↓ git push
         │
┌────────┴────────┐
│ GitHub Actions  │
│  запускається   │
└────────┬────────┘
         │
         ↓ npm run build
         │
┌────────┴────────┐
│  Vite збирає    │
│  проєкт в dist/ │
└────────┬────────┘
         │
         ↓ deploy
         │
┌────────┴────────┐
│  GitHub Pages   │
│  показує dist/  │
└─────────────────┘
```

**Ваша задача:** Написати код → Закомітити → Все інше автоматично!

---

**Дата:** 11 грудня 2024
