// 'App' 구성 요소에 대해 특별히 규칙을 비활성화
/* eslint-disable react/jsx-props-no-spreading */

import type { AppProps } from 'next/app';
import GlobalStyle from '@/styles/global';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
