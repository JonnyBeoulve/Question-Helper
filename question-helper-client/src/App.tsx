/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Header } from './common/components/Header/Header';
import { Home } from './pages/Home/Home';
import { fontFamily, fontSize, gray2 } from './common/styles/Styles';

const App: React.FC = () => {
  return (
    <div
      css={css`
        font-family: ${fontFamily};
        font-size: ${fontSize};
        color: ${gray2};
      `}
    >
      <Header />
      <Home />
    </div>
  );
};

export default App;
