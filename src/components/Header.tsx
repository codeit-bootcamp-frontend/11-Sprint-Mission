'use client';

import logoImg from '../assets/Group 19.svg';
import loginImg from '../assets/Frame.svg';
import styles from '../styles/Header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function Header() {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <div className={styles.headerBody}>
        <div className={styles.headerLeft}>
          <div className={styles.imgContainer}>
            <img className={styles.logoImg} src={logoImg} alt="logoImg" />
          </div>
          <nav className={styles.nav}>
            <Link href="/">
              <div>자유게시판</div>
            </Link>
            <Link href="/items">
              <div>중고마켓</div>
            </Link>
          </nav>
        </div>
        <Link href="/">
          <div>
            <img src={loginImg} alt="loginImgBtn" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
