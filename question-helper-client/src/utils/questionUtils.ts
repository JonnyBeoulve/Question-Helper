import { QuestionData } from '../types'
import { questions } from '../fixtures/questions'

const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * @description
 * Gets all questions that have no replies.
 */
export const getUnansweredQuestionsData = async (): Promise<QuestionData[]> => {
  await wait(500)
  return questions.filter(q => q.answers.length === 0)
}

/**
 * @description
 * Gets a single question on ID.
 *
 * @param
 * questionID: number
 */
export const getQuestionData = async (
  questionId: number,
): Promise<QuestionData | null> => {
  await wait(500)
  const results = questions.filter(q => q.questionId === questionId)
  return results.length === 0 ? null : results[0]
}

/**
 * @description
 * Search questions for given string.
 *
 * @param
 * criteria: string
 */
export const searchQuestions = async (
  criteria: string,
): Promise<QuestionData[]> => {
  await wait(500)
  return questions.filter(
    q =>
      q.title.toLowerCase().indexOf(criteria.toLowerCase()) >= 0 ||
      q.content.toLowerCase().indexOf(criteria.toLowerCase()) >= 0,
  )
}
