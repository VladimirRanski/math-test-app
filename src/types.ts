export type TQuestion = {
  num1: number;
  num2: number;
  operator?: string;
  answer: number;
  options?: number[];
  userAnswer?: number | string;
};

export type TExample = {
  num1: number;
  num2: number;
  operator?: string;
  answer: number;
  options?: number[];
};

export type TComparisonTestProps = {
  questions: TQuestion[];
  onComplete: (
    correct: number,
    total: number,
    incorrectQuestions: TQuestion[],
    timeTaken: number
  ) => void;
};

export type TMultipleChoiceTestProps = {
  questions: TQuestion[];
  onComplete: (
    correct: number,
    total: number,
    incorrectQuestions: TQuestion[],
    timeTaken: number
  ) => void;
};

export type TResultProps = {
  result: {
    correct: number;
    total: number;
    incorrectQuestions: TQuestion[];
    questions: TQuestion[];
    timeTaken: number;
  };
  onRestart: () => void;
};

export type TSettingsProps = {
  onStart: (
    count: number,
    range: number,
    operators: string[],
    type: string
  ) => void;
};

export type TTestProps = {
  questions: TQuestion[];
  onComplete: (
    correct: number,
    total: number,
    incorrectQuestions: TQuestion[],
    timeTaken: number
  ) => void;
};

export type TTimerProps = {
  initialSeconds: number;
  onTimeUp: () => void;
};

export type TAvailableLanguages = "en" | "ru";
