import { Article, ArticleSortOption } from "@/types/Types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ArticleItem from "./ArticleItem";
import Search from "@/components/ui/Search";
import Dropdown from "@/components/ui/Dropdown";

interface AllArticlesProps {
  initialArticles: Article[];
}

const AllArticle = ({ initialArticles }: AllArticlesProps) => {
  const [orderBy, setOrderBy] = useState<ArticleSortOption>("recent");
  const [articles, setArticles] = useState(initialArticles);

  const router = useRouter();
  const keyword = (router.query.q as string) || "";

  const handleSort = (sortOption: ArticleSortOption) => {
    setOrderBy(sortOption);
  };

  //
  const handleSearch = (searchKeyword: string) => {
    const query = { ...router.query };
    if (searchKeyword.trim()) {
      query.q = searchKeyword;
    } else {
      delete query.q;
    }
    router.replace({
      pathname: router.pathname,
      query,
    });
  };

  useEffect(() => {
    const fetchArticles = async () => {
      let url = `https://panda-market-api.vercel.app/articles?orderBy=${orderBy}`;
      if (keyword.trim()) {
        url += `&keyword=${encodeURIComponent(keyword)}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.list);
    };

    fetchArticles();
  }, [orderBy, keyword]);

  return (
    <div>
      <div>
        <h2>게시글</h2>
        <button>글쓰기</button>
      </div>

      <div>
        <Search onSearch={handleSearch} />
        <Dropdown
          onSortSelection={handleSort}
          sortOptions={[
            { key: "recent", label: "최신순" },
            { key: "like", label: "인기순" },
          ]}
        />
      </div>

      {articles.length > 0
        ? articles.map((article) => (
            <ArticleItem key={`article-${article.id}`} article={article} />
          ))
        : // 키워드가 입력된 경우에만 결과가 없다는 메시지 표시
          keyword && (
            <div>
              <p>{`'${keyword}'로 검색된 결과가 없어요.`}</p>
            </div>
          )}
    </div>
  );
};

export default AllArticle;
