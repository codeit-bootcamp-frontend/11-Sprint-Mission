import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import GlobalStyle from '@/styles/GlobalStyle';

import Headers from '@/components/layout/Headers';
import { AuthProvider } from '@/context/AuthContext';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <meta property='og:title' content='판다마켓' />
        <meta property='og:description' content='일상의 모든 물건을 거래해보세요' />
        <meta property='og:image' content='/img_landing.png' />
        <meta property='og:type' content='website' />
        <link rel='icon' href='/favicon.svg' />
        <title>판다마켓</title>
      </Head>
      <AuthProvider>
        <GlobalStyle />
        {router.pathname !== '/login' && router.pathname !== '/notfound' && <Headers />}
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}
