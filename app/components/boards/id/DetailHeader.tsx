import React from "react";
import Image from "next/image";
import styles from "./DetailHeader.module.css";

interface HeaderProps {
  title: string;
  nickname: string;
  date: string;
  likeCount: number;
}

export default function BoardDetailHeader({
  title,
  nickname,
  date,
  likeCount,
}: HeaderProps) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.meta}>
        <div className={styles.userInfo}>
          <p className={styles.nickname}>{nickname}</p>
          <p className={styles.date}>{date}</p>
        </div>
        <div className={styles.likeContainer}>
          <div className={styles.like}>
            <Image
              src="/images/ic_heart.png"
              alt="좋아요"
              width={20}
              height={20}
            />
            {likeCount}
          </div>
        </div>
      </div>
    </div>
  );
}
