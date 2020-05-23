import { lazy, Suspense } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Provider } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { HeaderWithRouter as Header } from './common/components'
import HomePage from './pages/Home/HomePage'
import { LoginPage, NotFoundPage, QuestionPage, SearchPage } from './pages'
import { fontFamily, fontSize, gray2 } from './common/styles/style'
import { configureStore } from './store'

const CreateQuestionPage = lazy(() =>
  import('./pages/CreateQuestion/CreateQuestionPage'),
)

const store = configureStore()

const App: React.FC = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App
