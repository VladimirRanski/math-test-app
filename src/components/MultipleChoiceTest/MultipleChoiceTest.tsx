"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./MultipleChoiceTest.module.scss";
import { MultipleChoiceTestProps } from '@/types';
import { translations } from '@/translations';

const MultipleChoiceTest: React.FC<MultipleChoiceTestProps> = ({ questions, onComplete }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(Array(questions.length).fill(null));
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleAnswerSelect = (answer: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);
    
      if (userAnswers[currentQuestionIndex] === null) {
    console.log('Пожалуйста, выберите ответ перед продолжением.');
    return;
  }
  };

  const handleNext = () => {

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setTimeout(() => {
      const timeTaken = (Date.now() - startTime) / 1000;
      const answeredQuestions = questions.map((q, i) => ({
        ...q,
        userAnswer: userAnswers[i],
      }));
      const incorrectQuestions = answeredQuestions.filter(
        (q) => q.userAnswer !== q.answer
      );
      const correct = questions.length - incorrectQuestions.length;
      questions.map((e, i) => e.userAnswer = answeredQuestions[i].userAnswer);
      onComplete(correct, questions.length, incorrectQuestions, timeTaken);
      }, 0);
    }
  };

  return (
    <div className={styles.test}>
      <div className={styles.question}>
        {`${t.question} ${currentQuestionIndex + 1} / ${questions.length}: ${questions[currentQuestionIndex].num1} ${questions[currentQuestionIndex].operator} ${questions[currentQuestionIndex].num2} = ?`}
      </div>
      <div className={styles.options}>
        {questions[currentQuestionIndex].options?.map((option, index) => (
          <button
            key={index}
            className={userAnswers[currentQuestionIndex] === option ? styles.selected : ""}
            onClick={() => handleAnswerSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className={styles.navigation}>
        <button onClick={handleNext}>
          {currentQuestionIndex < questions.length - 1 ? t.next : t.finish}
        </button>
      </div>
    </div>
  );
};

export default MultipleChoiceTest;
