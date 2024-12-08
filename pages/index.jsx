import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/icons/ic_logo.svg';
import login from '@/public/icons/ic_login.svg';
import homeTop from '@/public/images/home_top.svg';
import firstSection from '@/public/images/first_main_section.svg';
import secondSection from '@/public/images/second_main_section.svg';
import thirdSection from '@/public/images/third_main_section.svg';
import homeBottom from '@/public/images/home_bottom.svg';
import facebook from '@/public/icons/ic_facebook.svg';
import twitter from '@/public/icons/ic_twitter.svg';
import instagram from '@/public/icons/ic_instagram.svg';
import youtube from '@/public/icons/ic_youtube.svg';
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css';
import Button from '@/components/common/Button';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    router.push('/');
  };

  const handlePandaLogoClick = () => {
    setShowLogout(!showLogout);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image src={logo} alt="로고" />
          <Link href="/" className={styles.title}>
            <h1 className={styles.title}>판다마켓</h1>
          </Link>
        </div>
        {isLoggedIn ? (
          <>
            <button onClick={handlePandaLogoClick}>
              <Image src={login} alt="로그인" />
            </button>
            {showLogout && (
              <button onClick={handleLogout} className={styles.logoutButton}>
                로그아웃
              </button>
            )}
          </>
        ) : (
          <Link href="/login">
            <Button type="button" size="medium">
              로그인
            </Button>
          </Link>
        )}
      </div>
      <div className={styles.landingPage}>
        <div className={styles.blueSection}>
          <div className={styles.topContainer}>
            <div className={styles.topContent}>
              <h2 className={styles.blueSectionText}>
                일상의 모든 물건을 <br />
                거래해 보세요
              </h2>
              <Link href="/items">
                <Button type="button" size="large">
                  구경하러 가기
                </Button>
              </Link>
            </div>
            <Image width={'746'} height={'340'} src={homeTop} alt="거래하는 판다" />
          </div>
        </div>
        <section className={styles.eachSection}>
          <div className={styles.sectionContent}>
            <Image width={'579'} height={'444'} src={firstSection} alt="인기 상품 확인하기" />
            <div className={styles.sectionImage}>
              <span className={styles.sectionSpan}>Hot item</span>
              <div className={styles.sectionText}>
                <h3 className={styles.sectionTitle}>
                  인기 상품을
                  <br />
                  확인해 보세요
                </h3>
                <div>
                  가장 HOT한 중고거래 물품을
                  <br />
                  판다 마켓에서 확인해 보세요
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.eachSection}>
          <div className={styles.sectionReverseContent}>
            <div className={styles.sectionImageReverse}>
              <span className={styles.sectionSpan}>Search</span>
              <div className={styles.sectionTextReverse}>
                <h3 className={styles.sectionTitle}>
                  구매를 원하는
                  <br />
                  상품을 검색하세요
                </h3>
                <div>
                  구매하고 싶은 물품은 검색해서
                  <br />
                  쉽게 찾아보세요
                </div>
              </div>
            </div>
            <Image width={'579'} height={'444'} src={secondSection} alt="원하는 상품 검색하기" />
          </div>
        </section>
        <section className={styles.eachSection}>
          <div className={styles.sectionThirdContent}>
            <Image width={'579'} height={'444'} src={thirdSection} alt="상품 등록하기" />
            <div className={styles.sectionImage}>
              <span className={styles.sectionSpan}>Resister</span>
              <div className={styles.sectionText}>
                <h3 className={styles.sectionTitle}>
                  판매를 원하는
                  <br />
                  상품을 등록하세요
                </h3>
                <div>
                  어떤 물건이든 판매하고 싶은 상품을
                  <br />
                  쉽게 등록하세요
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className={styles.blueSection}>
          <div className={styles.bottom}>
            <div className={styles.bottomContent}>
              <h2 className={styles.blueSectionText}>
                믿을 수 있는
                <br />
                판다마켓 중고 거래
              </h2>
            </div>
            <Image width={'746'} height={'397'} src={homeBottom} alt="판다마켓에서 거래하기" />
          </div>
        </div>
        <footer className={styles.footer}>
          <div className={styles.footerAuth}>
            <div className={styles.authCopyright}>©codeit - 2024</div>
            <div className={styles.authInfo}>
              <div className={styles.authInfoText}>Privacy Policy</div>
              <div className={styles.authInfoText}>FAQ</div>
            </div>
            <div className={styles.authSns}>
              <Link href="https://ko-kr.facebook.com/" target="_blank">
                <Image src={facebook} alt="페이스북" />
              </Link>
              <Link href="https://x.com/" target="_blank">
                <Image src={twitter} alt="트위터" />
              </Link>
              <Link href="https://www.youtube.com/" target="_blank">
                <Image src={youtube} alt="유튜브" />
              </Link>
              <Link href="https://www.instagram.com/" target="_blank">
                <Image src={instagram} alt="인스타그램" />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
