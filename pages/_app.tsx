/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import GlobalStyle from '@/styles/global';
import color from '@/styles/color';
import { ThemeProvider } from 'styled-components';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={color}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
