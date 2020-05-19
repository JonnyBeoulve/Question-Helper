import React from 'react'
import { Field, Form, minLength, Page, required } from '../../common/components'
import { postQuestion } from '../../utils/questionUtils'
import { Values } from '../../types'

export const CreateQuestionPage = () => {
  const handleSubmit = async (values: Values) => {
    const question = await postQuestion({
      title: values.title,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    })

    return { success: question ? true : false }
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
        failureMessage="There was a problem with your question."
        successMessage="Your question was successfully submitted."
      >
        <Field name="title" label="Title" />
        <Field name="content" label="Content" type="TextArea" />
      </Form>
    </Page>
  )
}

export default CreateQuestionPage
