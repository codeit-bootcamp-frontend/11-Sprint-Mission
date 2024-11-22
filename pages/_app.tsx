import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}
