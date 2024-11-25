import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navBox}>
        <img
          className={styles.logo}
          src="/images/logoBig.svg"
          alt="판다마켓 로고 이미지"
        />
        <img
          className={styles.logoSmall}
          src="/images/logoSmall.svg"
          alt="판다마켓 로고 이미지"
        />
        <div className={styles.textBox}>
          <p className={styles.text}>자유게시판</p>
          <p className={styles.text}>중고마켓</p>
        </div>
      </div>
      <img
        className={styles.profile}
        src="/images/profileBig.svg"
        alt="프로필 이미지"
      />
    </div>
  );
};

export default Header;
