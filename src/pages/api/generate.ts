import { NextApiRequest, NextApiResponse } from "next";

type Example = {
  num1: number;
  num2: number;
  operator?: string;
  answer: number;
  options?: number[];
};

// Функция для выполнения математической операции
const calculateAnswer = (
  num1: number,
  num2: number,
  operator: string | undefined
): number => {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return Math.floor(num1 / num2); // Целочисленное деление
    default:
      throw new Error("Unsupported operator");
  }
};

// Генерация вариантов ответов для вопросов
const generateOptions = (correctAnswer: number, range: number): number[] => {
  const options = new Set<number>();
  options.add(correctAnswer);

  while (options.size < 4) {
    const option = Math.floor(Math.random() * (2 * range + 1)) - range;
    if (!options.has(option)) {
      options.add(option);
    }
  }

  return Array.from(options).sort(() => Math.random() - 0.5);
};

// Генерация математических примеров
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { count, range, operators, type } = req.query;
  const examples: Example[] = [];

  const countNumber = Number(count);
  const rangeNumber = Number(range);
  const operatorsArray = decodeURIComponent(operators as string).split(",");

  // Генерация заданного количества примеров
  for (let i = 0; i < countNumber; i++) {
    let num1 = Math.floor(Math.random() * (rangeNumber + 1));
    let num2;
    let operator;
    if (type === "comparison") {
      num2 = Math.floor(Math.random() * (rangeNumber + 1));
    } else {
      operator =
        operatorsArray[Math.floor(Math.random() * operatorsArray.length)];
      if (operator === "*") {
        num2 = Math.floor(Math.random() * 10) + 1;
      } else if (operator === "/") {
        // Генерация деления с целочисленным результатом и без деления на 0
        do {
          num1 = Math.floor(Math.random() * (rangeNumber + 1));
          num2 = Math.floor(Math.random() * (rangeNumber - 1)) + 1; // num2 не может быть 0
        } while (num1 % num2 !== 0 || num1 / num2 < 0);
      } else if (operator === "-") {
        // Генерация вычитания с положительным результатом
        do {
          num1 = Math.floor(Math.random() * (rangeNumber + 1));
          num2 = Math.floor(Math.random() * (rangeNumber + 1));
        } while (num1 - num2 < 0);
      } else {
        num2 = Math.floor(Math.random() * (rangeNumber + 1));
      }
    }
    const answer =
      type === "comparison"
        ? num1 - num2
        : calculateAnswer(num1, num2, operator);
    const options =
      type === "multiple_choice"
        ? generateOptions(answer, rangeNumber)
        : undefined;
    examples.push({ num1, num2, operator, answer, options });
  }

  // Возвращение сгенерированных примеров в ответе
  res.status(200).json(examples);
}
