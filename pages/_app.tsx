import { AppProps } from 'next/app';
import Layout from '@components/Layout/Layout';
import React from 'react';
import { AuthProvider } from '@/contexts/AuthProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  );
}
