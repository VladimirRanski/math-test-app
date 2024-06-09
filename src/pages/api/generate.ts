import type { NextApiRequest, NextApiResponse } from "next";

type Example = {
  num1: number;
  num2: number;
  operator: string;
  answer: number;
};

// Эндпоинт для генерации математических примеров
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { count, range, operators } = req.query;

  if (!count || !range || !operators) {
    res.status(400).json({ error: "Missing query parameters" });
    return;
  }

  const countNumber = parseInt(count as string);
  const rangeNumber = parseInt(range as string);
  const operatorList = (operators as string)
    .split(",")
    .map((op) => decodeURIComponent(op));

  if (!countNumber || !rangeNumber || operatorList.length === 0) {
    res.status(400).json({ error: "Invalid query parameters" });
    return;
  }

  const examples: Example[] = [];

  for (let i = 0; i < countNumber; i++) {
    const operator =
      operatorList[Math.floor(Math.random() * operatorList.length)];
    let num1 = Math.floor(Math.random() * (rangeNumber + 1));
    let num2 = Math.floor(Math.random() * (rangeNumber + 1));
    let answer;

    switch (operator) {
      case "+":
        if (num1 + num2 > rangeNumber) {
          num2 = rangeNumber - num1;
        }
        answer = num1 + num2;
        break;
      case "-":
        if (num2 > num1) {
          [num1, num2] = [num2, num1];
        }
        answer = num1 - num2;
        break;
      case "*":
        if ((num1 === 0) || (num1 === 1)) num1 = 2;
        num2 = Math.floor(Math.random() * 10);
        if ((num2 === 0) || (num2 === 1)) num2 = 2;
        answer = num1 * num2;
        break;
      case "/":
        if (num2 === 0) num2 = 1;
        num1 =
          num2 *
          Math.floor(Math.random() * (Math.floor(rangeNumber / num2) + 1));
        answer = Math.floor(num1 / num2);
        break;
      default:
        res.status(400).json({ error: "Unsupported operator" });
        return;
    }

    examples.push({ num1, num2, operator, answer });
  }

  res.status(200).json(examples);
}
