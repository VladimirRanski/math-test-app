// src/app/api/generate/route.ts

import type { NextApiRequest, NextApiResponse } from "next";

type Example = {
  num1: number;
  num2: number;
  operator: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { count, range, operators } = req.query;

  if (!count || !range || !operators) {
    return res
      .status(400)
      .json({ error: "Missing count, range or operators parameter" });
  }

  const examples: Example[] = [];
  const ops = Array.isArray(operators)
    ? operators.map(decodeURIComponent)
    : [decodeURIComponent(operators as string)];

  for (let i = 0; i < Number(count); i++) {
    let num1 = Math.floor(Math.random() * (Number(range) + 1));
    let num2 = Math.floor(Math.random() * (Number(range) + 1));
    const operator = ops[Math.floor(Math.random() * ops.length)];

    if (operator === "/" && num2 === 0) {
      num2 = 1;
    }

    if (operator === "/") {
      num1 = num1 * num2;
    }

    if (operator === "-" && num1 < num2) {
      [num1, num2] = [num2, num1];
    }

    if (operator === "*" && (num1 === 0 || num2 === 0)) {
      num1 = Math.floor(Math.random() * Number(range)) + 1;
      num2 = Math.floor(Math.random() * Number(range)) + 1;
    }

    examples.push({ num1, num2, operator });
  }

  res.status(200).json(examples);
}
