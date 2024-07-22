export interface Statistics {
  correctAnswers: number;
  incorrectAnswers: number;
  totalTime: number;
}

export const createStatistics = (): Statistics => ({
  correctAnswers: 0,
  incorrectAnswers: 0,
  totalTime: 0,
});

export const updateStatistics = (
  stats: Statistics,
  isCorrect: boolean,
  timeSpent: number
): Statistics => {
  return {
    correctAnswers: stats.correctAnswers + (isCorrect ? 1 : 0),
    incorrectAnswers: stats.incorrectAnswers + (isCorrect ? 0 : 1),
    totalTime: stats.totalTime + timeSpent,
  };
};
