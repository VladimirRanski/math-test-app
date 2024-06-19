"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./Test.module.scss";
import { TTestProps } from "@/types";
import { translations } from "@/translations";
import { Cruinn, Everlasting } from "@/fonts";

const Test: React.FC<TTestProps> = ({ questions, onComplete }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleAnswerSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const answerInput = form.elements.namedItem("answer") as HTMLInputElement;
    const answer = parseFloat(answerInput.value);

    const updatedAnswers = { ...userAnswers, [currentQuestionIndex]: answer };

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswers(updatedAnswers);
      form.reset(); // Очистка инпута после отправки ответа
    } else {
      setUserAnswers(updatedAnswers);
      setTimeout(() => {
        // Добавляем пользовательские ответы к вопросам
        const answeredQuestions = questions.map((q, i) => ({
          ...q,
          userAnswer: updatedAnswers[i],
        }));

        const timeTaken = (Date.now() - startTime) / 1000; // Вычисление затраченного времени
        const incorrectQuestions = answeredQuestions.filter(
          (q) => q.userAnswer !== q.answer
        );
        questions.map(
          (e, i) => (e.userAnswer = answeredQuestions[i].userAnswer)
        );
        const correct = questions.length - incorrectQuestions.length;
        onComplete(correct, questions.length, incorrectQuestions, timeTaken);
      }, 0);
    }
  };

  // questions.map((e, i) => e.userAnswer = answeredQuestions[i].userAnswer)
  const handlePreviousQuestion = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };
  return (
    <div className={styles.test}>
      <form onSubmit={handleAnswerSubmit}>
        <div className={styles.question}>
          <p className={Everlasting.className}>{`${t.question} ${
            currentQuestionIndex + 1
          } / ${questions.length}`}</p>
          <p className={Cruinn.className}>
            {`${questions[currentQuestionIndex].num1} ${questions[currentQuestionIndex].operator} ${questions[currentQuestionIndex].num2} =`}{" "}
            <span className={Everlasting.className}>?</span>
          </p>
        </div>
        <input className={styles.input} type="number" step="any" name="answer" required />
        <div className={styles.navigation}>
          {currentQuestionIndex > 0 && (
            <button
              className={styles.btnBack}
              type="button"
              onClick={handlePreviousQuestion}
            >
              {t.back}
            </button>
          )}
          <button type="submit">
            {currentQuestionIndex < questions.length - 1 ? t.next : t.finish}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Test;
