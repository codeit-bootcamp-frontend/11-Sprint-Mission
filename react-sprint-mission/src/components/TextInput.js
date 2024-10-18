import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { showPassword } from "./Validation";

function TextInput({
  id = "inputBoxID",
  className = "inputBoxClassName",
  type = "text",
  placeholder = "",
  onChange,
  children,
  ...props
}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    let targetValue = e.target.value;
    if (type === "number") {
      if (targetValue.length < 1) return;
      let value = Number(targetValue.replaceAll(",", ""));
      if (!isNaN(value)) {
        const formatValue = value.toLocaleString("ko-KR");
        setInputValue(formatValue);
      }
    } else {
      setInputValue(targetValue);
    }
  };

  useEffect(() => {
    onChange(inputValue);
  }, [inputValue]);

  return (
    <div className="inputWrap">
      <label htmlFor={id}>{children}</label>
      {type === "textarea" ? (
        <textarea
          id={id}
          className={className}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          {...props}
        />
      ) : (
        <>
          <input
            id={id}
            type={type === "number" ? "text" : type}
            className={className}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            {...props}
          />
        </>
      )}
    </div>
  );
}

const InputWrap = styled.div``;
export default TextInput;
