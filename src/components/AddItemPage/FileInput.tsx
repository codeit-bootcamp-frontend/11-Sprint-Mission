import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../../common/DeleteButton";
import { useMutation } from "@tanstack/react-query";
import { editProduct, newProductData, uploadImage } from "../../api/api";
import "./FileInput.css";
import { postProduct } from "../../api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface InitialValues {
  name: string;
  price: string;
  description: string;
}

const INITIAL_VALUES = {
  name: "",
  price: "",
  description: "",
};

const FileInput = ({ initialValues = INITIAL_VALUES }) => {
  // 이미지와 태그 상태를 별도로 관리
  const [preview, setPreview] = useState<string | null | undefined>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [values, setValues] = useState<InitialValues>(initialValues);
  const [imgError, setImgError] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const productDetail = useSelector((state: RootState) => state.productInfo);
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      // 수정 모드: productDetail을 이용하여 초기값 설정
      setValues({
        name: productDetail.name,
        price: String(productDetail.price),
        description: productDetail.description,
      });
      setTags(productDetail.tags);
      setPreview((productDetail.images as string[])[0] || null);
    } else {
      // 등록 모드: INITIAL_VALUES로 초기화
      setValues(INITIAL_VALUES);
      setTags([]);
      setPreview(null);
    }
  }, [productId, productDetail]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const mutation = useMutation({
    mutationFn: async (newProduct: newProductData) => {
      if (productId) {
        // 상품 수정 모드
        return editProduct(newProduct, productId); // 상품 수정 API 호출 함수
      } else {
        // 상품 등록 모드
        return postProduct(newProduct); // 상품 등록 API 호출 함수
      }
    },
    onSuccess: (data) => {
      alert("요청하신 작업이 완료되었습니다.");
      setValues(INITIAL_VALUES);
      setTags([]);
      setPreview(null);
      setImageFile(null);
      navigate(`/items/${data.id}`);
    },
    onError: () => {
      alert("요청하신 작업에 실패했습니다. 다시 시도해주세요");
    },
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("모든 입력창을 올바르게 입력해주세요");
      return;
    }
    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    } else if (!preview) {
      imageUrl = null;
    }

    const newProduct: newProductData = {
      name: values.name,
      price: Number(values.price),
      description: values.description,
      tags: tags,
      images: imageUrl ? [imageUrl] : [],
    };

    mutation.mutate(newProduct);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.files?.[0];
    if (preview) {
      setImgError("*이미지 등록은 최대 1개까지 가능합니다.");
      return;
    }
    if (nextValue) {
      setImageFile(nextValue);
      const imgURL = URL.createObjectURL(nextValue);
      setPreview(imgURL);
    } else {
      setImageFile(null);
      setPreview(null);
    }
  };

  const handleRemovePreview = () => {
    setPreview(null);
    setImgError("");
    setImageFile(null);
  };

  const handleTagChange = (e: KeyboardEvent<HTMLInputElement>) => {
    const newTag = (e.target as HTMLInputElement).value.trim();
    if (e.key === "Enter" && newTag !== "") {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, newTag]);
      (e.target as HTMLInputElement).value = "";
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleValueChange =
    (name: keyof InitialValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: e.target.value,
      }));
    };

  const isFormValid = () =>
    values.name && values.description && values.price && tags.length;

  return (
    <div className="fileInput-box">
      <section className="register-box">
        <p className="register-box-header">
          {productId ? `상품 수정하기` : `상품 등록하기`}
        </p>
        <button
          className="register-box-button"
          disabled={!isFormValid()}
          onClick={handleSubmit}
        >
          {productId ? `수정` : `등록`}
        </button>
      </section>
      <section className="image-register-box">
        <p className="image-register-box-header small-header">상품 이미지</p>
        <div className="image-box">
          <div>
            <div className="image-upload-button">
              <label htmlFor="image-upload">
                <p className="upload-button-plus">+</p>
                <p className="upload-button-text">이미지등록</p>
              </label>
            </div>
            <input
              type="file"
              id="image-upload"
              name="images"
              onChange={handleImageChange}
            />
          </div>
          {preview && (
            <div className="image-preview">
              <img
                src={preview}
                alt="이미지 미리보기"
                className="preview-image"
              />
              <DeleteButton
                altText="프리뷰 삭제 버튼"
                onClick={handleRemovePreview}
                className="preview-delete"
              />
            </div>
          )}
        </div>
        {imgError && <p className="img-error">{imgError}</p>}
      </section>
      <section className="name-input-box in-box">
        <p className="small-header">상품명</p>
        <input
          type="text"
          className="name-input input"
          placeholder="상품명을 입력해주세요"
          value={values.name}
          onChange={handleValueChange("name")}
        />
      </section>
      <section className="product-content-box in-box">
        <p className="small-header">상품 소개</p>
        <textarea
          value={values.description}
          className="content-input input"
          placeholder="상품소개를 입력해주세요"
          onChange={handleValueChange("description")}
        />
      </section>
      <section className="in-box">
        <p className="small-header">판매가격</p>
        <input
          type="number"
          value={values.price}
          className="input"
          placeholder="판매가격을 입력해주세요"
          onChange={handleValueChange("price")}
        />
      </section>
      <section className="in-box tags-box">
        <p className="small-header">태그</p>
        <input
          type="text"
          className="input"
          placeholder="태그를 입력해주세요"
          onKeyDown={handleTagChange}
        />
        <div className="tag-container">
          {tags.map((tag, index) => (
            <div key={index} className="tag-box">
              <div className="tag-name">#{tag}</div>
              <DeleteButton
                altText="태그 삭제 버튼"
                onClick={() => handleRemoveTag(index)}
                className="tag-delete"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FileInput;
