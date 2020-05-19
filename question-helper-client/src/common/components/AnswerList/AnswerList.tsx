import { FC } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { AnswerData } from '../../../types'
import { gray5 } from '../../styles'
import { Answer } from '../Answer/Answer'

interface Props {
  data: AnswerData[]
}

export const AnswerList: FC<Props> = ({ data }) => (
  <ul
    css={css`
      list-style: none;
      margin: 10px 0 0 0;
      padding: 0;
    `}
  >
    {data.map(answer => (
      <li
        css={css`
          border-top: 1px solid ${gray5};
        `}
        key={answer.answerId}
      >
        <Answer data={answer} />
      </li>
    ))}{' '}
  </ul>
)
