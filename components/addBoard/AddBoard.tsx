import React, { useState } from "react";
import styles from "./AddBoard.module.css";
import Image from "next/image";
import { createPost, uploadImage } from "@/pages/api/posts";
import { useRouter } from "next/router";

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
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();

  const handelValueChange =
    (title: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue((prevValues) => ({
        ...prevValues,
        [title]: e.target.value,
      }));
    };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.files?.[0];
    if (nextValue) {
      setImage(nextValue);
      const imgURL = URL.createObjectURL(nextValue);
      setPreview(imgURL);
    }
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

      alert("게시글이 성공적으로 등록되었습니다.");
      router.push(`/board/${createdPost.id}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("알 수 없는 오류가 발생했어요");
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
          <div className={styles.photo}>
            <div className={styles.box}>
              <label htmlFor="image-upload" className={styles.label}>
                <p className={styles.plus}>+</p>
                <p className={styles.upload}>이미지등록</p>
              </label>
            </div>
            <input
              type="file"
              id="image-upload"
              name="images"
              className={styles.none}
              onChange={handleImageChange}
            />
            {preview && (
              <div className={styles.preview}>
                <Image
                  className={styles.image}
                  fill
                  src={preview}
                  alt="상품 이미지 프리뷰"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddBoard;
