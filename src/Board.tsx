import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';

function Board({ children }: { children: ReactNode }) {
  return (
    <>
      <Helmet>
        <title>{children}</title>
      </Helmet>
      <h1 style={{ textAlign: 'center' }}>추후 작업됩니다.</h1>
    </>
  );
}

export default Board;
