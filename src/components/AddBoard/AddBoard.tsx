import React, { useState, useEffect } from "react";
import styles from "./AddBoard.module.css";
import { createPost, uploadImage } from "../../api/posts";
import ImageUploader from "./ImageUploader";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { editArticle } from "../../api/api";

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
  const articleDetail = useSelector(
    (state: RootState) => state.article.article
  );
  const { articleId } = useParams();

  useEffect(() => {
    if (articleId && articleDetail) {
      // 수정 모드
      setValue({
        title: articleDetail.title,
        content: articleDetail.content,
      });
    } else {
      // 등록 모드
      setValue(INITIAL_VALUES);
    }
  }, [articleId, articleDetail]);

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
      let imageUrl = articleDetail?.image || null;
      if (image) {
        imageUrl = await uploadImage(image);
      }

      const postData = {
        title: value.title,
        content: value.content,
        image: imageUrl,
      };
      if (articleId) {
        // 게시글 수정
        await editArticle(postData, articleId);
        toast.success("게시글이 수정되었습니다.");
        navigate(`/board/${articleId}`);
      } else {
        // 게시글 등록
        const createdPost = await createPost(postData);
        toast.success("게시글이 등록되었습니다.");
        navigate(`/board/${createdPost.id}`);
      }
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
        <p className={styles.topic}>
          {articleId ? `게시글 수정하기` : `게시글 쓰기`}
        </p>
        <button
          className={styles.button}
          disabled={!isFormValid()}
          onClick={handleSubmit}
        >
          {articleId ? `수정` : `등록록`}
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
          <ImageUploader
            onImageChange={setImage}
            initialImage={articleDetail?.image}
          />
        </div>
      </section>
    </div>
  );
};

export default AddBoard;
