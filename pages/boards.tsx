import BestArticles from "@/components/BestArticles";
import AllArticles from "@/components/AllArticles";
import styles from "@/styles/board.module.css";

export default function Board() {
  return (
    <div className={styles.board_container}>
      <BestArticles />
      <AllArticles />
    </div>
  );
}
