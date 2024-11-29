'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getBoardsDetail, ArticleDetail } from '../../../hooks/api';

const ArticleDetailPage = () => {
  const { boardsId } = useParams(); // URL에서 boardId 가져오기
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (boardsId) {
          const data = await getBoardsDetail(Number(boardsId)); // API 호출
          setArticle(data);
        }
      } catch (err) {
        setError('게시글을 불러오는 중 문제가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [boardsId]);

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{article?.title}</h1>
      <p>작성자: {article?.writer.nickname}</p>
      <p>등록일: {article?.createdAt}</p>
      <p>좋아요 수: {article?.likeCount}</p>
      <p>내용: {article?.content}</p>
      <p>댓글달기</p>
      <input placeholder="댓글을 입력해주세요" />
      <button>등록</button>

      {/* <p>수정일: {article?.updatedAt}</p> */}
    </div>
  );
};

export default ArticleDetailPage;
