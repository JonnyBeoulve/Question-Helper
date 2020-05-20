import { Reducer, combineReducers } from 'redux'
import { QuestionsActions } from './actions'
import { AppState, initialQuestionState, QuestionsState } from './store'

const neverReached = (never: never) => {}

const questionsReducer: Reducer<QuestionsState, QuestionsActions> = (
  state = initialQuestionState,
  action,
) => {
  switch (action.type) {
    case 'GettingUnansweredQuestions': {
      return {
        ...state,
        unanswered: null,
        loading: true,
      }
    }
    case 'GotUnansweredQuestions': {
      return {
        ...state,
        unanswered: action.questions,
        loading: false,
      }
    }
    case 'PostedQuestion': {
      return {
        ...state,
        unanswered: action.result
          ? (state.unanswered || []).concat(action.result)
          : state.unanswered,
        postedResult: action.result,
      }
    }
    default:
      neverReached(action)
  }

  return state
}

export const rootReducer = combineReducers<AppState>({
  questions: questionsReducer,
})
