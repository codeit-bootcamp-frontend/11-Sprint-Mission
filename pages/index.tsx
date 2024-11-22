import Head from 'next/head';
import Link from 'next/link';
import clsx from 'clsx';
//
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
//
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>판다마켓 - desc</title>
      </Head>

      <Nav />

      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heading}>
            일상의 모든 물건을 <br className="br-lg br-sm" /> 거래해 보세요
          </h1>
          <Link className={clsx(styles.btn, 'btn', 'btn-rounded')} href="/items">
            구경하러 가기
          </Link>
        </div>
      </section>

      {/* hot item section */}

      {/* search section */}

      {/* register section */}

      {/* bottom visual */}

      <Footer />
    </>
  );
}
