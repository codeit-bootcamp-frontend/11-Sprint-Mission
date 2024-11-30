import styles from "@/styles/addboard.module.css";
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
      <fieldset>
        <label htmlFor="title">*제목</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="제목을 입력하세요"
          onChange={handleChangeInput}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="content">*내용</label>
        <textarea
          id="content"
          name="content"
          placeholder="s내용을 입력하세요"
          onChange={handleChangeInput}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="image">
          <span>이미지 등록</span>
        </label>
        <input id="image" name="image" type="file" required />
      </fieldset>
    </form>
  );
}
