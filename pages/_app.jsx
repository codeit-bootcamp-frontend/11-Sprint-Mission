// import type { AppProps } from 'next/app'
import Header from '../components/Header';
import '@/styles/globals.css';
import '@/styles/Header.module.css';
import '@/styles/Boards.module.css';
import '@/styles/BestBoard.module.css';
import '@/styles/EntireBoard.module.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
