import React from "react";
import { formatPrice, formatToPrice } from "utils/formatPrice";

function PriceInput({ children, name, value, setUserInput }) {
  const handleInput = ({ target }) => {
    const priceValue = formatToPrice(target.value);
    const regExp = /^\d*$/;
    if (regExp.test(priceValue)) {
      setUserInput((prev) => ({ ...prev, price: +priceValue }));
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
