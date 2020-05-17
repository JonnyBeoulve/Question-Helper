import { lazy, Suspense } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { HeaderWithRouter as Header } from './common/components'
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  QuestionPage,
  SearchPage,
} from './pages'
import { fontFamily, fontSize, gray2 } from './common/styles/Styles'

const CreateQuestionPage = lazy(() =>
  import('./pages/CreateQuestion/CreateQuestionPage'),
)

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
          <Route path="/create-question">
            <Suspense
              fallback={
                <div
                  css={css`
                    margin-top: 100px;
                    text-align: center;
                  `}
                >
                  {' '}
                  Loading...
                </div>
              }
            >
              <CreateQuestionPage />
            </Suspense>
          </Route>
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
