'use client';

// react, next
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 함수, 타입
import { postArticle, postRefreshToken, postSignIn } from '@/api';
import useAsync from '@/hooks/useAsync';
import { BoardForm } from '@/types/boardForm';
import { Article } from '@/types/article';

// 컴포넌트
import FileUploadInput from '@/components/board/addboard/FileUploadInput';
import Loading from '@/board/loading';
import Error from '@/board/error';
import { RefreshToken } from '@/types/sign';

export default function Page() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const router = useRouter();

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

  // 게시글 등록 (이미지는 blob URL이므로 테스트용 이미지로 대체)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const boardForm: BoardForm = {
      title: title,
      content: content,
    };

    image
      ? (boardForm.image =
          'https://mblogthumb-phinf.pstatic.net/20161008_259/sasa9508_1475929220574OA2NI_JPEG/3.jpg?type=w420')
      : null;

    const articleResult = (await articleWrappedFunction({
      boardForm,
      accessToken: accessToken as string,
    })) as Article;

    router.push(`/board/${articleResult.id}`);
  };

  // 테스트용 토큰 발급 버튼 (다음 미션 작업 시 삭제)
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
  if (articleIsLoading || refreshTokenIsLoading || isLoading) {
    return <Loading />;
  }

  if (articleError || refreshTokenError) {
    const error = (articleError || refreshTokenError) as string;
    return <Error error={error} />;
  }

  if (!accessToken && !refreshToken) {
    return <Error error="로그인 혹은 재로그인 후 이용해주세요." />;
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
