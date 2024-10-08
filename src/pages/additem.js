import AddProductInput from '../components/additem/AddProductInput';
import AdditemButton from '../components/additem/AdditemButton';
import { useState } from 'react';

function Additem() {
  const [productName, setProductName] = useState('');
  const [productContent, setProductContent] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productTag, setProductTag] = useState('');

  const handleSubmit = () => {
    const productData = {
      productName,
      productContent,
      productPrice,
      productTag,
    };
    console.log('상품 등록 데이터:', productData);
  };

  return (
    <>
      <p>상품 등록하기</p>
      <AddProductInput
        productName={productName}
        productContent={productContent}
        productPrice={productPrice}
        productTag={productTag}
        onNameChange={setProductName}
        onContentChange={setProductContent}
        onPriceChange={setProductPrice}
        onTagChange={setProductTag}
      />
      <AdditemButton onSubmit={handleSubmit} />
    </>
  );
}

export default Additem;
