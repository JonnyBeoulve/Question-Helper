import { useEffect, useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { PrimaryButton } from '../../common/styles/Styles';
import { Page } from '../../common/components/Page/Page';
import { PageTitle } from '../../common/components/Page/PageTitle';
import { QuestionList } from '../../common/components/QuestionList/QuestionList';
import { getUnansweredQuestions } from '../../utils/questionUtils';
import { QuestionData } from '../../fixtures/questions';

export const Home = () => {
  const [questions, setQuestions] = useState<QuestionData[] | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      setQuestions(unansweredQuestions);
      setQuestionsLoading(false);
    };
    doGetUnansweredQuestions();
  }, []);

  const handleAskQuestionClick = () => {
    console.log('@@TODO: Transition to the AskPage');
  };

  return (
    <Page>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <PageTitle>Unanswered Questions</PageTitle>
        <PrimaryButton onClick={handleAskQuestionClick}>
          Ask Question
        </PrimaryButton>
      </div>
      {questionsLoading ? (
        <div
          css={css`
            font-size: 16px;
            font-style: italic;
          `}
        >
          Loading...
        </div>
      ) : (
        <QuestionList data={questions || []} />
      )}
    </Page>
  );
};
