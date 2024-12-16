'use client';

// next
import Head from 'next/head';
import { usePathname } from 'next/navigation';

// components, context
import Header from '@/components/Header';
import { AuthProvider } from './context/AuthContext';

// css
import '@/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="ko">
      <Head>
        <title>판다마켓</title>
        <meta name="description" content="일상의 모든 물건을 거래해보세요!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased">
        <AuthProvider>
          {pathname !== '/login' && pathname !== '/signup' && <Header />}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
