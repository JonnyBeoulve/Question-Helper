import { Action, ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import {
  getUnansweredQuestionsData,
  postQuestion,
  PostQuestionData,
} from '../utils/questionUtils'
import { QuestionData } from '../types'

export type QuestionsActions =
  | GettingUnansweredQuestionsAction
  | GotUnansweredQuestionsAction
  | PostedQuestionAction

interface GettingUnansweredQuestionsAction
  extends Action<'GettingUnansweredQuestions'> {}

export interface GotUnansweredQuestionsAction
  extends Action<'GotUnansweredQuestions'> {
  questions: QuestionData[]
}

export interface PostedQuestionAction extends Action<'PostedQuestion'> {
  result: QuestionData | undefined
}

export const getUnansweredQuestionsActionCreator: ActionCreator<ThunkAction<
  Promise<void>,
  QuestionData[],
  null,
  GotUnansweredQuestionsAction
>> = () => {
  return async (dispatch: Dispatch) => {
    const gettingUnansweredQuestionsAction: GettingUnansweredQuestionsAction = {
      type: 'GettingUnansweredQuestions',
    }
    dispatch(gettingUnansweredQuestionsAction)

    const questions = await getUnansweredQuestionsData()

    const gotUnansweredQuestionAction: GotUnansweredQuestionsAction = {
      questions,
      type: 'GotUnansweredQuestions',
    }
    dispatch(gotUnansweredQuestionAction)
  }
}

export const postQuestionActionCreator: ActionCreator<ThunkAction<
  Promise<void>,
  QuestionData,
  PostQuestionData,
  PostedQuestionAction
>> = (question: PostQuestionData) => {
  return async (dispatch: Dispatch) => {
    const result = await postQuestion(question)
    const postedQuestionAction: PostedQuestionAction = {
      type: 'PostedQuestion',
      result,
    }
    dispatch(postedQuestionAction)
  }
}

export const clearPostedQuestionActionCreator: ActionCreator<PostedQuestionAction> = () => {
  const postedQuestionAction: PostedQuestionAction = {
    type: 'PostedQuestion',
    result: undefined,
  }
  return postedQuestionAction
}
