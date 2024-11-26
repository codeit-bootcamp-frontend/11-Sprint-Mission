import Link from 'next/link';
import clsx from 'clsx';
//
import styles from './Footer.module.css';
import IcoFacebook from './ico-facebook.svg';
import IcoTwitter from './ico-twitter.svg';
import IcoYoutube from './ico-youtube.svg';
import IcoInstagram from './ico-instagram.svg';

// SNS 목록
const snsList = [
  {
    name: 'facebook',
    url: 'https://www.facebook.com/',
    icon: IcoFacebook,
  },
  {
    name: 'twitter',
    url: 'https://x.com/',
    icon: IcoTwitter,
  },
  {
    name: 'youtube',
    url: 'https://youtube.com/',
    icon: IcoYoutube,
  },
  {
    name: 'instagram',
    url: 'https://www.instagram.com/',
    icon: IcoInstagram,
  },
];

/**
 * SNS 링크 컴포넌트
 * @returns {JSX.Element}
 */
const SnsLinks = () => {
  return (
    <ul className={styles.sns}>
      {snsList.map((sns) => (
        <li key={sns.name}>
          <Link href={sns.url} className={styles.link} target="_blank" rel="noopener noreferrer">
            <sns.icon />
          </Link>
        </li>
      ))}
    </ul>
  );
};

/**
 * 푸터 컴포넌트
 * @returns {JSX.Element}
 */
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

        <SnsLinks />
      </div>
    </footer>
  );
}
