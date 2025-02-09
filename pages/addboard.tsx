import { ChangeEvent, useEffect, useState } from 'react';
import styles from '@styles/AddBoard.module.css';
import FileInput from '@components/FileInput';
import axiosInstance from '@/lib/axiosInstance';

interface BoardCreateFormProps {
  initialValues?: {
    title: string;
    content: string;
    imgFile: File | null;
  };
  initialPreview: string | null;
}

const INITIAL_VALUES = {
  title: '',
  content: '',
  imgFile: null,
};

export default function AddBoardPage({
  initialValues = INITIAL_VALUES,
  initialPreview,
}: BoardCreateFormProps) {
  const [values, setValues] = useState(initialValues);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (
    name: string,
    value: string | string[] | File | null,
  ) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => handleChange(e.target.name, e.target.value);

  useEffect(() => {
    const { title, content } = values;
    if (title && content) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [values]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, content } = values;
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    const data = {
      title,
      content,
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png',
    };

    try {
      const response = await axiosInstance.post('articles', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      alert('게시글이 등록되었습니다.');
    } catch (error) {
      console.error('게시글 등록 실패:', error);
      alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <div className={styles['container']}>
      <form onSubmit={handleSubmit}>
        <div className={styles['container-title']}>
          게시글 쓰기
          <button
            className={`${styles.Registerbtn} ${
              isFormValid ? styles.active : ''
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            등록
          </button>
        </div>
        <div className={styles['container-body']}>
          <label
            className={`${styles['section-title']} ${styles['ArticleTitle']}`}
          >
            *제목
            <input
              name="title"
              type="text"
              value={values.title}
              placeholder="제목을 입력해주세요."
              onChange={handleInputChange}
            />
          </label>
          <label
            className={`${styles['section-title']} ${styles['ArticleContent']}`}
          >
            *내용
            <textarea
              name="content"
              value={values.content}
              placeholder="내용을 입력해주세요."
              onChange={handleInputChange}
            />
          </label>
          <label
            className={`${styles['section-title']} ${styles['ArticleImage']}`}
          >
            이미지
            <FileInput
              name="imgFile"
              value={values.imgFile}
              initialPreview={initialPreview}
              onChange={handleChange}
            />
          </label>
        </div>
      </form>
    </div>
  );
}
