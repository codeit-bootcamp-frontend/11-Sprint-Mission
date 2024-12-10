import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import MedalIcon from "@/public/images/ic_medal.svg";
import { Article, ArticleList } from "@/types/Types";

const BestArticleCard = ({ article }: { article: Article }) => {
  const formatDate = format(article.createdAt, "yyyy. MM. dd");

  return (
    <>
      <Link href={`/board/${article.id}`}>
        <div>
          <Image src={MedalIcon} alt="베스트 게시글" width={24} height={24} />
          Best
        </div>

        <div>
          <div>
            <h3>{article.title}</h3>
            {article.image && (
              <div>
                <Image
                  src={article.image}
                  alt={`${article.id}번 게시글 이미지`}
                  // style={{ objectFit: "contain" }}
                  width="24"
                  height="24"
                />
              </div>
            )}
          </div>

          <div>
            <div>{article.writer.nickname}</div>
            {/* 하트 */}
          </div>
          <div>{formatDate}</div>
        </div>
      </Link>
    </>
  );
};

const getPageSize = (width: number): number => {
  if (width < 768) {
    // 모바일
    return 1;
  } else if (width < 1280) {
    // 태블릿
    return 2;
  } else {
    // PC
    return 3;
  }
};

// 너비 추적
const useViewport = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return width;
};

const BestArticle = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageSize, setPageSize] = useState<number | null>(null);

  const viewportWidth = useViewport();

  useEffect(() => {
    if (viewportWidth === 0) return;

    const newPageSize = getPageSize(viewportWidth);

    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);

      const fetchArticles = async (size: number) => {
        try {
          const response = await fetch(
            `https://panda-market-api.vercel.app/articles?orderBy=like&pageSize=${size}`
          );
          const data: ArticleList = await response.json();
          setArticles(data.list);
        } catch (error) {
          console.error("실패:", error);
        }
      };

      fetchArticles(newPageSize);
    }
  }, [viewportWidth, pageSize]);

  return (
    <div>
      <div>
        <h2>베스트 게시글</h2>
      </div>

      <div>
        {articles.map((article) => (
          <BestArticleCard
            key={`best-article-${article.id}`}
            article={article}
          />
        ))}
      </div>
    </div>
  );
};

export default BestArticle;
