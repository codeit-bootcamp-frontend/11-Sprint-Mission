"use client";

import Image from "next/image";
import styles from "../../styles/sign.module.css";

export default function SocialLogin() {
  return (
    <div className={styles.simpleLogin}>
      간편 로그인하기
      <div className={styles.social}>
        <a
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image width={42} height={42} src="/social/google.png" alt="구글" />
        </a>

        <a
          href="https://www.kakaocorp.com/page/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image width={42} height={42} src="/social/kakao.png" alt="카카오" />
        </a>
      </div>
    </div>
  );
}
