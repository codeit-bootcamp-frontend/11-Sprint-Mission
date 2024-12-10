'use client';

// react, next
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 함수, 타입, 컨텍스트
import { postArticle } from '@/api';
import useAsync from '@/hooks/useAsync';
import { BoardForm } from '@/types/boardForm';
import { Article } from '@/types/article';
import { useAuth } from '@/context/AuthContext';

// 컴포넌트
import FileUploadInput from '@/components/board/addboard/FileUploadInput';
import Loading from '@/board/loading';
import Error from '@/board/error';

export default function Page() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

  const { user } = useAuth();

  const router = useRouter();

  // 필요한 API 호출
  const {
    error: articleError,
    isLoading: articleIsLoading,
    wrappedFunction: articleWrappedFunction,
  } = useAsync(postArticle);

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

    if (image) {
      boardForm.image =
        'https://mblogthumb-phinf.pstatic.net/20161008_259/sasa9508_1475929220574OA2NI_JPEG/3.jpg?type=w420';
    }

    const articleResult = (await articleWrappedFunction({
      boardForm,
    })) as Article;

    router.push(`/board/${articleResult.id}`);
  };

  // 로딩, 에러 처리
  if (articleIsLoading) {
    return <Loading />;
  }

  if (articleError) {
    const error = articleError as string;
    return <Error error={error} />;
  }

  if (!user) {
    return <Error error="로그인 후 이용해주세요." />;
  }

  return (
    <>
      <div className="mt-10 mb-24 container">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center justify-between">
              <h2 className="h2 mb-6">게시글 쓰기</h2>
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
