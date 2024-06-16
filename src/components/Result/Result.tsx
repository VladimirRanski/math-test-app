"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./Result.module.scss";
import { ResultProps } from '@/types';
import { translations } from '@/translations';


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
