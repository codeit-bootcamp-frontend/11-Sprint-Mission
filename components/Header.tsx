import Link from 'next/link';
import styles from './Header.module.css';
import pandaLogo from '@/public/panda.svg';
import profile from '@/public/profile.svg';
import Image from 'next/image';
import React from 'react';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerLayout}>
        <div className={styles.headerLeft}>
          <Link href="/">
            {/* <Image src={pandaLogo} alt=""></Image> */}
            <div className={styles.logoText}>판다마켓</div>
          </Link>
          <div className={styles.headerLink}>
            <Link href="/boards" className={styles.headerFont}>
              <div>자유게시판</div>
            </Link>
            <Link href="" className={styles.headerFont}>
              <div>중고마켓</div>
            </Link>
          </div>
        </div>
        <Link className={styles.setting} href="/setting">
          <Image src={profile} alt=""></Image>
        </Link>
      </div>
    </header>
  );
}
