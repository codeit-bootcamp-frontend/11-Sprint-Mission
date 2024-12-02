import { useState } from "react";
import styles from "@/styles/addboard.module.css";
import ImageInput from "@/components/ImageInput";
import { FormValues } from "@/types/commontypes";

const INITIAL_VALUES: FormValues = {
  title: "",
  content: "",
  image: null,
};

export default function AddBoard() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);

  const isFormValid =
    values.title.trim() !== "" && values.content.trim() !== "";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (name: string, file: File | null) => {
    setValues((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", values);

    setValues(INITIAL_VALUES);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.body}>
        <div className={styles.container_top}>
          <h1 className={styles.title}>게시글 쓰기</h1>
          <button
            type="submit"
            className={`${styles.btn} ${
              isFormValid ? styles.btn_enabled : styles.btn_disabled
            }`}
            disabled={!isFormValid}
          >
            등록
          </button>
        </div>
        <div className={styles.container_bottom}>
          <div>
            <h2 className={styles.article_title}>*제목</h2>
            <textarea
              name="title"
              className={styles.title_input}
              placeholder="제목을 입력해주세요"
              value={values.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <h3 className={styles.content}>*내용</h3>
            <textarea
              name="content"
              className={styles.content_input}
              placeholder="내용을 입력해주세요"
              value={values.content}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <h4 className={styles.image}>이미지</h4>
            <ImageInput
              name="image"
              value={values.image}
              onChange={handleImageChange}
              initialPreview={null}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
