import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Next.js의 useRouter를 사용해 페이지 이동 처리
import SmallButton from '@/components/common/SmallButton';
import FileInput from '@/components/FileInput';
import axios from '@/pages/api/api';

export default function AddBoard() {
  const [values, setValues] = useState({
    title: '',
    content: '',
    image: 'https://example.com/...',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter(); // useRouter 사용

  const handleChange = (name, value) => {
    setValues(preValues => ({ ...preValues, [name]: value }));
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    };

    try {
      const response = await axios.post('/articles', values, config);
      console.log('응답:', response.data);

      // 등록 성공 시 상세 페이지로 이동
      const createdArticleId = response.data.id; // 서버에서 반환한 게시글 ID
      router.push(`/board/${createdArticleId}`);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    setIsFormValid(values.title.trim() !== '' && values.content.trim() !== '');
  }, [values.title, values.content]);

  return (
    <form onSubmit={handleSubmit} className="registerForm">
      <main className="formBody">
        <aside className="formTop">
          <h2 className="formTheme">게시글 쓰기</h2>
          <SmallButton type="submit" disabled={!isFormValid}>
            등록
          </SmallButton>
        </aside>
        <div className="formBody">
          <section className="formSection">
            <h3 className="sectionTheme">*제목</h3>
            <input name="title" value={values.title} onChange={handleInputChange} placeholder="제목을 입력해주세요" className="add-item-input" />
          </section>
          <section className="formSection">
            <h3 className="sectionTheme">*내용</h3>
            <textarea
              name="content"
              value={values.content}
              onChange={handleInputChange}
              placeholder="상품 소개를 입력해주세요"
              className="addItemContent"
            />
          </section>
          <section className="formSection">
            <h3 className="sectionTheme">이미지</h3>
            <FileInput name="image" value={values.imgFile} onChange={handleChange} />
          </section>
        </div>
      </main>
    </form>
  );
}
