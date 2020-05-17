import { QuestionData, questions } from '../fixtures/questions'

const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * @description
 * Gets all questions that have no replies.
 */
export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
  await wait(500)
  return questions.filter(q => q.answers.length === 0)
}
