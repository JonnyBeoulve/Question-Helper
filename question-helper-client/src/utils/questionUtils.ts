import { QuestionData, questions } from '../fixtures/questions';

export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
  await wait(500);
  return questions.filter(q => q.answers.length === 0);
};

const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
