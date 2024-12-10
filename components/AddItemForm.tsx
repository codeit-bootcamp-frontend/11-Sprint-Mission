import { useState } from "react";
import ImgInput from "@/components/ImageInput";
import resetImg from "@/public/svgs/ic_X.svg";
import { useRouter } from "next/router";
import { AddItemFormProps } from "@/types/commontypes";
import Image from "next/image";
import styles from "@/styles/additem.module.css";

const INITIAL_VALUE = {
  name: "",
  favoriteCount: 0,
  description: "",
  price: 0,
  images: null,
  tags: [],
};

export default function AddItemForm({
  initialValues = INITIAL_VALUE,
  initialPreview,
  onSubmit,
  onSubmitSuccess,
}: AddItemFormProps) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [submittingError, setSubmittingError] = useState<Error | null>(null);
  const [tagInput, setTagInput] = useState("");

  // 유효성 검사
  const isValidForm =
    values.name?.trim() !== "" &&
    values.description?.trim() !== "" &&
    values.price > 0 &&
    values.tags.length > 0;

  const handleChange = (name: string, value: any) => {
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleFileChange = (name: string, file: File | null) => {
    handleChange(name, file);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !values.tags.includes(tagInput.trim())) {
      handleChange("tags", [...values.tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTagAdd();
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    handleChange(
      "tags",
      values.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("favorite", values.favoriteCount.toString());
    formData.append("description", values.description);
    formData.append("price", values.price.toString());

    if (values.images) {
      values.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    formData.append("tags", JSON.stringify(values.tags));

    const result = await onSubmit(formData);
    if (!result) return;

    const { review } = result;
    setValues(INITIAL_VALUE);
    onSubmitSuccess(review);

    router.push("/items");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.add_item_form_total_container}
    >
      <div className={styles.add_item_form_header}>
        <div className={styles.add_item_form_title}>상품 등록하기</div>
        <button
          type="submit"
          className={styles.add_item_submit_button}
          disabled={!isValidForm || !!submittingError}
        >
          등록
        </button>
      </div>
      <div className={styles.add_item_form_container}>
        <div className={styles.add_item_img_container}>
          <div className={styles.add_item_img_title}>상품 이미지</div>
          <ImgInput
            className={styles.add_item_img_preview}
            name="imgFile"
            value={values.images ? values.images[0] : null}
            initialPreview={initialPreview}
            onChange={handleFileChange}
          />
        </div>
        <div className={styles.add_item_name_container}>
          <div className={styles.add_item_name_title}>상품명</div>
          <input
            className={styles.add_item_name_input}
            name="name"
            value={values.name}
            onChange={handleInputChange}
            placeholder="상품명을 입력해주세요"
          />
        </div>
        <div className={styles.add_item_content_container}>
          <div className={styles.add_item_content_title}>상품 소개</div>
          <textarea
            className={styles.add_item_content_textarea}
            name="description"
            value={values.description}
            onChange={handleInputChange}
            placeholder="상품 소개를 입력해주세요"
          />
        </div>
        <div className={styles.add_item_price_container}>
          <div className={styles.add_item_price_title}>판매가격</div>
          <input
            className={styles.add_item_price_input}
            type="number"
            name="price"
            value={values.price}
            onChange={handleInputChange}
            placeholder="판매 가격을 입력해주세요"
          />
        </div>
        <div className={styles.add_item_tags_container}>
          <div className={styles.add_item_tags_title}>태그</div>
          <input
            className={styles.add_item_tag_input}
            type="text"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagKeyDown}
            placeholder="태그를 입력해주세요"
          />
          <div className={styles.add_item_tags_list}>
            {values.tags.map((tag) => (
              <div key={tag} className={styles.add_item_tag}>
                #{tag}
                <button
                  type="button"
                  className={styles.add_item_tag_remove_button}
                  onClick={() => handleTagRemove(tag)}
                >
                  <Image src={resetImg} alt="제거" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
