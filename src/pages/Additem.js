import React, { useState } from 'react';
import '../styles/AddItem.css';
import PlusIcon from '../image/plus-icon.png';
import RemoveButton from '../components/RemoveButton';

function AddItem() {
  const [image, setImage] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemIntro, setItemIntro] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemTags, setItemTags] = useState([]);

  const isFormValid = itemName && itemIntro && itemPrice && itemTags;

  // 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // 이미지 삭제 핸들러
  const handleImageRemove = () => {
    setImage(null);
  };

  // 태그 추가 핸들러
  const handleTagAdd = (e) => {
    const tagValue = e.target.value.trim();
    if (e.key === 'Enter' && tagValue && !itemTags.includes(tagValue)) {
      e.preventDefault();
      setItemTags([...itemTags, tagValue]);
      e.target.value = '';
    }
  };

  // 태그 삭제 핸들러
  const handleTagRemove = (tagToRemove) => {
    setItemTags(itemTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="add-item-form">
      <div className="product-registration">
        <h1>상품 등록하기</h1>
        <button className="submit-btn" disabled={!isFormValid}>
          등록
        </button>
      </div>

      <div className="item-image-input">
        <label htmlFor="image-upload">상품 이미지</label>
        <div className="image-upload">
          <label className="image-placeholder" htmlFor="image-upload">
            <input id="image-upload" type="file" onChange={handleImageUpload} />
            <div className="image-placeholder">
              <img src={PlusIcon} alt="이미지 아이콘" />
              <div className="text">이미지 등록</div>
            </div>
          </label>
          {/* 이미지가 있을때 */}
          {image && (
            <div className="image-preview">
              <img src={image} alt="이미지 미리보기" />
              <RemoveButton
                className="file-remove-btn"
                onClick={handleImageRemove}
              />
            </div>
          )}
        </div>
      </div>

      <div className="item-name-input">
        <label htmlFor="item-name">상품명</label>
        <input
          id="item-name"
          type="text"
          placeholder="상품명을 입력해주세요"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>

      <div className="item-intro-input">
        <label htmlFor="item-intro">상품 소개</label>
        <textarea
          id="item-intro"
          placeholder="상품 소개를 입력해주세요"
          value={itemIntro}
          onChange={(e) => setItemIntro(e.target.value)}
        ></textarea>
      </div>

      <div className="item-price-input">
        <label htmlFor="item-price">판매가격</label>
        <input
          id="item-price"
          type="text"
          placeholder="판매 가격을 입력해주세요"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
      </div>

      <div className="item-tags-input">
        <label htmlFor="item-tags">태그</label>
        <input
          id="item-tags"
          type="text"
          placeholder="태그를 입력해주세요"
          onKeyDown={handleTagAdd}
        />
        <div className="tags">
          {itemTags.length > 0 &&
            itemTags.map((tag) => (
              <div key={tag} className="tag">
                {tag}
                {/* 태그가 있을때 */}
                {tag && (
                  <RemoveButton
                    className="tag-remove-btn"
                    onClick={() => handleTagRemove(tag)}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AddItem;
