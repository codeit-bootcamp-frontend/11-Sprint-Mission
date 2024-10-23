import React, { useState } from "react";
import AddInputItem from "../component/AddInputItem";
import ImageUpload from "../component/ImageUpload";
// import AddItemButton from "../component/AddItemButton";
// import TagInput from "../component/TagInput";

function AddItem() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  //   const [productName, setProductName] = useState("");
  //   const [productContent, setProductContent] = useState("");
  //   const [productPrice, setProductPrice] = useState();
  //   const [productTags, setProductTags] = useState([]);
  //   const [productImage, setProductImage] = useState(null);
  //   const [tags, setTags] = useState([]);

  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      description.trim() !== "" &&
      price > 0 &&
      image !== null
    );
  };

  const handleSubmit = () => {
    const itemAddData = {
      image,
      name,
      description,
      price,
      tags: tags,
    };
    console.log("상품 등록 데이터:", itemAddData);
  };

  const handleImageChange = (name, file) => {
    setImage(file);
  };

  //   const addTag = (tag) => {
  //     if (!tags.includes(tag)) {
  //       setTags([...tags, tag]);
  //     }
  //   };

  //   const removeTag = (tagToRemove) => {
  //     setTags(tags.filter((tag) => tag !== tagToRemove));
  //   };

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

      <ImageUpload title="상품 이미지" onChange={handleImageChange} />
      <AddInputItem
        productName={name}
        productContent={description}
        productPrice={price}
        productTag={tags}
        onNameChange={setName}
        onContentChange={setDescription}
        onPriceChange={setPrice}
        onTagChange={setTags}
        onTagsUpdate={setTags}
      />
      {/* <TagInput tags={tags} onAddTag={addTag} onRemoveTag={removeTag} /> */}
    </div>
  );
}

export default AddItem;
