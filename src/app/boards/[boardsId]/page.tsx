'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  getBoardsDetail,
  ArticleDetail,
  getBoardsComments,
  CommentResponse,
} from '../../../hooks/api';

const ArticleDetailPage = () => {
  const { boardsId } = useParams();
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [comments, setComments] = useState<CommentResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticleAndComments = async () => {
      try {
        setLoading(true);

        if (boardsId) {
          const articleData = await getBoardsDetail(Number(boardsId));
          setArticle(articleData);

          const commentsData = await getBoardsComments(Number(boardsId));
          setComments(commentsData);
        } else {
          console.error('boardsId is undefined');
        }
      } catch (err) {
        setError('데이터를 불러오는 중 문제가 발생했습니다.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleAndComments();
  }, [boardsId]);

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{article?.title}</h1>
      <p>작성자: {article?.writer.nickname}</p>
      <p>내용: {article?.content}</p>

      <h2>댓글</h2>
      <ul>
        {comments?.comments?.length ? (
          comments.comments.map((comment) => (
            <li key={comment.id}>
              <p>
                <strong>{comment.writer.nickname}</strong>
              </p>
              <p>{comment.content}</p>
              <p>{comment.createdAt}</p>
            </li>
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default ArticleDetailPage;
