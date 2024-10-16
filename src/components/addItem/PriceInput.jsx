import React from "react";
import { formatPrice, formatToPrice } from "utils/formatPrice";

function PriceInput({ children, name, value, setUserInput }) {
  /**
   * String 타입의 입력을 금액 형식으로 formating해 input에 출력
   */
  const handleInput = ({ target }) => {
    const priceValue = formatToPrice(target.value);
    const regExp = /^\d*$/; // 숫자만 입력 가능하게 하기 위한 정규식
    if (regExp.test(priceValue)) {
      setUserInput((prev) => ({ ...prev, price: +priceValue })); // form의 price state 저장할 때는 Number 타입으로 변환해서 저장
    }
  };
  return (
    <div className="form-input-wrap">
      <label htmlFor={`item_${name}`}>{children}</label>
      <input
        id={`item_${name}`}
        type="text"
        placeholder="상품 가격을 입력해주세요"
        value={formatPrice(value)}
        onChange={handleInput}
        required
      />
    </div>
  );
}

export default PriceInput;
