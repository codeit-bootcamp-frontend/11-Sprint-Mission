import React from "react";

function PriceInput({ children, name, value, setUserInput }) {
  const handleInput = ({ target }) => {
    setUserInput((prev) => ({ ...prev, price: target.value }));
  };
  return (
    <div className="form-input-wrap">
      <label htmlFor={`item_${name}`}>{children}</label>
      <input
        id={`item_${name}`}
        type="text"
        placeholder="상품 가격을 입력해주세요"
        value={value}
        onChange={handleInput}
        required
      />
    </div>
  );
}

export default PriceInput;
