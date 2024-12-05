'use client';

import React from 'react';
import Image from 'next/image';
import logo from '../assets/logo.svg';
import homeTopImage from '../assets/home/Img_home_top.svg';
import homeBottomImage from '../assets/home/Img_home_bottom.svg';
import homeImage01 from '../assets/home/Img_home_01.svg';
import homeImage02 from '../assets/home/Img_home_02.svg';
import homeImage03 from '../assets/home/Img_home_03.svg';
import facebook from '../assets/SNS/ic_facebook.svg';
import instagram from '../assets/SNS/ic_instagram.svg';
import twitter from '../assets/SNS/ic_twitter.svg';
import youtube from '../assets/SNS/ic_youtube.svg';
import styles from '../styles/HomePage.module.css';

function HomePage() {
  return (
    <>
      <header className={styles.header}>
        <a href="index.html">
          <Image id="logo" alt="logo" src={logo} width={100} height={50} />
        </a>
        <a href="/login" className={styles.login}>
          로그인
        </a>
      </header>

      <main>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <p>
                일상의 모든 물건을 <br className={styles.onlyPC} />
                거래해 보세요
              </p>
              <a href="/items" className={styles.ctaButton}>
                구경하러 가기
              </a>
            </div>
            <Image
              className={styles.heroImage}
              alt="home-top-img"
              src={homeTopImage}
              layout="responsive"
            />
          </div>
        </section>

        <section className={styles.popularItemsSection}>
          <div className={styles.popularItemsContent}>
            <Image
              src={homeImage01}
              alt="popular-items-image"
              layout="responsive"
            />
            <div className={styles.itemDetails}>
              <div className={`${styles.badge} ${styles.hotItem}`}>
                Hot item
              </div>
              <div className={styles.sub}>
                <p className={styles.subtitle}>
                  인기 상품을 <br className={styles.onlyPC} />
                  확인해 보세요
                </p>
                <p className={styles.subContent}>
                  가장 HOT한 중고거래 물품을
                  <br />
                  판다 마켓에서 확인해 보세요
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.searchItemsSection}>
          <div className={styles.searchItemsContent}>
            <div className={styles.itemDetails}>
              <div className={`${styles.badge} ${styles.search}`}>Search</div>
              <div className={styles.sub}>
                <p className={styles.subtitle}>
                  구매를 원하는
                  <br className={styles.onlyPC} />
                  상품을 검색하세요
                </p>
                <p className={styles.subContent}>
                  구매하고 싶은 물품은 검색해서
                  <br />
                  쉽게 찾아보세요
                </p>
              </div>
            </div>
            <Image
              src={homeImage02}
              alt="search-items-image"
              layout="responsive"
            />
          </div>
        </section>

        <section className={styles.registerItemsSection}>
          <div className={styles.registerItemsContent}>
            <Image
              src={homeImage03}
              alt="register-items-image"
              layout="responsive"
            />
            <div className={styles.itemDetails}>
              <div className={`${styles.badge} ${styles.register}`}>
                Register
              </div>
              <div className={styles.sub}>
                <p className={styles.subtitle}>
                  판매를 원하는
                  <br className={styles.onlyPC} />
                  상품을 등록하세요
                </p>
                <p className={styles.subContent}>
                  어떤 물건이든 판매하고 싶은 상품을
                  <br />
                  쉽게 등록하세요
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.bottomGrayBox}></div>

        <section className={styles.trustSection}>
          <div className={styles.trustContent}>
            <p>
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </p>
            <Image
              className={styles.trustImage}
              src={homeBottomImage}
              alt="trust-section-image"
              layout="responsive"
            />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <section className={styles.footerSection}>
          <div className={styles.footerContent}>@codeit - 2024</div>
          <div className={styles.footerPolicyFaq}>
            <a href="privacy">Privacy Policy</a>
            <a href="faq">FAQ</a>
          </div>
          <div className={styles.footerSns}>
            <a href="https://www.facebook.com">
              <Image src={facebook} alt="facebook-logo" layout="responsive" />
            </a>
            <a href="https://twitter.com">
              <Image src={twitter} alt="twitter-logo" layout="responsive" />
            </a>
            <a href="https://www.youtube.com">
              <Image src={youtube} alt="youtube-logo" layout="responsive" />
            </a>
            <a href="https://www.instagram.com">
              <Image src={instagram} alt="instagram-logo" layout="responsive" />
            </a>
          </div>
        </section>
      </footer>
    </>
  );
}

export default HomePage;
