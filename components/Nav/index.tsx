import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
//
import styles from './Nav.module.css';
import LogoImg from './logo.svg';
import LogoTextImg from './txt-panda.svg';

// nav links
const navLinks = [
  { href: '/boards', label: '자유게시판' },
  { href: '/items', label: '중고마켓' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.gnb} aria-label="Global">
          <Link href="/" className="flex items-center gap-2">
            <LogoImg className="hidden sm:block" />
            <LogoTextImg className="w-20 sm:w-auto" />
          </Link>

          <ul className={styles.links}>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={clsx(styles.link, pathname === href && styles.active)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link className="btn" href="/login">
          로그인
        </Link>
      </div>
    </header>
  );
}
