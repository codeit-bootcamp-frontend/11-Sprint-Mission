// import type { AppProps } from 'next/app'
import Header from '../components/Header';
import '../styles/Header.css';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
