import { createContext } from 'react'
import { Errors, Touched, Values } from '../../../types'

interface FormContextProps {
  values: Values
  setValue?: (fieldName: string, value: any) => void
  touched: Touched
  setTouched?: (fieldName: string) => void
  errors: Errors
  validate?: (fieldName: string) => void
}

export const FormContext = createContext<FormContextProps>({
  values: {},
  touched: {},
  errors: {},
})
