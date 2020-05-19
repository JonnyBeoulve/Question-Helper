import { FC, FormEvent, useState } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { PrimaryButton, gray5, gray6 } from '../../styles'
import {
  Errors,
  Touched,
  Validation,
  ValidationProp,
  Values,
} from '../../../types'
import { FormContext } from './FormContext'

interface SubmitResult {
  success: boolean
  errors?: Errors
}

interface Props {
  submitCaption?: string
  validationRules?: ValidationProp
  successMessage?: string
  failureMessage?: string
  onSubmit: (values: Values) => Promise<SubmitResult>
}

export const Form: FC<Props> = ({
  submitCaption,
  validationRules,
  successMessage = 'Success!',
  failureMessage = 'Something went wrong',
  onSubmit,
  children,
}) => {
  const [values, setValues] = useState<Values>({})
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Touched>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const validate = (fieldName: string): string[] => {
    if (!validationRules) {
      return []
    }

    if (!validationRules[fieldName]) {
      return []
    }

    const rules = Array.isArray(validationRules[fieldName])
      ? (validationRules[fieldName] as Validation[])
      : ([validationRules[fieldName]] as Validation[])

    const fieldErrors: string[] = []
    rules.forEach(rule => {
      const error = rule.validator(values[fieldName], rule.arg)
      if (error) {
        fieldErrors.push(error)
      }
    })

    const newErrors = { ...errors, [fieldName]: fieldErrors }
    setErrors(newErrors)
    return fieldErrors
  }

  const validateForm = () => {
    const newErrors: Errors = {}
    let haveError: boolean = false
    if (validationRules) {
      Object.keys(validationRules).forEach(fieldName => {
        newErrors[fieldName] = validate(fieldName)
        if (newErrors[fieldName].length > 0) {
          haveError = true
        }
      })
    }
    setErrors(newErrors)
    return !haveError
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validateForm()) {
      setSubmitting(true)
      setSubmitError(false)

      const result = await onSubmit(values)

      setErrors(result.errors || {})
      setSubmitError(!result.success)
      setSubmitting(false)
      setSubmitted(true)
    }
  }

  return (
    <FormContext.Provider
      value={{
        values,
        setValue: (fieldName: string, value: any) => {
          setValues({ ...values, [fieldName]: value })
        },
        errors,
        validate,
        touched,
        setTouched: (fieldName: string) => {
          setTouched({ ...touched, [fieldName]: true })
        },
      }}
    >
      <form noValidate={true} onSubmit={handleSubmit}>
        <fieldset
          disabled={submitting || (submitted && !submitError)}
          css={css`
            margin: 10px auto 0 auto;
            padding: 30px;
            width: 350px;
            background-color: ${gray6};
            border-radius: 4px;
            border: 1px solid ${gray5};
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
          `}
        >
          {children}
          <div
            css={css`
              margin: 30px 0px 0px 0px;
              padding: 20px 0px 0px 0px;
              border-top: 1px solid ${gray5};
            `}
          >
            <PrimaryButton type="submit">{submitCaption}</PrimaryButton>
            {submitted && submitError && (
              <p
                css={css`
                  color: red;
                `}
              >
                {failureMessage}
              </p>
            )}
            {submitted && !submitError && (
              <p
                css={css`
                  color: green;
                `}
              >
                {successMessage}
              </p>
            )}
          </div>
        </fieldset>
      </form>
    </FormContext.Provider>
  )
}
