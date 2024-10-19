import Header from '../../common/auth/home/Header';
import { Link } from 'react-router-dom';
import './AddItemPage.css';
import AddItemImage from './AddItemImage';
import AddItemInfo from './AddItemInfo';
import { useState, useEffect } from 'react';
import AddItemTag from './AddItemTag';

function AddItemPage() {
  const [image, setImage] = useState('');
  const [tags, setTags] = useState([]);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleDeleteTag = (targetIdx) => {
    setTags((prevTags) => {
      return prevTags.filter((_, idx) => idx !== targetIdx);
    });
  };

  // 유효성 검사 로직
  useEffect(() => {
    if (
      productName.trim() !== '' &&
      description.trim() !== '' &&
      price.trim() !== '' &&
      0 < tags.length
    ) {
      setIsFormValid(true);
      console.log(11111111);
    } else {
      setIsFormValid(false);
      console.log(222222);
    }
  }, [productName, description, price, tags]);

  return (
    <>
      <Header
        leftMenu={
          <>
            <Link className="menu-item free-board">자유게시판</Link>
            <Link className="menu-item secondhand-market">중고마켓</Link>
          </>
        }
        rightMenu={
          <Link to="/mypage">
            <img
              id="mypage"
              src="images/icons/ic_mypage.svg"
              alt="마이페이지 아이콘"
            />
          </Link>
        }
      />
      <form className="add-item-container">
        <div className="add-item-wrapper">
          <p className="add-item-title">상품 등록하기</p>
          <button className="add-item-register-btn" disabled={!isFormValid}>
            등록
          </button>
        </div>
        <AddItemInfo label="상품 이미지" name="image">
          <AddItemImage image={image} setImage={setImage} />
        </AddItemInfo>
        <AddItemInfo
          label="상품명"
          name="name"
          placeholder="상품명을 입력해주세요"
          data={productName}
          setData={setProductName}
        />
        <AddItemInfo
          label="상품 소개"
          name="description"
          placeholder="상품 소개를 입력해주세요"
          rows={8}
          data={description}
          setData={setDescription}
        />
        <AddItemInfo
          label="판매 가격"
          name="price"
          placeholder="판매 가격을 입력해주세요"
          data={price}
          setData={setPrice}
        />
        <AddItemInfo
          label="태그"
          name="tag"
          placeholder="태그를 입력해주세요"
          setData={setTags}
        >
          <AddItemTag tags={tags} onDeleteTag={handleDeleteTag} />
        </AddItemInfo>
      </form>
    </>
  );
}

export default AddItemPage;
