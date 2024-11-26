// next
import type { Metadata } from 'next';
import Head from 'next/head';

// components
import Header from '@/components/Header';

// css
import '@/globals.css';

export const metadata: Metadata = {
  title: '판다마켓',
  description: '일상의 모든 물건을 거래해보세요!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
