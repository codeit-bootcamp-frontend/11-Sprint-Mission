import { AppProps } from 'next/app';
import Layout from '@components/Layout/Layout';
import React from 'react';
import { AuthProvider } from '@/contexts/AuthProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
