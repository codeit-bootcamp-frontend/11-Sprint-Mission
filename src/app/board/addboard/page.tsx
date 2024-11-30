'use client';

// react, next
import { useState, useEffect } from 'react';

// 함수, 타입
import { postArticle, postRefreshToken, postSignIn } from '@/api';
import useAsync from '@/hooks/useAsync';
import { BoardForm } from '@/types/boardForm';

// 컴포넌트
import FileUploadInput from '@/components/board/addboard/FileUploadInput';
import Loading from '@/board/loading';
import Error from '@/board/error';

export default function Page() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [id, setId] = useState<number | null>(null);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const {
    error: articleError,
    isLoading: articleIsLoading,
    wrappedFunction: articleWrappedFunction,
  } = useAsync(postArticle);
  const {
    error: refreshTokenError,
    isLoading: refreshTokenIsLoading,
    wrappedFunction: refreshTokenWrappedFunction,
  } = useAsync(postRefreshToken);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accessToken && refreshToken) {
      const tokenResult = await refreshTokenWrappedFunction(refreshToken);
      if (tokenResult) {
        setAccessToken(tokenResult.accessToken);
        handleSubmit(e);
      }
    } else if (accessToken && refreshToken) {
      const boardForm: BoardForm = {
        title: title,
        content: content,
        image:
          'https://mblogthumb-phinf.pstatic.net/20161008_259/sasa9508_1475929220574OA2NI_JPEG/3.jpg?type=w420',
      };

      const articleResult = await articleWrappedFunction({
        boardForm,
        accessToken,
      });
      if (articleResult) {
        setId(articleResult?.id);
      }
      setTitle('');
      setContent('');
    }
  };

  const getTestToken = async () => {
    const result = await postSignIn({
      email: '123@123.com',
      password: '123123123',
    });

    if (result) {
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);
      setAccessToken(result.accessToken);
      setRefreshToken(result.refreshToken);
    }
  };

  useEffect(() => {
    const localAccessToken = localStorage.getItem('accessToken');
    const localRefreshToken = localStorage.getItem('refreshToken');

    setAccessToken(localAccessToken);
    setRefreshToken(localRefreshToken);
  }, []);

  // isLoading, error 처리
  if (!accessToken && !refreshToken) {
    return <Error error="로그인 혹은 재로그인 후 이용해주세요." />;
  }

  if (articleIsLoading || refreshTokenIsLoading) {
    return <Loading />;
  }

  if (articleError) {
    return <Error error={articleError} />;
  }

  if (refreshTokenError) {
    return <Error error={refreshTokenError} />;
  }

  return (
    <>
      <div className="mt-10 mb-24 container">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center justify-between">
              <h2 className="h2 mb-6">게시글 쓰기</h2>
              <button
                className="bg-blue w-[140px] h-[42px] text-white rounded-lg font-medium flex items-center justify-center"
                onClick={getTestToken}
              >
                토큰 임시 발급
              </button>
              <button
                type="submit"
                disabled={!title.trim() && !content.trim()}
                className="bg-blue w-[74px] h-[42px] text-white rounded-lg font-medium flex items-center justify-center disabled:bg-gray-400"
              >
                등록
              </button>
            </div>
            <label htmlFor="title" className="h3">
              *제목
            </label>
            <input
              id="title"
              type="text"
              className="input h-[56px] mb-6 mt-3"
              placeholder="제목을 입력해주세요"
              onChange={handleTitleChange}
            />
            <label htmlFor="content" className="h3">
              *내용
            </label>
            <textarea
              id="content"
              className="input h-[282px] mb-6 mt-3 resize-none"
              placeholder="내용을 입력해주세요"
              onChange={handleContentChange}
            />
            <label className="h3">이미지</label>
            <FileUploadInput />
          </form>
        </div>
      </div>
    </>
  );
}
