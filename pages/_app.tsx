import Header from '@/components/Header';
import '@/styles/reset.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Container from '@/components/Container';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
}
