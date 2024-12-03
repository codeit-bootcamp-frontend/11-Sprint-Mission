import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/images/logo.svg";
import Profile from "../../public/images/profile.svg";
import styles from "../../styles/Header.module.css"; // CSS Modules import

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerSection}>
        <Link href="/" className={styles.homeLogo}>
          <Image src={Logo} alt="판다마켓 로고" className={styles.logoImg} />
        </Link>

        <nav>
          <div className={styles.listSection}>
            <Link href="/CommunityPage" className={styles.communityLink}>
              자유게시판
            </Link>
            <Link href="/MarketPage" className={styles.itemLink}>
              중고마켓
            </Link>
          </div>
        </nav>
      </div>

      <Link href="/LoginPage" className={styles.profileSection}>
        <Image src={Profile} alt="프로필" className={styles.profileImg} />
      </Link>
    </header>
  );
};

export default Header;
