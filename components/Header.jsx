// Header.jsx
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/ic_logo.svg';
import login from '@/public/ic_login.svg';
import styles from '@/styles/Header.module.css'

function Header() {
  return (
    <header className={styles.navBar}>
      <nav className={styles.navContent}>
        <div className={styles.logo}>
          <Image src={logo} alt="로고" />
          <Link href="/" className={styles.title}>
            판다마켓
          </Link>
        </div>
        <ul className={styles.tab}>
          <li className={styles.tabList}>
            <Link id={styles.boards} href="/boards">
              자유게시판
            </Link>
          </li>
          <li className={styles.tabList}>
            <Link id={styles.fleaMarket} href="/items">
              중고마켓
            </Link>
          </li>
        </ul>
      </nav>
      <Image src={login} alt="캐릭터" />
    </header>
  );
}

export default Header;
