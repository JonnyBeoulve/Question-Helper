export interface Values {
  [key: string]: any
}

export interface Touched {
  [key: string]: boolean
}

export interface Errors {
  [key: string]: string[]
}

export type Validator = (value: any, args?: any) => string

export interface Validation {
  validator: Validator
  arg?: any
}

export interface ValidationProp {
  [key: string]: Validation | Validation[]
}
