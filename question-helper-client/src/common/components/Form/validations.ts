import { Validator } from '../../../types'

export const required: Validator = (value: any): string =>
  value === undefined || value === null || value === '' ? 'Required.' : ''

export const minLength: Validator = (value: any, length: number): string =>
  value && value.length < length ? `Must be at least ${length} characters` : ''
