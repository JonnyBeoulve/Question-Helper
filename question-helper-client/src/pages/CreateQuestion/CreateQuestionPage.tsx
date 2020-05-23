import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { Field, Form, minLength, Page, required } from '../../common/components'
import {
  postQuestionActionCreator,
  clearPostedQuestionActionCreator,
} from '../../store'
import {
  AppState,
  SubmitResult,
  PostQuestionData,
  QuestionData,
  Values,
} from '../../types'

interface Props {
  postedQuestionResult?: QuestionData
  postQuestion: (question: PostQuestionData) => Promise<void>
  clearPostedQuestion: () => void
}

const CreateQuestionPage: FC<Props> = ({
  postedQuestionResult,
  postQuestion,
  clearPostedQuestion,
}) => {
  useEffect(() => {
    return function cleanUp() {
      clearPostedQuestion()
    }
  }, [clearPostedQuestion])

  const handleSubmit = (values: Values) => {
    postQuestion({
      title: values.title,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    })
  }

  let submitResult: SubmitResult | undefined
  if (postedQuestionResult) {
    submitResult = { success: postedQuestionResult !== undefined }
  }

  return (
    <Page title="Create Question">
      <Form
        submitCaption="Submit"
        validationRules={{
          title: [{ validator: required }, { validator: minLength, arg: 10 }],
          content: [{ validator: required }, { validator: minLength, arg: 50 }],
        }}
        onSubmit={handleSubmit}
        submitResult={submitResult}
        failureMessage="There was a problem with your question."
        successMessage="Your question was successfully submitted."
      >
        <Field name="title" label="Title" />
        <Field name="content" label="Content" type="TextArea" />
      </Form>
    </Page>
  )
}

const mapStateToProps = (store: AppState) => {
  return {
    postedQuestionResult: store.questions.postedResult,
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    postQuestion: (question: PostQuestionData) =>
      dispatch(postQuestionActionCreator(question)),
    clearPostedQuestion: () => dispatch(clearPostedQuestionActionCreator()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestionPage)
