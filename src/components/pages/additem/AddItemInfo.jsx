import { useState } from "react";
import "./AddItemInfo.css";

function AddItemInfo({
  label,
  name,
  rows = 1,
  placeholder,
  additional,
  setData,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (name === "tag" && e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      setData((prevTags) => [...prevTags, inputValue]);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <section className="add-item-info">
      <label className="add-item-label" htmlFor={name}>
        {label}
      </label>

      {additional && name !== "tag" ? (
        additional
      ) : (
        <textarea
          className="add-item-description"
          name={name}
          id={name}
          rows={rows}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={name === "tag" ? handleKeyDown : null}
        ></textarea>
      )}

      {name === "tag" && additional}
    </section>
  );
}

export default AddItemInfo;
