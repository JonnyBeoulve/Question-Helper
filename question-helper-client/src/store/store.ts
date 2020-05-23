import { applyMiddleware, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import { AppState, QuestionsState } from '../types'
import { rootReducer } from './reducers'

export const initialQuestionState: QuestionsState = {
  loading: false,
  unanswered: null,
}

export function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk))
  return store
}
