// Определяем интерфейс для переведенных строк
interface Translations {
  title: string;
  settings: string;
  darkMode: string;
  language: string;
  startTest: string;
  correct: string;
  incorrect: string;
  inProgress: string;
  question: string;
  arithmetic: string;
  comparison: string;
  multipleChoice: string;
  numberOfQuestions: string;
  maxNumber: string;
  operations: string;
}

// Определяем интерфейс для всех языков
interface LanguageTranslations {
  en: Translations;
  ru: Translations;
}

const translations: LanguageTranslations = {
  en: {
    title: "Math Test",
    settings: "Settings",
    darkMode: "Dark Mode",
    language: "Language",
    startTest: "Start Test",
    correct: "Correct!",
    incorrect: "Incorrect!",
    inProgress: "In Progress",
    question: "Question",
    arithmetic: "Arithmetic",
    comparison: "Comparison",
    multipleChoice: "Multiple Choice",
    numberOfQuestions: "Number of Questions",
    maxNumber: "Maximum Number",
    operations: "Operations",
  },
  ru: {
    title: "Тест по математике",
    settings: "Настройки",
    darkMode: "Темная тема",
    language: "Язык",
    startTest: "Начать тест",
    correct: "Правильно!",
    incorrect: "Неправильно!",
    inProgress: "В разработке",
    question: "Вопрос",
    arithmetic: "Арифметика",
    comparison: "Сравнение",
    multipleChoice: "Множественный выбор",
    numberOfQuestions: "Количество вопросов",
    maxNumber: "Максимальное число",
    operations: "Операции",
  },
};

// Функция для получения перевода
let currentLanguage: keyof LanguageTranslations = 'ru';

export const setLanguage = (lang: keyof LanguageTranslations) => {
  currentLanguage = lang;
};

export const translate = (key: keyof Translations) => {
  return translations[currentLanguage][key] || key;
};