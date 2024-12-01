'use client';

// react, next
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// 함수, 타입
import { getArticle, getComment, postComment, postRefreshToken } from '@/api';
import useAsync from '@/hooks/useAsync';
import { Article } from '@/types/article';
import { Comments, Comment } from '@/types/comment';
import { RefreshToken } from '@/types/sign';

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

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const {
    error: refreshTokenError,
    isLoading: refreshTokenIsLoading,
    wrappedFunction: refreshTokenWrappedFunction,
  } = useAsync(postRefreshToken);

  // 게시글 가져오는 함수
  const fetchItem = async () => {
    setArticle((await articleWrappedFunction(id)) as Article);
  };

  // 댓글 가져오는 함수 (개수가 많지 않을 것이라 가정, 사용자 경험을 위해 limit 5000으로 설정)
  const fetchComment = async () => {
    const query = `limit=5000&cursor=0`;
    const result = (await commentsWrappedFunction({ id, query })) as Comments;
    if (result.list) setComment(result.list);
  };

  // 댓글 작성 시 post 후 가져오는 함수
  const fetchPostComment = async () => {
    if (submitComment) {
      await postCommentWrappedFunction({
        id,
        content: submitComment,
        accessToken,
      } as {
        id: string;
        content: string;
        accessToken: string;
      });

      fetchComment();
    }
  };

  // submitComment 값이 바뀔 때마다 댓글 post 후 가져오는 함수 실행 (댓글 등록 시 submitComment 업데이트)
  useEffect(() => {
    fetchPostComment();
  }, [submitComment]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchItem();
    fetchComment();
  }, []);

  // 로컬 스토리지에 저장된 토큰 가져오기, refreshToken이 있을 경우 accessToken 갱신
  useEffect(() => {
    const localAccessToken = localStorage.getItem('accessToken');
    const localRefreshToken = localStorage.getItem('refreshToken');

    setAccessToken(localAccessToken);
    setRefreshToken(localRefreshToken);

    if (localRefreshToken) {
      const refreshToken = async () => {
        const tokenResult = (await refreshTokenWrappedFunction({
          refreshToken: localRefreshToken,
        })) as RefreshToken;

        localStorage.setItem('accessToken', tokenResult.accessToken);
        setAccessToken(tokenResult.accessToken);
      };

      refreshToken();
    }

    setIsLoading(false);
  }, []);

  // 로딩, 에러 처리

  if (
    articleIsLoading ||
    commentsIsLoading ||
    postCommentIsLoading ||
    refreshTokenIsLoading ||
    isLoading
  ) {
    return <Loading />;
  }

  if (articleError || commentsError || postCommentError || refreshTokenError) {
    const error = (articleError ||
      commentsError ||
      postCommentError ||
      refreshTokenError) as string;
    return <Error error={error} />;
  }

  if (!accessToken && !refreshToken) {
    return <Error error="로그인 혹은 재로그인 후 이용해주세요." />;
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
