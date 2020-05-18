import { FC, useState } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { PrimaryButton, gray5, gray6 } from '../../styles/Styles'
import {
  Errors,
  Touched,
  Validation,
  ValidationProp,
  Values,
} from '../../../types'
import { FormContext } from './FormContext'

type Props = {
  submitCaption?: string
  validationRules?: ValidationProp
}

export const Form: FC<Props> = ({
  submitCaption,
  validationRules,
  children,
}) => {
  const [values, setValues] = useState<Values>({})
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Touched>({})

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
      <form noValidate={true}>
        <fieldset
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
          </div>
        </fieldset>
      </form>
    </FormContext.Provider>
  )
}
