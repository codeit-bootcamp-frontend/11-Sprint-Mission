import { getArticleList } from "@/lib/article.api";
import { Article, ArticleList } from "@/types/Article";
import Image from "next/image";
import { useEffect, useState } from "react";

const mock_article: ArticleList = { totalCount: 0, list: [] };

export default function Board() {
  const [articles, setArticles] = useState(mock_article);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticleList();
      setArticles(data);
    };
    fetchArticles();
  }, []);

  return (
    <>
      <BestPostBoard />
      <PostBoard articles={articles} />
    </>
  );
}

function BestPostBoard() {
  return null;
}

function PostBoard({ articles }: { articles: ArticleList }) {
  return (
    <div>
      <header>
        <h2>게시글</h2>
        <button>글쓰기</button>
      </header>
      <div>
        <form>
          <fieldset>
            <label>
              <Image
                width={20}
                height={20}
                src="/images/ic_search.svg"
                alt="겅색할 상품을 입력해주세요"
              />
              <input type="text" placeholder="검색할 상품을 입력해주세요" />
            </label>
          </fieldset>
        </form>
        <div>
          <div>
            <span>최신순</span>
            <Image
              width={20}
              height={20}
              src="/images/ic_arrow_down.svg"
              alt="정렬"
            />
          </div>
        </div>
      </div>
      <div>
        {articles.list.map((article) => (
          <PostBoardItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

function PostBoardItem({ article }: { article: Article }) {
  return (
    <div>
      <div>
        <div
          style={{
            position: "relative",
            width: "48px",
            height: "48px",
          }}
        >
          {article.image && (
            <Image
              fill
              src={article.image}
              alt={article.title}
              style={{
                objectFit: "cover",
              }}
            />
          )}
        </div>
        {article.title}
      </div>
      <div>
        <div>
          <div style={{ position: "relative", width: "24px", height: "24px" }}>
            <Image
              fill
              src="/images/profile.svg"
              alt={article.writer.nickname}
            />
          </div>
          <span>{article.writer.nickname}</span>
          <span>{article.createdAt}</span>
        </div>
        <div>
          <div style={{ position: "relative", width: "24px", height: "24px" }}>
            <Image
              fill
              src="/images/ic_heart.svg"
              alt={article.writer.nickname}
            />
          </div>
          <span>{article.likeCount < 10000 ? article.likeCount : "9999+"}</span>
        </div>
      </div>
    </div>
  );
}
