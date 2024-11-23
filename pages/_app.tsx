import type { AppProps } from 'next/app';
import Head from 'next/head';
//
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
//
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
      </Head>

      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
