import Link from 'next/link';
import Container from '@/components/Container';
import styles from './Header.module.css';
import pandaLogo from '@/public/panda.svg';
import profile from '@/public/profile.svg';
import Image from 'next/image';

export default function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <div className={styles.headerLeft}>
          <Link href="">
            {/* <Image src={pandaLogo} alt=""></Image> */}
            <div className={styles.logoText}>판다마켓</div>
          </Link>
          <div className={styles.headerLink}>
            <Link href="" className={styles.headerFont}>
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
      </Container>
    </header>
  );
}
