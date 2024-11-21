'use client';

import AddProductInput from '../../components/additem/AddProductInput';
import AdditemButton from '../../components/additem/AdditemButton';
import React, { useState } from 'react';
import ImageUpload from '../../components/additem/ImageUpload';
import styles from '../../styles/additem/additem.module.css';

// interface ProductTag {
//   id: number;
//   name: string;
// }

function Additem() {
  const [productName, setProductName] = useState<string>('');
  const [productContent, setProductContent] = useState<string>('');
  const [productPrice, setProductPrice] = useState<any>();
  const [productTag, setProductTag] = useState<any>([]);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const isFormValid = () => {
    return (
      productName.trim() !== '' &&
      productContent.trim() !== '' &&
      productPrice !== undefined &&
      productPrice > 0 &&
      productImage !== null
    );
  };

  const handleSubmit = () => {
    const productData = {
      productImage,
      productName,
      productContent,
      productPrice,
      productTags: tags,
    };
    console.log('상품 등록 데이터:', productData);
  };

  const handleImageChange = (name: string, file: File | null) => {
    setProductImage(file);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subHeader}>
          <p className={styles.subTitle}>상품 등록하기</p>
          <AdditemButton onSubmit={handleSubmit} disabled={!isFormValid()} />
        </div>
        <p className={styles.containerImageTitle}>상품 이미지</p>
        <ImageUpload
          name={productImage ? productImage.name : ''}
          value={productImage}
          onChange={handleImageChange}
        />
        <AddProductInput
          productName={productName}
          productContent={productContent}
          productPrice={productPrice}
          productTag={productTag}
          onNameChange={setProductName}
          onContentChange={setProductContent}
          onPriceChange={setProductPrice}
          onTagChange={setProductTag}
          onTagsUpdate={setTags}
        />
      </div>
    </>
  );
}

export default Additem;
