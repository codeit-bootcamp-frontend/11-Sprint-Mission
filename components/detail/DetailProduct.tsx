import { formatPriceToKRW } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";
import ImageProduct from "../items/ImageProduct";
import ProfileIcon from "../Icons/ProfileIcon";
import HeartIcon from "../Icons/HeartIcon";
import DropDownInquiry from "./DropDownInquiry";
import { FormEvent, useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import useModal from "@/hooks/useModal";
import Modal from "@/components/modal/Modal";
import ImgFileInput from "../addItem/ImgFileInput";
import { ProductInputReducer } from "@/reducers/useProductReducer";
import TextInput from "../addItem/TextInput";
import Description from "../addItem/Description";
import PriceInput from "../addItem/PriceInput";
import TagInput from "../addItem/TagInput";
import { updateProduct } from "@/pages/api/productApi";
import queryClient from "@/lib/queryClient";

interface DetailProductProps {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  favoriteCount: number;
  tags: string[];
  ownerId: number;
  ownerNickname: string;
  updatedAt: string;
  isFavorite?: boolean;
  onDelete: (id: string) => void;
}

function DetailProduct({
  id,
  name,
  description,
  images,
  price,
  favoriteCount,
  tags,
  ownerId,
  ownerNickname,
  updatedAt,
  isFavorite,
  onDelete,
}: DetailProductProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false); // 수정 상태를 할당할 state
  const userId = localStorage.getItem("userId");
  const { isOpen, openModal, closeModal } = useModal();
  const [isFormValid, setIsFormValid] = useState(false);
  const [originalData, setOriginalData] = useState({
    images,
    name,
    description,
    price,
    tags,
  });
  const [userInput, dispatch] = useReducer(ProductInputReducer, originalData);

  const {
    images: u_images,
    name: u_name,
    description: u_description,
    price: u_price,
    tags: u_tags,
  } = userInput;

  const handleCloseModal = () => {
    setIsEditing(false);
    closeModal();
    dispatch({ type: "RESET_INPUT", payload: originalData }); // 원래 데이터로 복원
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      const imageChange = u_images[0] !== originalData.images[0];

      const { id: productId } = await updateProduct({
        id: String(id),
        content: userInput,
        imageChange: imageChange,
      });

      setOriginalData(userInput);
      queryClient.invalidateQueries({
        queryKey: ["product", String(productId)],
      });
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
      dispatch({ type: "RESET_INPUT", payload: userInput });
      setIsEditing(false);
      closeModal();
    }
  };

  useEffect(() => {
    const isChanged =
      u_images !== originalData.images ||
      u_name !== originalData.name ||
      u_description !== originalData.description ||
      u_price !== originalData.price ||
      JSON.stringify(u_tags) !== JSON.stringify(originalData.tags);

    const hasRequiredFields =
      u_name.trim() !== "" &&
      u_description.trim() !== "" &&
      u_price > 0 &&
      u_tags.length > 0;

    setIsFormValid(isChanged && hasRequiredFields);
  }, [u_images, u_name, u_description, u_price, u_tags, originalData]);

  return (
    <>
      <div className='product-detail-contents'>
        {!isEditing && String(ownerId) === userId && (
          <DropDownInquiry
            onEdit={() => {
              openModal();
              setIsEditing(true);
            }}
            onDelete={() => {
              onDelete(String(id));
              router.push("/items");
            }}
          />
        )}
        <ImageProduct images={images} name={name} />
        <div className='desc-wrap'>
          <h2 className='detail-name'>{name}</h2>
          <div className='detail-price'>{formatPriceToKRW(price)}</div>
          <div className='detail-description-wrap'>
            <div className='detail-description-title'>상품 소개</div>
            <p className='detail-description'>{description}</p>
          </div>
          <div className='detail-tag-wrap'>
            <div className='detail-tag-title'>상품 태그</div>
            <div className='detail-tags'>
              {tags.map((tag) => (
                <span key={tag} className='detail-tag'>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <div className='detail-footer'>
            <div className='owner-wrap'>
              <div className='owner-icon'>
                <ProfileIcon />
              </div>
              <div className='owner-desc'>
                <div className='owner-name'>{ownerNickname}</div>
                <div className='date-update'>{formatDate(updatedAt)}</div>
              </div>
            </div>
            <button className='btn-favorite'>
              <div>
                <HeartIcon isFavorite={isFavorite} />
              </div>
              <span>{favoriteCount}</span>
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} closeModal={handleCloseModal}>
        <form className='edit-product-form' onSubmit={handleSubmit}>
          <ImgFileInput name='image' images={u_images} dispatch={dispatch}>
            상품 이미지
          </ImgFileInput>
          <TextInput
            name='name'
            value={u_name}
            placeholder='상품명을 입력해주세요'
            dispatch={dispatch}
          >
            상품명
          </TextInput>
          <Description
            name='description'
            value={u_description}
            placeholder='상품 소개를 입력해주세요'
            dispatch={dispatch}
          >
            상품 소개
          </Description>
          <PriceInput name='price' value={u_price} dispatch={dispatch}>
            판매가격
          </PriceInput>
          <TagInput
            name='tags'
            tags={u_tags}
            placeholder='태그를 입력해주세요'
            dispatch={dispatch}
          >
            태그
          </TagInput>
          <div className='button-wrap'>
            <button type='button' onClick={handleCloseModal}>
              취소
            </button>
            <button type='submit' disabled={!isFormValid}>
              수정
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default DetailProduct;
