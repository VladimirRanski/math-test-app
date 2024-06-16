
export type Question = {
  num1: number;
  num2: number;
  operator?: string; // Опциональный тип string | undefined
  answer: number;
  options?: number[];
  userAnswer?: number | string;
};

// type Question = {
//   num1: number;
//   num2: number;
//   operator?: string;
//   answer: number;
//   options: number[];
//   userAnswer?: number;
// };