import { FC, Fragment, useEffect, useState } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { RouteComponentProps } from 'react-router-dom'
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@aspnet/signalr'
import { getQuestionData } from '../../utils/questionUtils'
import {
  AnswerList,
  Field,
  Form,
  minLength,
  Page,
  required,
} from '../../common/components'
import { gray3, gray6 } from '../../common/styles'
import { mapQuestionFromServer, postAnswer } from '../../utils/questionUtils'
import { QuestionData, QuestionDataFromServer, Values } from '../../types'

interface RouteParams {
  questionId: string
}

export const QuestionPage: FC<RouteComponentProps<RouteParams>> = ({
  match,
}) => {
  const [question, setQuestion] = useState<QuestionData | null>(null)

  const establishSignalRConnection = async (questionId: number) => {
    const connection = new HubConnectionBuilder()
      .withUrl('http://localhost:17525/questionshub')
      .withAutomaticReconnect()
      .build()

    connection.on('ReceiveQuestion', (question: QuestionDataFromServer) => {
      setQuestion(mapQuestionFromServer(question))
    })

    try {
      await connection.start()
    } catch (err) {
      console.log(err)
    }

    if (connection.state === HubConnectionState.Connected) {
      connection.invoke('SubscribeQuestion', questionId).catch((err: Error) => {
        return console.error(err.toString())
      })
    }

    return connection
  }

  const terminateSignalRConnection = async (
    questionId: number,
    connection: HubConnection,
  ) => {
    if (connection.state === HubConnectionState.Connected) {
      try {
        await connection.invoke('UnsubscribeQuestion', questionId)
      } catch (err) {
        return console.error(err.toString())
      }
      connection.off('Message')
      connection.off('ReceiveQuestion')
      connection.stop()
    } else {
      connection.off('Message')
      connection.off('ReceiveQuestion')
      connection.stop()
    }
  }

  useEffect(() => {
    const getQuestion = async (questionId: number) => {
      const question = await getQuestionData(questionId)
      setQuestion(question)
    }

    let connection: HubConnection

    if (match.params.questionId) {
      const questionId = Number(match.params.questionId)
      getQuestion(questionId)
      establishSignalRConnection(questionId).then(x => {
        connection = x
      })
    }

    return function terminate() {
      if (match.params.questionId) {
        const questionId = Number(match.params.questionId)
        terminateSignalRConnection(questionId, connection)
      }
    }
  }, [match.params.questionId])

  const handleSubmit = async (values: Values) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    })
    return { success: result ? true : false }
  }

  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {question ? question.title : ''}
        </div>
        {question !== null && (
          <Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {question.content}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Asked by ${question.userName} on
             ${question.created.toLocaleDateString()}
             ${question.created.toLocaleTimeString()}`}
            </div>
            <AnswerList data={question.answers} />
            <div
              css={css`
                margin-top: 20px;
              `}
            >
              <Form
                submitCaption="Submit"
                validationRules={{
                  content: [
                    { validator: required },
                    { validator: minLength, arg: 50 },
                  ],
                }}
                onSubmit={handleSubmit}
                failureMessage="There was a problem with your answer."
                successMessage="Your answer was successfully submitted."
              >
                <Field name="content" label="Answer" type="TextArea" />
              </Form>
            </div>
          </Fragment>
        )}
      </div>
    </Page>
  )
}
