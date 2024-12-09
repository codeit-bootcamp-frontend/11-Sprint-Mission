import Image from "next/image";
import Badge from "@/assets/images/ui/img_badge.svg";
import Link from "next/link";
import Heart from "@/assets/images/icons/ic_heart.svg";
import styles from "@/components/Boards/BestArticles.module.css";
import ImageTemplate from "@/assets/images/ui/empty-comments.svg";
import { format } from "date-fns";

interface Article {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string;
  content: string;
  title: string;
  id: number;
}

type ArticleList = Article[];

export default function BestArticles({ articles }: { articles: ArticleList }) {
  console.log(articles);
  return (
    <div className={styles["best-article-container"]}>
      <h1>베스트 게시글</h1>
      <ul>
        {articles.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          articles.map((article: Article) => (
            <li key={article.id}>
              <Image src={Badge} alt="Best Badge" width={102} height={30} />
              {/* 베스트 게시글 클릭했을 때 해당 게시글로 이동했으면 좋겠다 싶어서 임의로 경로 설정 */}
              <Link href={`/articles/${article.id}`}>
                <div>
                  <div className={styles["title-image"]}>
                    <p className={styles.title}>{article.title}</p>
                    <Image
                      src={article.image || ImageTemplate}
                      alt={article.title}
                      width={72}
                      height={72}
                      className={styles["article-image"]}
                    />
                  </div>
                  <div className={styles.info}>
                    <div className={styles["info-left"]}>
                      <span>{article.writer.nickname}</span>
                      <div className={styles.likes}>
                        <Image
                          src={Heart}
                          alt="좋아요 버튼"
                          width={16}
                          height={16}
                        />
                        <span>{article.likeCount}</span>
                      </div>
                    </div>
                    {/* date-fns 라이브러리 활용 */}
                    <span className={styles.date}>
                      {format(article.createdAt, "yyyy. MM. dd")}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
