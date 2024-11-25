import Link from 'next/link';
import clsx from 'clsx';
//
import styles from './Footer.module.css';
import IcoFacebook from './ico-facebook.svg';
import IcoTwitter from './ico-twitter.svg';
import IcoYoutube from './ico-youtube.svg';
import IcoInstagram from './ico-instagram.svg';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={clsx(styles.container, 'container')}>
        <p className={styles.copyright}>©codeit - 2024</p>
        <nav className={styles.nav} aria-label="footer navigation">
          <ul className={styles.links}>
            <li>
              <Link href="/privacy" className={styles.link}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/faq" className={styles.link}>
                FAQ
              </Link>
            </li>
          </ul>
        </nav>

        <ul className={styles.sns}>
          <li>
            <Link
              href="https://www.facebook.com/"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IcoFacebook />
            </Link>
          </li>
          <li>
            <Link
              href="https://x.com/"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IcoTwitter />
            </Link>
          </li>
          <li>
            <Link
              href="https://youtube.com/"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IcoYoutube />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.instagram.com/"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IcoInstagram />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
