import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import SmallButton from '@/components/common/SmallButton';
import FileInput from '@/components/FileInput';
import axios from '@/pages/api/api';
import styles from '@/styles/AddBoard.module.css';

export default function AddBoard() {
  const [values, setValues] = useState({
    title: '',
    content: '',
    image: '' || null,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

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
      const createdArticleId = response.data.id;
      router.push(`/board/${createdArticleId}`);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    setIsFormValid(values.title.trim() !== '' && values.content.trim() !== '');
  }, [values.title, values.content]);

  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <div className={styles.formContent}>
        <aside className={styles.formTop}>
          <h2 className={styles.formTheme}>게시글 쓰기</h2>
          <SmallButton type="submit" disabled={!isFormValid}>
            등록
          </SmallButton>
        </aside>
        <div className={styles.formBody}>
          <section className={styles.formSection}>
            <h3 className={styles.sectionTheme}>*제목</h3>
            <input name="title" value={values.title} onChange={handleInputChange} placeholder="제목을 입력해주세요" className={styles.inputTitle} />
          </section>
          <section className={styles.formSection}>
            <h3 className={styles.sectionTheme}>*내용</h3>
            <textarea
              name="content"
              value={values.content}
              onChange={handleInputChange}
              placeholder="내용을 입력해주세요"
              className={styles.inputContent}
            />
          </section>
          <section className={styles.formSection}>
            <h3 className={styles.sectionTheme}>이미지</h3>
            <FileInput name="image" value={values.imgFile} onChange={handleChange} />
          </section>
        </div>
      </div>
    </form>
  );
}
