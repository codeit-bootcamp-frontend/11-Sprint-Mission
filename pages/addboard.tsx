import { postArticle } from "@/api/article.api";
import useAsync from "@/hooks/useAsync";
import renewAccessToken from "@/lib/renewAccessToken";
import styles from "@/styles/addboard.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Valuse {
  title: string;
  content: string;
  image: {
    id: string;
    file: File;
  } | null;
}

interface ImagePreview {
  id: string;
  src: string;
}

const DEFAULT_VALUES: Valuse = {
  title: "",
  content: "",
  image: null,
};

function checkValuesValid(values: Valuse): boolean {
  const { title, content } = values;
  if (title.trim().length < 1) return false;
  if (content.trim().length < 1) return false;
  return true;
}

export default function AddBoard() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [valid, setValid] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const { excute: postArticleAsync, loading, error } = useAsync(postArticle);
  const router = useRouter();

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

  const handleChangeInputImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const image = {
        id: Date.now().toString(),
        file: files[0],
      };
      handleChangeValue("image", image);
    }
  };

  const handleImagePreviewsClear = () => {
    setImagePreviews((prev) => {
      prev.forEach((e) => {
        URL.revokeObjectURL(e.src);
      });
      return [];
    });
  };

  const handleDeleteImage = () => {
    handleChangeValue("image", null);
    handleImagePreviewsClear();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    renewAccessToken();
    const response = await postArticleAsync({
      title: values.title,
      content: values.content,
    });
    if (response) {
      router.push(`/board/${response.id}`);
    } else alert("게시글 생성 실패");
  };

  useEffect(() => {
    renewAccessToken();
  }, []);

  useEffect(() => {
    const image = values.image;
    handleImagePreviewsClear();
    if (image) {
      setImagePreviews([
        {
          id: image.id,
          src: URL.createObjectURL(image.file),
        },
      ]);
    } else;

    setValid(checkValuesValid(values));

    return () => handleImagePreviewsClear();
  }, [values]);

  return (
    <form onSubmit={handleSubmit}>
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
          {imagePreviews[0] && (
            <div className={styles.inputImageItem} onClick={handleDeleteImage}>
              <Image
                className={styles.previewImage}
                fill
                src={imagePreviews[0].src}
                alt="이미지 미리보기"
              />
              <div className={styles.overlay}>
                <div className={styles.inputImageIcon}>
                  <Image fill src="/images/ic_delete.svg" alt="이미지 제거" />
                </div>
                <span>이미지 제거</span>
              </div>
            </div>
          )}
        </div>
        <input
          className={styles.inputImage}
          id="image"
          name="image"
          type="file"
          onChange={handleChangeInputImage}
        />
      </fieldset>
    </form>
  );
}
