import React, { useState } from "react";
import styles from "./AddBoard.module.css";
import { createPost, uploadImage } from "../../api/posts";
import ImageUploader from "./ImageUploader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface BoardValue {
  title: string;
  content: string;
}

const INITIAL_VALUES: BoardValue = {
  title: "",
  content: "",
};

const AddBoard = ({ initailValues = INITIAL_VALUES }) => {
  const [value, setValue] = useState<BoardValue>(initailValues);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handelValueChange =
    (title: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue((prevValues) => ({
        ...prevValues,
        [title]: e.target.value,
      }));
    };

  const isFormValid = () => value.title && value.content;

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setLoading(true);
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
      }

      const postData = {
        title: value.title,
        content: value.content,
        image: imageUrl,
      };
      const createdPost = await createPost(postData);
      toast.success("게시글이 성공적으로 등록되었습니다.");

      navigate(`/board/${createdPost.id}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("알 수 없는 오류가 발생했어요");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <p className={styles.topic}>게시글 쓰기</p>
        <button
          className={styles.button}
          disabled={!isFormValid()}
          onClick={handleSubmit}
        >
          등록
        </button>
      </section>
      <section className={styles.body}>
        <div>
          <p className={styles.title}>*제목</p>
          <input
            type="text"
            value={value.title}
            className={`${styles.input} ${styles.name}`}
            placeholder="제목을 입력해주세요"
            onChange={handelValueChange("title")}
          ></input>
        </div>
        <div>
          <p className={styles.title}>*내용</p>
          <textarea
            value={value.content}
            className={`${styles.input} ${styles.content}`}
            placeholder="내용을 입력해주세요"
            onChange={handelValueChange("content")}
          ></textarea>
        </div>
        <div>
          <p className={styles.title}>이미지</p>
          <ImageUploader onImageChange={setImage} />
        </div>
      </section>
    </div>
  );
};

export default AddBoard;
