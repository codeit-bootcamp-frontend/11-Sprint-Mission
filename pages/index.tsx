import Head from 'next/head';
import Link from 'next/link';
import clsx from 'clsx';
//
import styles from '@/styles/Home.module.css';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>판다마켓 - 일상의 모든 물건을 거래해 보세요</title>
      </Head>

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

      <section className={styles.section}>
        <div className={styles.container}>
          <Image
            src="/images/main/hot-item.png"
            alt=""
            className={styles.sectionImg}
            width="579"
            height="444"
          />
          <div className={styles.sectionContent}>
            <span className={styles.sectionPoint}>Hot item</span>
            <h2 className={styles.sectionTitle}>
              인기상품을 <br className="br-lg" /> 확인해 보세요
            </h2>
            <p className={styles.sectionDesc}>
              가장 HOT한 중고거래 물품을 <br /> 판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={clsx(styles.sectionContent, styles.right)}>
            <span className={styles.sectionPoint}>Search</span>
            <h2 className={styles.sectionTitle}>
              구매를 원하는 <br className="br-lg" /> 상품을 검색하세요
            </h2>
            <p className={styles.sectionDesc}>
              구매하고 싶은 물품은 검색해서 <br /> 쉽게 찾아보세요
            </p>
          </div>
          <Image
            src="/images/main/search.png"
            alt=""
            width="579"
            height="444"
            className={clsx(styles.sectionImg, styles.right)}
          />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <Image
            src="/images/main/register.png"
            alt=""
            width="579"
            height="444"
            className={styles.sectionImg}
          />
          <div className={styles.sectionContent}>
            <span className={styles.sectionPoint}>Register</span>
            <h2 className={styles.sectionTitle}>
              판매를 원하는 <br className="br-lg" /> 상품을 등록하세요
            </h2>
            <p className={styles.sectionDesc}>
              어떤 물건이든 판매하고 싶은 상품을 <br /> 쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      <div className={styles.bottomVisual}>
        <div className={styles.container}>
          <h2 className={styles.heading}>
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </h2>
        </div>
      </div>

      <style jsx>{`
        :global(.wrap) {
          --body-bg: #fcfcfc;
        }
      `}</style>
    </>
  );
}
