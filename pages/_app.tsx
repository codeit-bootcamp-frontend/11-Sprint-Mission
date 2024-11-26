import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import GlobalStyle from '@/styles/GlobalStyle';

import Headers from '@/components/layout/Headers';
import { AuthProvider } from '@/context/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta property='og:title' content='판다마켓' />
        <meta
          property='og:description'
          content='일상의 모든 물건을 거래해보세요'
        />
        <meta property='og:image' content='/img_landing.png' />
        <meta property='og:type' content='website' />
        <link rel='icon' href='/favicon.svg' />
        <title>판다마켓</title>
      </Head>
      <AuthProvider>
        <GlobalStyle />
        {router.pathname !== '/login' && router.pathname !== '/notfound' && (
          <Headers />
        )}
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
