import ArticleContent from "@/components/board/ArticleContent";
import { Article } from "@/types/Types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getArticleDetail } from "@/api/api";

const Board = () => {
  const router = useRouter();
  const { id } = router.query;

  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가

  // URL에서 가져온 id 값은 문자열로 되어 있을 수 있기 때문에, 이를 Number()를 사용하여 숫자로 변환
  const articleId = Number(id);

  // 데이터 로딩
  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) return; // If there's no articleId, exit early

      try {
        setLoading(true);
        setError(null);
        const data = await getArticleDetail(articleId); // Make API call
        setArticle(data);
      } catch (err) {
        console.error("오류:", err);
        setError("실패");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  // 로딩 중이나 에러가 발생한 경우
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  // id가 없거나 article 데이터가 로드되지 않았다면 null을 반환
  if (!id || !article) return null;

  return (
    <div>
      <ArticleContent article={article} />

      {/* 댓글 컴포넌트 */}

      <Link href="/board">
        <button className="backButton">목록으로 돌아가기</button>
      </Link>
    </div>
  );
};

export default Board;
