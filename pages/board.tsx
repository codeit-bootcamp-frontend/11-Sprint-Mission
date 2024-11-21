import { useState } from "react";
import BestArticles from "@/components/BestArticles";
import AllArticles from "@/components/AllArticles";
import { Article } from "@/types/commontypes";
import styles from "@/styles/board.module.css";

export default function Board() {
  const [articles, setArticles] = useState<Article[]>([]);

  const handleDataFetch = (data: Article[]) => {
    setArticles((prev) => {
      const mergedArticles = [...prev, ...data];
      const uniqueArticles = mergedArticles.filter(
        (article, index, self) =>
          self.findIndex((a) => a.id === article.id) === index
      );

      return uniqueArticles.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });
  };

  return (
    <div className={styles.board_container}>
      <BestArticles articles={articles} />
      <AllArticles onDataFetch={handleDataFetch} />
    </div>
  );
}
