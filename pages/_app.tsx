import type { AppProps } from 'next/app';
import Head from 'next/head';
//
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
//
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
      </Head>

      <Nav />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
