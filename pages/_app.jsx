// import type { AppProps } from 'next/app'
import Header from '../components/Header';
import '@/styles/globals.css';
import '@/styles/header.css';
import '@/styles/bestBoard.css';
import '@/styles/entireBoard.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
