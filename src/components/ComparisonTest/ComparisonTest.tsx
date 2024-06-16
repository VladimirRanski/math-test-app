"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./ComparisonTest.module.scss";
import { ComparisonTestProps } from '@/types';
import { translations } from '@/translations';


const ComparisonTest: React.FC<ComparisonTestProps> = ({ questions, onComplete }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(questions.length).fill(null));
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleAnswerSelect = (answer: string) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const timeTaken = (Date.now() - startTime) / 1000;
      const answeredQuestions = questions.map((q, i) => ({
        ...q,
        userAnswer: userAnswers[i],
      }));
      const incorrectQuestions = answeredQuestions.filter(
        (q) => (q.userAnswer === ">" && q.answer <= 0) || 
        (q.userAnswer === "<" && q.answer >= 0) || 
        (q.userAnswer === "=" && q.answer !== 0)
      );
      const correct = questions.length - incorrectQuestions.length;
      onComplete(correct, questions.length, incorrectQuestions, timeTaken);
    }
  };

  return (
    <div className={styles.test}>
      <div className={styles.question}>
        {`${t.question} ${currentQuestionIndex + 1} / ${questions.length}: ${questions[currentQuestionIndex].num1} ? ${questions[currentQuestionIndex].num2}`}
      </div>
      <div className={styles.options}>
        <button onClick={() => handleAnswerSelect(">")}>{t.greaterThan}</button>
        <button onClick={() => handleAnswerSelect("<")}>{t.lessThan}</button>
        <button onClick={() => handleAnswerSelect("=")}>{t.equalTo}</button>
      </div>
      <div className={styles.navigation}>
        {/* {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNext}>
            {t.next}
          </button>
        ) : (
          <button onClick={handleNext}>
            {t.finish}
          </button>
        )} */}
        <button onClick={handleNext}>
          {currentQuestionIndex < questions.length - 1 ? t.next : t.finish}
        </button>
      </div>
    </div>
  );
};

export default ComparisonTest;

