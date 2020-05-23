import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import {
  getUnansweredQuestionsData,
  postQuestion,
} from '../utils/questionUtils'
import {
  GettingUnansweredQuestionsAction,
  GotUnansweredQuestionsAction,
  PostQuestionData,
  PostedQuestionAction,
  QuestionData,
} from '../types'

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
