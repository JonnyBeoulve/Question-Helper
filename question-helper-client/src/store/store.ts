import { applyMiddleware, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import { QuestionData } from '../types'
import { rootReducer } from './reducers'

export interface QuestionsState {
  readonly loading: boolean
  readonly unanswered: QuestionData[] | null
  readonly postedResult?: QuestionData
}

export interface AppState {
  readonly questions: QuestionsState
}

export const initialQuestionState: QuestionsState = {
  loading: false,
  unanswered: null,
}

export function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk))
  return store
}
