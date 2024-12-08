import Button from "../common/Button";
import DropDown from "../common/DropDown";
import Input from "../common/Input";
import styles from "@/components/boards/AllArticles.module.css";
import SearchIcon from "@/assets/images/icons/ic_search.svg";
import Link from "next/link";
import Image from "next/image";
import ImageTemplate from "@/assets/images/ui/empty-comments.svg";
import Heart from "@/assets/images/icons/ic_heart.svg";
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

export default function AllArticles({ articles }: { articles: ArticleList }) {
  return (
    <div className={styles["all-articles-container"]}>
      <div className={styles["title-button"]}>
        <h2>게시글</h2>
        <Button buttonName="글쓰기" />
      </div>
      <div className={styles["input-dropdown"]}>
        <Input
          placeholder="검색할 상품을 입력해주세요"
          type="search"
          className="search"
          src={SearchIcon}
          alt="돋보기 아이콘"
          width={24}
          height={24}
        />
        <DropDown />
      </div>
      <ul>
        {articles.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          articles.map((article: Article) => (
            <li key={article.id}>
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
