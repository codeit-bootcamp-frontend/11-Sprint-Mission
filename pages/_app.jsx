// import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import Header from '../components/Header';
import '@/styles/globals.css';
import '@/styles/Home.module.css'
import '@/styles/JoinForm.module.css'
import '@/styles/Header.module.css';
import '@/styles/Boards.module.css';
import '@/styles/BestBoard.module.css';
import '@/styles/EntireBoard.module.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noHeaderPages = ['/signup', '/login', '/'];

  return (
    <>
      {!noHeaderPages.includes(router.pathname) && <Header />}
      <Component {...pageProps} />
    </>
  );
}
