import React from "react";
import Image from "next/image";
import styles from "./BoardSearchSort.module.css";

interface BoardSearchSortProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOrderChange: (newOrder: string) => void;
}

const BoardSearchSort = ({
  searchQuery,
  onSearchChange,
  onOrderChange,
}: BoardSearchSortProps) => {
  return (
    <div className={styles["search-box"]}>
      <input
        className={styles["search-bar"]}
        placeholder="검색할 상품을 입력해주세요"
        onChange={(e) => onSearchChange(e.target.value)}
        value={searchQuery}
      />
      <div className={styles["select-wrapper"]}>
        <select
          className={styles["order-by-select"]}
          onChange={(e) => onOrderChange(e.target.value)}
        >
          <option className={styles.option} value="recent">
            최신순
          </option>
          <option className={styles.option} value="like">
            좋아요순
          </option>
        </select>
        <div className={styles["sort-icon"]}>
          <Image
            className={styles["image-component"]}
            fill
            src="/images/sortIcon.svg"
            alt="화살표"
          />
        </div>
      </div>
    </div>
  );
};

export default BoardSearchSort;
