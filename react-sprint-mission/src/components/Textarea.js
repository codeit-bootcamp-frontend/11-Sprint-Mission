import React, { useEffect, useState } from "react";

function Textarea({
  id = "textareaID",
  className = "textareaClassName",
  type = "text",
  placeholder = "",
  onChange,
  children,
  ...props
}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    onChange(inputValue);
  }, [inputValue]);

  return (
    <div className="textareaWrap">
      <label htmlFor={id}>{children}</label>
      <textarea
        id={id}
        className={className}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        {...props}
      />
    </div>
  );
}

export default Textarea;
