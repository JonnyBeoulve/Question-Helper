import { Action } from 'redux'
import { QuestionData } from './'

export interface GettingUnansweredQuestionsAction
  extends Action<'GettingUnansweredQuestions'> {}

export type QuestionsActions =
  | GettingUnansweredQuestionsAction
  | GotUnansweredQuestionsAction
  | PostedQuestionAction

export interface GotUnansweredQuestionsAction
  extends Action<'GotUnansweredQuestions'> {
  questions: QuestionData[]
}

export interface PostedQuestionAction extends Action<'PostedQuestion'> {
  result: QuestionData | undefined
}

export interface QuestionsState {
  readonly loading: boolean
  readonly unanswered: QuestionData[] | null
  readonly postedResult?: QuestionData
}

export interface AppState {
  readonly questions: QuestionsState
}
