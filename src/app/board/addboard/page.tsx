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
  const [image, setImage] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // 필요한 API 호출
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

  // title, content input 값 있을 때만 등록 버튼 활성화
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 게시글 등록
  // accessToken이 없을 때 refreshToken이 있으면 refreshToken으로 accessToken 재발급 후 다시 시도
  // accessToken, refreshToken 둘 다 있을 때 게시글 등록 (이미지는 blob URL이므로 테스트용 이미지로 대체)
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
      };

      const imageUrl = image
        ? 'https://mblogthumb-phinf.pstatic.net/20161008_259/sasa9508_1475929220574OA2NI_JPEG/3.jpg?type=w420'
        : null;

      if (imageUrl) {
        boardForm.image = imageUrl;
      }

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

  // 테스트용 토큰 발급
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

  // 로컬 스토리지에 저장된 토큰 가져오기
  useEffect(() => {
    const localAccessToken = localStorage.getItem('accessToken');
    const localRefreshToken = localStorage.getItem('refreshToken');

    setAccessToken(localAccessToken);
    setRefreshToken(localRefreshToken);
    setIsLoading(false);
  }, []);

  // isLoading, error 처리
  if (articleIsLoading || refreshTokenIsLoading || isLoading) {
    return <Loading />;
  }

  if (!accessToken && !refreshToken) {
    return <Error error="로그인 혹은 재로그인 후 이용해주세요." />;
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
            <FileUploadInput image={image} setImage={setImage} />
          </form>
        </div>
      </div>
    </>
  );
}
