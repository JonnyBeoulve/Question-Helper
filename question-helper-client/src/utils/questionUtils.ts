import {
  AnswerData,
  PostAnswerData,
  PostQuestionData,
  QuestionData,
  QuestionDataFromServer,
} from '../types'
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

/**
 * @description
 * Post a question.
 *
 * @param
 * question: PostQuestionData
 */
export const postQuestion = async (
  question: PostQuestionData,
): Promise<QuestionData | undefined> => {
  await wait(500)
  const questionId = Math.max(...questions.map(q => q.questionId)) + 1
  const newQuestion: QuestionData = {
    ...question,
    questionId,
    answers: [],
  }
  questions.push(newQuestion)

  return newQuestion
}

/**
 * @description
 * Post an answer.
 *
 * @param
 * answer: PostAnswerData
 */
export const postAnswer = async (
  answer: PostAnswerData,
): Promise<AnswerData | undefined> => {
  await wait(500)
  const question = questions.filter(q => q.questionId === answer.questionId)[0]
  const answerInQuestion: AnswerData = {
    answerId: 99,
    ...answer,
  }
  question.answers.push(answerInQuestion)

  return answerInQuestion
}

/**
 * @description
 * Map question received from server and format for front end consumption.
 *
 * @param
 * question: QuestionDataFromServer
 */
export const mapQuestionFromServer = (
  question: QuestionDataFromServer,
): QuestionData => ({
  ...question,
  created: new Date(question.created.substr(0, 19)),
  answers: question.answers.map(answer => ({
    ...answer,
    created: new Date(answer.created.substr(0, 19)),
  })),
})
