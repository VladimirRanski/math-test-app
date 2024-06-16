"use client";

import React, { useState } from "react";
import Settings from "../components/Settings/Settings";
import Test from "../components/Test/Test";
import MultipleChoiceTest from "../components/MultipleChoiceTest/MultipleChoiceTest";
import ComparisonTest from "../components/ComparisonTest/ComparisonTest";
import Result from "../components/Result/Result";
import styles from "./page.module.scss";
import { Question } from '@/types';

// type Question = {
//   num1: number;
//   num2: number;
//   operator?: string;
//   answer: number;
//   options?: number[];
//   userAnswer?: number | string;
// };

const Home: React.FC = () => {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [result, setResult] = useState<{
    correct: number;
    total: number;
    incorrectQuestions: Question[];
    questions: Question[];
    timeTaken: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<{ count: number, range: number, operators: string[], type?: string } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async (count: number, range: number, operators: string[]) => {
    setError(null); // Сбрасываем состояние ошибки
    setSettings({ count, range, operators }); // Сохраняем настройки
    setIsLoading(true);
    try {
      const response = await fetch(`/api/generate?count=${count}&range=${range}&operators=${operators.join(",")}`);
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data: Question[] = await response.json();
      setQuestions(data);
      setResult(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Проверка типа перед использованием
      } else {
        setError("An unknown error occurred."); // Обработка неизвестного типа ошибки
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = (correct: number, total: number, incorrectQuestions: Question[], timeTaken: number) => {
    setResult({ correct, total, incorrectQuestions, questions: questions ?? [], timeTaken });
    setQuestions(null);
  };

  const handleRestart = () => {
    setQuestions(null);
    setResult(null);
  };

  return (
    <div className={styles.container}>
      {error && <div className={styles.error}>{error}</div>}
      {!questions && !result && <Settings onStart={handleStart} />}
      {isLoading && <div>Loading...</div>}
      {questions && settings?.type === "arithmetic" && <Test questions={questions} onComplete={handleComplete} />}
      {questions && settings?.type === "multiple_choice" && <MultipleChoiceTest questions={questions} onComplete={handleComplete} />}
      {questions && settings?.type === "comparison" && <ComparisonTest questions={questions} onComplete={handleComplete} />}
      {result && <Result result={result} onRestart={handleRestart} />}
    </div>
  );
};

export default Home;
