import styles from '@/styles/NavBar.module.css';
import Image from 'next/image';
import Link from 'next/link';


export default function NavBar() {
  return (
    <header className={styles.navBar}>
      <div className={styles.container}>
        <nav className={styles.navArea}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/판다얼굴.svg"
              alt="판다로고"
              width={40} height={40} //성능 최적화를 위해 직접 지정
              className={styles.logoImage}
            /> 
            <Image
              src="/판다마켓.svg"
              alt="판다마켓"
              width={100} height={50}
              className={styles.titleImage}
            />
          </Link>
          
          <ul className={styles.nav}>
            <li className={styles.navList}>
              <Link href="/boards" className={styles.boards}>
                자유게시판
              </Link>
            </li>
            <li className={styles.navList}>
              <Link href="/items" className={styles.market}>
                중고마켓
              </Link>
            </li>
          </ul>
        </nav>

        <Link href="/profile" className={styles.profileLink}>
          <Image
            src="/profile.svg"
            alt="프로필"
            width={40} height={40}
            className={styles.profileImage}
          />
        </Link>
      </div>
    </header>
  );
}