import styles from "@/styles/addboard.module.css";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

const DEFAULT_VALUES: {
  title: string;
  content: string;
  image: any;
} = {
  title: "",
  content: "",
  image: undefined,
};

export default function AddBoard() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [valid, setValid] = useState(false);

  const handleChangeValue = (name: string, value: any) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!(event.target instanceof HTMLElement)) return;
    const { name, value } = event.target;
    handleChangeValue(name, value);
  };

  return (
    <form>
      <header className={styles.header}>
        <h2 className={styles.headerTitle}>게시글 쓰기</h2>
        <button type="submit" className={styles.submitButton} disabled={!valid}>
          등록
        </button>
      </header>
      <fieldset className={styles.fieldTitle}>
        <label className={styles.label} htmlFor="title">
          *제목
        </label>
        <input
          className={styles.inputTitle}
          id="title"
          name="title"
          type="text"
          placeholder="제목을 입력하세요"
          onChange={handleChangeInput}
          required
        />
      </fieldset>
      <fieldset className={styles.fieldContent}>
        <label className={styles.label} htmlFor="content">
          *내용
        </label>
        <textarea
          className={styles.inputContent}
          id="content"
          name="content"
          placeholder="내용을 입력하세요"
          onChange={handleChangeInput}
          required
        />
      </fieldset>
      <fieldset className={styles.fieldImage}>
        <span className={styles.label}>이미지</span>
        <div className={styles.inputImageList}>
          <label className={styles.inputImageButton} htmlFor="image">
            <div className={styles.inputImageIcon}>
              <Image fill src="/images/ic_plus.svg" alt="이미지 등록" />
            </div>
            <span>이미지 등록</span>
          </label>
        </div>
        <input
          className={styles.inputImage}
          id="image"
          name="image"
          type="file"
          required
        />
      </fieldset>
    </form>
  );
}
