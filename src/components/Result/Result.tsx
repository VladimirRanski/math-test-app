"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./Result.module.scss";

type Question = {
  num1: number;
  num2: number;
  operator?: string;
  answer: number;
  options?: number[];
  userAnswer?: number | string;
};

type ResultProps = {
  result: {
    correct: number;
    total: number;
    incorrectQuestions: Question[];
    questions: Question[];
    timeTaken: number;
  };
  onRestart: () => void;
};

// Переводы для результатов
const translations = {
  en: {
    correctAnswers: "Correct Answers:",
    totalQuestions: "Total Questions:",
    incorrectQuestions: "Incorrect Questions:",
    question: "Question",
    yourAnswer: "Your Answer",
    correctAnswer: "Correct Answer",
    timeTaken: "Time Taken:",
    restart: "Restart",
  },
  ru: {
    correctAnswers: "Правильные ответы:",
    totalQuestions: "Всего вопросов:",
    incorrectQuestions: "Неправильные вопросы:",
    question: "Вопрос",
    yourAnswer: "Ваш ответ",
    correctAnswer: "Правильный ответ",
    timeTaken: "Затраченное время:",
    restart: "Начать заново",
  },
};

const Result: React.FC<ResultProps> = ({ result, onRestart }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className={styles.result}>
      <div>{`${t.correctAnswers} ${result.correct} / ${result.total}`}</div>
      <div>{`${t.timeTaken} ${result.timeTaken.toFixed(2)} seconds`}</div>
      <div>{t.incorrectQuestions}</div>
      <ul>
        {result.questions.map((question, index) => (
          <li
            key={index}
            className={
              question.userAnswer === question.answer ? styles.correct : styles.incorrect
            }
          >
            <div>{`${t.question}: ${question.num1} ${question.operator || "?"} ${question.num2}`}</div>
            <div>{`${t.yourAnswer}: ${
              question.userAnswer !== undefined ? question.userAnswer : ""
            }`}</div>
            <div>{`${t.correctAnswer}: ${question.answer}`}</div>
          </li>
        ))}
      </ul>
      <button onClick={onRestart}>{t.restart}</button>
    </div>
  );
};

export default Result;
