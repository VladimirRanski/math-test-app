export type Question  = {
  num1: number;
  num2: number;
  operator?: string;
  answer: number;
  options?: number[];
  userAnswer?: number | string;
};

export type Example = {
  num1: number;
  num2: number;
  operator?: string;
  answer: number;
  options?: number[];
};

export type ComparisonTestProps = {
  questions: Question[];
  onComplete: (
    correct: number,
    total: number,
    incorrectQuestions: Question[],
    timeTaken: number
  ) => void;
};

export type MultipleChoiceTestProps = {
  questions: Question[];
  onComplete: (
    correct: number,
    total: number,
    incorrectQuestions: Question[],
    timeTaken: number
  ) => void;
};

export type ResultProps = {
  result: {
    correct: number;
    total: number;
    incorrectQuestions: Question[];
    questions: Question[];
    timeTaken: number;
  };
  onRestart: () => void;
};

export type SettingsProps = {
  onStart: (
    count: number,
    range: number,
    operators: string[],
    type: string
  ) => void;
};

export type TestProps = {
  questions: Question[];
  onComplete: (
    correct: number,
    total: number,
    incorrectQuestions: Question[],
    timeTaken: number
  ) => void;
};

export type TimerProps = {
  initialSeconds: number;
  onTimeUp: () => void;
};