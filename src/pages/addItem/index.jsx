import React, { useEffect, useRef, useState } from "react";
import ProductForm from "../../features/productForm/form/ProductForm";

import ProductTags from "../../features/productTag/ProductTags";
import ImageUploader from "../../features/imageUpload/imageUploader";
import SubmitSection from "../../features/productForm/submitSection/SubmitSection";

const AddItem = () => {
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productTag, setProductTag] = useState("");
  const [productTagsArray, setProductTagsArray] = useState([]);
  const [productsArray, setProductsArray] = useState(""); // product 배열 상태

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setSelectedPicture(objectURL);

      // 파일 선택 후 입력 필드를 초기화
      e.target.value = "";

      // 컴포넌트가 언마운트되거나 이미지가 변경될 때 URL 해제
      return () => {
        URL.revokeObjectURL(objectURL); // 메모리 해제
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: productName,
      description: productDescription,
      price: productPrice,
      tag: [...productTagsArray],
      image: selectedPicture,
    };
    setProductsArray(newProduct);

    // 폼 초기화
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductTag("");
    setProductTagsArray([]);
    setSelectedPicture(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (productTag.trim() !== "") {
        setProductTagsArray([...productTagsArray, productTag.trim()]);
        setProductTag("");
      }
    }
  };

  const handleDeleteTag = (indexToDelete) => {
    setProductTagsArray(
      productTagsArray.filter((_, index) => index !== indexToDelete)
    );
  };

  const formButtonBgc = !(
    productName.trim() &&
    productDescription.trim() &&
    productPrice.trim() &&
    productTagsArray.length > 0
  )
    ? "bg-[#9CA3AF]"
    : "bg-blue-500";

  return (
    <div className="w-full flex justify-center">
      <form
        className="w-full p-2 flex flex-col gap-y-2 lg:w-2/3 lg:justify-center"
        onSubmit={handleSubmit}
      >
        <SubmitSection
          isDisabled={!(productName && productDescription && productPrice)}
          formButtonBgc={formButtonBgc}
        />
        <ImageUploader
          selectedPicture={selectedPicture}
          onFileChange={handleFileChange}
        />

        <ProductForm
          name={productName}
          description={productDescription}
          price={productPrice}
          tag={productTag}
          onNameChange={(e) => setProductName(e.target.value)}
          onDescriptionChange={(e) => setProductDescription(e.target.value)}
          onPriceChange={(e) => setProductPrice(e.target.value)}
          onTagChange={(e) => setProductTag(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <ProductTags tags={productTagsArray} onDeleteTag={handleDeleteTag} />
      </form>
    </div>
  );
};

export default AddItem;
