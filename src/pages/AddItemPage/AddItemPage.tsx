import React, { useState } from "react";
// import AddInputItem from "../component/AddInputItem";
import Tag from "../../component/Tag";
import InputItem from "../../component/InputItem";
import ImageUpload from "../../component/ImageUpload";
// import AddItemButton from "../component/AddItemButton";
// import TagInput from "../component/TagInput";

function AddItem() {
  const [name, setName] = useState("");
  // const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  //   const [productName, setProductName] = useState("");
  //   const [productContent, setProductContent] = useState("");
  //   const [productPrice, setProductPrice] = useState();
  //   const [productTags, setProductTags] = useState([]);
  //   const [productImage, setProductImage] = useState(null);
  //   const [tags, setTags] = useState([]);

  // const isFormValid = () => {
  //   return (
  //     name.trim() !== "" &&
  //     description.trim() !== "" &&
  //     price > 0 &&
  //     image !== null
  //   );
  // };

  // const handleSubmit = () => {
  //   const itemAddData = {
  //     image,
  //     name,
  //     description,
  //     price,
  //     tags: tags,
  //   };
  //   console.log("상품 등록 데이터:", itemAddData);
  // };

  // const handleImageChange = (name, file) => {
  //   setImage(file);
  // };

  // 중복 등록 막기 위해 tags 배열에 없는 것 확인하고 삽입
  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // form 제출 버튼 활성화 조건
  // 이미지를 제외하고 모든 값이 입력되어야 하는 조건
  const isSubmitDisabled = !name || !description || !price || !tags.length;

  return (
    <div>
      <div>
        <p>상품 등록하기</p>
        <button type="submit" disabled={isSubmitDisabled}>
          등록
        </button>
        {/* <AddItemButton onSubmit={handleSubmit} disabled={!isFormValid} /> */}
      </div>

      {/* <ImageUpload title="상품 이미지" onChange={handleImageChange} /> */}
      <ImageUpload title="상품 이미지" />
      {/* <AddInputItem
        productName={name}
        productContent={description}
        productPrice={price}
        productTag={tags}
        onNameChange={setName}
        onContentChange={setDescription}
        onPriceChange={setPrice}
        onTagChange={setTags}
        onTagsUpdate={setTags}
      /> */}
      <InputItem
        id="name"
        label="상품명"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="상품명을 입력해 주세요"
      />

      <InputItem
        id="description"
        label="상품 소개"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="상품 소개를 입력해 주세요"
        isTextArea
      />

      <InputItem
        id="price"
        label="판매 가격"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="판매 가격을 입력해 주세요"
      />

      <Tag tags={tags} onAddTag={addTag} onRemoveTag={removeTag} />
    </div>
  );
}

export default AddItem;
