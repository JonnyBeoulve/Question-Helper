import { FC, useEffect, useState } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { RouteComponentProps } from 'react-router-dom'
import { PrimaryButton } from '../../common/styles/Styles'
import { Page, PageTitle, QuestionList } from '../../common/components'
import { getUnansweredQuestionsData } from '../../utils/questionUtils'
import { QuestionData } from '../../fixtures/questions'

export const HomePage: FC<RouteComponentProps> = ({ history }) => {
  const [questions, setQuestions] = useState<QuestionData[] | null>(null)
  const [questionsLoading, setQuestionsLoading] = useState(true)

  useEffect(() => {
    const getUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestionsData()
      setQuestions(unansweredQuestions)
      setQuestionsLoading(false)
    }
    getUnansweredQuestions()
  }, [])

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
