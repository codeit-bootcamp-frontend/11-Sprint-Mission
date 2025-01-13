import {
  INITIAL_INPUT,
  ProductInputReducer,
} from "@/reducers/useProductReducer";
import { FormEvent, useEffect, useReducer, useState } from "react";
import { postProduct } from "@/pages/api/productApi";
import Header from "@/components/common/Header";
import PrimaryButton from "@/components/common/PrimaryButton";
import ImgFileInput from "@/components/addItem/ImgFileInput";
import TextInput from "@/components/addItem/TextInput";
import Description from "@/components/addItem/Description";
import PriceInput from "@/components/addItem/PriceInput";
import TagInput from "@/components/addItem/TagInput";
import { useRouter } from "next/router";
import queryClient from "@/lib/queryClient";

function AddItem() {
  const router = useRouter();
  const [userInput, dispatch] = useReducer(ProductInputReducer, INITIAL_INPUT);
  const { images, name, description, price, tags } = userInput;
  const [isFormValid, setIsFormValid] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      const { id } = await postProduct({ content: userInput });
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
      router.push(`/items/${id}`);
    }
  };

  useEffect(() => {
    const { name, description, price, tags } = userInput;
    const isValid = name && description && price > 0 && tags.length > 0;
    setIsFormValid(!!isValid);
  }, [userInput]);
  return (
    <>
      <Header />
      <div className='form-wrap'>
        <form onSubmit={handleSubmit}>
          <div className='title-wrap'>
            <h2>상품 등록하기</h2>
            <PrimaryButton type='submit' name='btn-add' disabled={!isFormValid}>
              등록
            </PrimaryButton>
          </div>
          <ImgFileInput name='image' images={images} dispatch={dispatch}>
            상품 이미지
          </ImgFileInput>
          <TextInput
            name='name'
            value={name}
            placeholder='상품명을 입력해주세요'
            dispatch={dispatch}
          >
            상품명
          </TextInput>
          <Description
            name='description'
            value={description}
            placeholder='상품 소개를 입력해주세요'
            dispatch={dispatch}
          >
            상품 소개
          </Description>
          <PriceInput name='price' value={price} dispatch={dispatch}>
            판매가격
          </PriceInput>
          <TagInput
            name='tags'
            tags={tags}
            placeholder='태그를 입력해주세요'
            dispatch={dispatch}
          >
            태그
          </TagInput>
        </form>
      </div>
    </>
  );
}

export default AddItem;
