import React from "react";

function PriceInput({ children, name }) {
  return (
    <div className="form-input-wrap">
      <label htmlFor={`item_${name}`}>{children}</label>
      <input
        id={`item_${name}`}
        type="number"
        placeholder="상품 가격을 입력해주세요"
      />
    </div>
  );
}

export default PriceInput;
