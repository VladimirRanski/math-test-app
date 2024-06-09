"use client";

import React, { useState } from "react";
import Settings from "../components/Settings/Settings";
import Test from "../components/Test/Test";
import Result from "../components/Result/Result";
import styles from "./page.module.scss";

type Question = {
  num1: number;
  num2: number;
  operator: string;
  answer: number;
  userAnswer?: number;
};

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
  const [settings, setSettings] = useState<{ count: number, range: number, operators: string[] } | null>(null);

  const handleStart = async (count: number, range: number, operators: string[]) => {
    setError(null); // Сбрасываем состояние ошибки
    setSettings({ count, range, operators }); // Сохраняем настройки
    try {
      const response = await fetch(`/api/generate?count=${count}&range=${range}&operators=${operators.join(",")}`);
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await response.json();
      setQuestions(data);
      setResult(null);
    } catch (err:any) {
      setError(err.message);
    }
  };

  const handleComplete = (correct: number, total: number, incorrectQuestions: Question[], timeTaken: number) => {
    
    if (questions) {setResult({ correct, total, incorrectQuestions, questions, timeTaken });}

    
    setQuestions(null);
  };

  const handleRestart = () => {
    if (settings) {
      handleStart(settings.count, settings.range, settings.operators);
    } else {
      setQuestions(null);
      setResult(null);
    }
  };

  return (
    <div className={styles.container}>
      {error && <div className={styles.error}>{error}</div>}
      {!questions && !result && <Settings onStart={handleStart} />}
      {questions && <Test questions={questions} onComplete={handleComplete} />}
      {result && <Result result={result} onRestart={handleRestart} onStart={() => {setQuestions(null); setResult(null)}}/>}
    </div>
  );
};

export default Home;
