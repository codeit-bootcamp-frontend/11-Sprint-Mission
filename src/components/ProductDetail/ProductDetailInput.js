import { getProductDetailComment } from '../../hooks/api';
import { useState } from 'react';

function ProductDetailInput() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="inquiry">
      <p className="inquiryTitle">문의하기</p>
      <textarea
        className="inquiryInput"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
      />
      <button
        className="inquiryButton"
        disabled={!inputValue}
        style={{
          backgroundColor: inputValue ? '#3692ff' : '#9CA3AF', // 값이 있으면 파란색 없으면 회색
          cursor: inputValue ? 'pointer' : 'not-allowed',
        }}
      >
        등록
      </button>
    </div>
  );
}

export default ProductDetailInput;
