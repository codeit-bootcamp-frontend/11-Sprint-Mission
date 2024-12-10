'use client';

// react, next
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

// 함수, 타입, 컨텍스트
import { getArticle, getComment, postComment } from '@/api';
import useAsync from '@/hooks/useAsync';
import { Article } from '@/types/article';
import { Comments, Comment } from '@/types/comment';
import { useAuth } from '@/context/AuthContext';

// 컴포넌트
import ArticleDetail from '@/components/board/[id]/ArticleDetail';
import CommentForm from '@/components/board/[id]/CommentForm';
import Loading from '@/board/loading';
import Error from '@/board/error';
import ArticleComment from '@/components/board/[id]/ArticleComment';
import EmptyComment from '@/components/EmptyComment';
import BackToListButton from '@/components/BackToListButton';

export default function Page() {
  const { id } = useParams() as { id: string };
  const [article, setArticle] = useState<Article | null>(null);
  const [comment, setComment] = useState<Comment[] | null>(null);

  const [submitComment, setSubmitComment] = useState<string>('');

  const { user } = useAuth();

  const router = useRouter();

  // 필요한 API 호출
  const {
    error: articleError,
    isLoading: articleIsLoading,
    wrappedFunction: articleWrappedFunction,
  } = useAsync(getArticle);

  const {
    error: commentsError,
    isLoading: commentsIsLoading,
    wrappedFunction: commentsWrappedFunction,
  } = useAsync(getComment);

  const {
    error: postCommentError,
    isLoading: postCommentIsLoading,
    wrappedFunction: postCommentWrappedFunction,
  } = useAsync(postComment);

  // 게시글 가져오는 함수
  const fetchItem = useCallback(async () => {
    setArticle((await articleWrappedFunction(id)) as Article);
  }, [id, articleWrappedFunction]);

  // 댓글 가져오는 함수 (개수가 많지 않을 것이라 가정, 사용자 경험을 위해 limit 5000으로 설정)
  const fetchComment = useCallback(async () => {
    const query = `limit=5000&cursor=0`;
    const result = (await commentsWrappedFunction({ id, query })) as Comments;
    if (result.list) setComment(result.list);
  }, [id, commentsWrappedFunction]);

  // 댓글 작성 시 post 후 가져오는 함수
  const fetchPostComment = useCallback(async () => {
    if (submitComment) {
      if (!user) return router.push('/login');

      await postCommentWrappedFunction({
        id,
        content: submitComment,
      } as {
        id: string;
        content: string;
      });

      fetchComment();
    }
  }, [submitComment, id, postCommentWrappedFunction, fetchComment, user]);

  // submitComment 값이 바뀔 때마다 댓글 post 후 가져오는 함수 실행 (댓글 등록 시 submitComment 업데이트)
  useEffect(() => {
    fetchPostComment();
  }, [submitComment, fetchPostComment]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchItem();
    fetchComment();
  }, [fetchItem, fetchComment]);

  // 로딩, 에러 처리
  if (articleIsLoading || commentsIsLoading || postCommentIsLoading) {
    return <Loading />;
  }

  if (articleError || commentsError || postCommentError) {
    const error = (articleError || commentsError || postCommentError) as string;
    return <Error error={error} />;
  }

  return (
    <>
      <div className="mt-10 mb-24 container">
        {article && <ArticleDetail article={article} />}
        <CommentForm setContent={setSubmitComment} />
        {comment && comment.length > 0 ? (
          comment.map((comm) => {
            return (
              <div key={comm.id}>
                <ArticleComment comm={comm} />
              </div>
            );
          })
        ) : (
          <EmptyComment />
        )}
        <BackToListButton />
      </div>
    </>
  );
}
