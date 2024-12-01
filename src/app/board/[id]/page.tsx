'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { getArticle, getComment, postComment, postRefreshToken } from '@/api';
import useAsync from '@/hooks/useAsync';
import { Article } from '@/types/article';
import { Comments, Comment } from '@/types/comment';
import { RefreshToken } from '@/types/sign';

import ArticleDetail from '@/components/board/[id]/ArticleDetail';
import CommentForm from '@/components/CommentForm';
import Loading from '@/board/loading';
import Error from '@/board/error';
import ArticleComment from '@/components/board/[id]/ArticleComment';

export default function Page() {
  const { id } = useParams() as { id: string };
  const [article, setArticle] = useState<Article | null>(null);
  const [comment, setComment] = useState<Comment[] | null>(null);

  const [content, setContent] = useState<string>('');

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const fetchItem = async () => {
    setArticle((await articleWrappedFunction(id)) as Article);
  };

  const fetchComment = async () => {
    const query = `limit=5000&cursor=0`;
    const result = (await commentsWrappedFunction({ id, query })) as Comments;
    if (result.list) setComment(result.list);
  };

  const fetchPostComment = async () => {
    if (content) {
      await postCommentWrappedFunction({ id, content, accessToken } as {
        id: string;
        content: string;
        accessToken: string;
      });

      fetchComment();
    }
  };

  useEffect(() => {
    fetchPostComment();
  }, [content]);

  useEffect(() => {
    fetchItem();
    fetchComment();
  }, []);

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

  if (
    articleIsLoading ||
    commentsIsLoading ||
    postCommentIsLoading ||
    refreshTokenIsLoading ||
    isLoading
  ) {
    return <Loading />;
  }

  if (articleError) {
    return <Error error={articleError} />;
  }

  if (commentsError) {
    return <Error error={commentsError} />;
  }

  if (postCommentError) {
    return <Error error={postCommentError} />;
  }

  if (refreshTokenError) {
    return <Error error={refreshTokenError} />;
  }

  if (!accessToken && !refreshToken) {
    return <Error error="로그인 혹은 재로그인 후 이용해주세요." />;
  }

  return (
    <>
      <div className="mt-10 mb-24 container">
        {article && <ArticleDetail article={article} />}
        <CommentForm setContent={setContent} />
        {comment && comment.length > 0 ? (
          comment.map((comm) => {
            return (
              <div key={comm.id}>
                <ArticleComment comm={comm} />
              </div>
            );
          })
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className="relative w-[140px] h-[140px]">
              <Image
                fill
                src="/images/noComment.png"
                alt="댓글 없음"
                sizes="(max-width: 640px) 140px 140px"
              />
            </div>
            <span className="text-center text-gray-400 mt-4">
              아직 댓글이 없어요, <br />
              지금 댓글을 달아보세요!
            </span>
          </div>
        )}
        <div className="flex justify-center items-center mt-12">
          <Link href="/board">
            <button className="w-[240px] h-12 rounded-full bg-blue text-white text-lg flex justify-center items-center gap-2">
              목록으로 돌아가기
              <div className="relative w-6 h-6">
                <Image
                  fill
                  src="/images/back.png"
                  alt="돌아가기"
                  sizes="(max-width: 640px) 24px, 24px"
                />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
