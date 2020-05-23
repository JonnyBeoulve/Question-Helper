import { FC, useEffect } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RouteComponentProps } from 'react-router-dom'
import { PrimaryButton } from '../../common/styles'
import { Page, PageTitle, QuestionList } from '../../common/components'
import { AppState, QuestionData } from '../../types'
import { getUnansweredQuestionsActionCreator } from '../../store'

interface Props extends RouteComponentProps {
  questions: QuestionData[] | null
  questionsLoading: boolean
  getUnansweredQuestions: () => Promise<void>
}

const HomePage: FC<Props> = ({
  questions,
  questionsLoading,
  getUnansweredQuestions,
  history,
}) => {
  useEffect(() => {
    if (questions === null) {
      getUnansweredQuestions()
    }
  }, [questions, getUnansweredQuestions])

  return (
    <Page>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <PageTitle>Unanswered Questions</PageTitle>
        <PrimaryButton
          onClick={() => {
            history.push('/create-question')
          }}
        >
          Create Question
        </PrimaryButton>
      </div>
      {questionsLoading ? (
        <div
          css={css`
            font-size: 16px;
            font-style: italic;
          `}
        >
          Loading...
        </div>
      ) : (
        <QuestionList data={questions || []} />
      )}
    </Page>
  )
}

const mapStateToProps = (store: AppState) => {
  return {
    questions: store.questions.unanswered,
    questionsLoading: store.questions.loading,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getUnansweredQuestions: () =>
      dispatch(getUnansweredQuestionsActionCreator()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
