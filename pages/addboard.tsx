import { useState } from 'react';
//
import styles from '@/styles/Boards.module.css';
import IconPlus from '@/public/images/common/ico-plus.svg';
import IconDelete from '@/public/images/common/ico-delete.svg';

type FormValuesType = {
  title: string;
  content: string;
  image: File | null;
};

const INITIAL_VALUES: FormValuesType = {
  title: '',
  content: '',
  image: null,
};

export default function AddBoard() {
  const [values, setValues] = useState(INITIAL_VALUES);

  const disabled = !values.title.trim() || !values.content.trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      setValues((prev) => ({
        ...prev,
        [name]: fileInput.files?.[0] || null,
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDeleteImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setValues((prev) => ({
      ...prev,
      image: null,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <form className={styles.section} onSubmit={handleSubmit}>
        <header className="flex items-center justify-between">
          <h1 className={styles.sectionTitle}>게시글 작성</h1>
          <button className="btn" type="submit" disabled={disabled}>
            등록
          </button>
        </header>

        <div className="flex flex-col gap-3">
          <label className="label" htmlFor="title">
            *제목
          </label>
          <input
            className="input"
            type="text"
            name="title"
            id="title"
            placeholder="제목을 입력해 주세요"
            required
            value={values.title}
            onChange={handleChange}
          />
          <label className="label" htmlFor="content">
            *내용
          </label>
          <textarea
            className="input"
            name="content"
            id="content"
            placeholder="내용을 입력해 주세요"
            rows={10}
            required
            value={values.content}
            onChange={handleChange}
          />
          <label className="label" htmlFor="image">
            이미지
          </label>
          <label className="preview">
            <input
              className="input-image"
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleChange}
            />
            {values.image ? (
              <>
                <img
                  className="preview-image"
                  src={URL.createObjectURL(values.image)}
                  alt="이미지 미리보기"
                />
                <button type="button" className="btn-delete" onClick={handleDeleteImage}>
                  <IconDelete />
                </button>
              </>
            ) : (
              <>
                <IconPlus />
                <span>이미지 등록</span>
              </>
            )}
          </label>
        </div>
      </form>
    </div>
  );
}
