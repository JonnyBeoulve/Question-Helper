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

export interface PostQuestionData {
  title: string
  content: string
  userName: string
  created: Date
}

export interface PostAnswerData {
  questionId: number
  content: string
  userName: string
  created: Date
}

export interface QuestionDataFromServer {
  questionId: number
  title: string
  content: string
  userName: string
  created: string
  answers: AnswerDataFromServer[]
}
export interface AnswerDataFromServer {
  answerId: number
  content: string
  userName: string
  created: string
}
