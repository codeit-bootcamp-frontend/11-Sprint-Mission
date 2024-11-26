import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles["nav-container"]}>
      <div className={styles["nav-box"]}>
        <div className={styles.logo}>
          <Image
            className={styles["image-components"]}
            fill
            src="/images/logoBig.svg"
            alt="판다마켓 로고 이미지"
          />
        </div>
        <div className={styles["logo-small"]}>
          <Image
            className={styles["image-components"]}
            fill
            src="/images/logoSmall.svg"
            alt="판다마켓 로고 이미지"
          />
        </div>
        <div className={styles["text-box"]}>
          <p className={styles.text}>자유게시판</p>
          <p className={styles.text}>중고마켓</p>
        </div>
      </div>
      <div className={styles.profile}>
        <Image
          className={styles["image-components"]}
          fill
          src="/images/profileBig.svg"
          alt="프로필 이미지"
        />
      </div>
    </div>
  );
};

export default Header;
