import Image from "next/image";
import styles from "./AllPostPagination.module.css";

export default function Pagination({
  currentPage,
  totalArticles,
  onPageChange,
}: {
  currentPage: number;
  totalArticles: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalArticles / 10);

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.paginationButton}
      >
        <Image
          width={20}
          height={20}
          src="/images/ic_left.png"
          alt="왼쪽 화살표"
        />
      </button>
      <span>{currentPage}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={styles.paginationButton}
      >
        <Image
          width={20}
          height={20}
          src="/images/ic_right.png"
          alt="오른쪽 화살표"
        />
      </button>
    </div>
  );
}
