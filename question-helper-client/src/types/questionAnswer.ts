export interface QuestionData {
  questionId: number
  title: string
  content: string
  userName: string
  created: Date
  answers: AnswerData[]
}

export interface AnswerData {
  answerId: number
  content: string
  userName: string
  created: Date
}
