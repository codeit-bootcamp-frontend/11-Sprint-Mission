import Image from 'next/image';
import Link from 'next/link';
//
import styles from './Nav.module.css';
import LogoImg from './logo.svg';
import LogoTextImg from './txt-panda.svg';

export default function Nav() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.gnb} aria-label="Global">
          <Link href="/" className="flex items-center gap-2">
            <LogoImg className="hidden sm:block" />
            <LogoTextImg className="w-20 sm:w-auto" />
          </Link>

          <ul className={styles.links}>
            <li>
              <Link href="#/" className={styles.link}>
                자유게시판
              </Link>
            </li>
            <li>
              <Link href="/" className={styles.link}>
                중고마켓
              </Link>
            </li>
          </ul>
        </nav>

        <Link className="btn" href="/login">
          로그인
        </Link>
      </div>
    </header>
  );
}
