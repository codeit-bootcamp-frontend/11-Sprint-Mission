import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import '@styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      router.replace('/boards');
    }
  }, [router]);

  return <Component {...pageProps} />;
}
