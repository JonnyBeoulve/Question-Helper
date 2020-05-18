import React from 'react'
import { Field, Form, Page } from '../../common/components'

export const CreateQuestionPage = () => (
  <Page title="Create Question">
    <Form submitCaption="Submit">
      <Field name="title" label="Title" />
      <Field name="content" label="Content" type="TextArea" />
    </Form>
  </Page>
)

export default CreateQuestionPage
