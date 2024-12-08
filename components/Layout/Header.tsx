import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@styles/Header.module.css';
import Image from 'next/image';

const Header = () => {
  const { pathname } = useRouter();

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles['nav-front']}>
          <Link href="/">
            <Image
              src="/svgs/ic_logo.svg"
              alt="판다마켓 로고"
              width={100}
              height={50}
            />
          </Link>
          <div className={styles['nav-link']}>
            <Link className={styles['nav-list']} href="/board">
              자유게시판
            </Link>
            <Link
              href="/items"
              className={
                pathname === '/items' || pathname === '/additem'
                  ? styles['active-link nav-list']
                  : styles['nav-list']
              }
            >
              중고마켓
            </Link>
          </div>
        </div>
        <Link className={styles['login']} href="/login">
          로그인
        </Link>
      </nav>
    </>
  );
};

export default Header;
