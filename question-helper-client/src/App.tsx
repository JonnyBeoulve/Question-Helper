/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Header } from './common/components/Header/Header'
import {
  CreateQuestionPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  QuestionPage,
  SearchPage,
} from './pages'
import { fontFamily, fontSize, gray2 } from './common/styles/Styles'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div
        css={css`
          font-family: ${fontFamily};
          font-size: ${fontSize};
          color: ${gray2};
        `}
      >
        <Header />
        <Switch>
          <Redirect from="/home" to="/" />
          <Route exact path="/" component={HomePage} />
          <Route path="/create-question" component={CreateQuestionPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/questions/:questionId" component={QuestionPage} />
          <Route path="/search" component={SearchPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
