import { useState, useEffect } from 'react';
import SmallButton from '@/components/common/SmallButton';
import FileInput from '@/components/FileInput';

export default function AddBoard() {
  const [values, setValues] = useState({
    title: '',
    content: '',
    imgFile: null,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (name, value) => {
    setValues(preValues => ({ ...preValues, [name]: value }));
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(values);
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
            <FileInput name="imgFile" value={values.imgFile} onChange={handleChange} />
          </section>
        </div>
      </main>
    </form>
  );
}
