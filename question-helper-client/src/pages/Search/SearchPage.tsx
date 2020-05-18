import { FC, useState, useEffect } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { RouteComponentProps } from 'react-router-dom'
import { Page, QuestionList } from '../../common/components'
import { QuestionData } from '../../types'
import { searchQuestions } from '../../utils/questionUtils'

export const SearchPage: FC<RouteComponentProps> = ({ location }) => {
  const [questions, setQuestions] = useState<QuestionData[]>([])

  const searchParams = new URLSearchParams(location.search)
  const searchCriteria = searchParams.get('criteria') || ''

  useEffect(() => {
    const search = async (criteria: string) => {
      const foundResults = await searchQuestions(criteria)
      setQuestions(foundResults)
    }
    search(searchCriteria)
  }, [searchCriteria])

  return (
    <Page title="Search Results">
      {searchCriteria && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for "{searchCriteria}"
        </p>
      )}
      <QuestionList data={questions} />
    </Page>
  )
}
