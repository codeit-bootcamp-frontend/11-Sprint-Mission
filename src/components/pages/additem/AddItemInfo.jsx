import { useState } from 'react';
import './AddItemInfo.css';

function AddItemInfo({
  children,
  label,
  name,
  rows = 1,
  placeholder,
  data,
  setData,
}) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {

      e.preventDefault();
      setData((prevTags) => [...prevTags, inputValue]);
      setInputValue('');
    }
  };

  const handleInputChange = (e) => {
    if (name !== 'tag') {
      setData(e.target.value);
    } else {
      setInputValue(e.target.value);
    }
  };

  return (
    <section className="add-item-info">
      <label className="add-item-label" htmlFor={name}>
        {label}
      </label>

      {children && name !== 'tag' ? (
        children
      ) : (
        <textarea
          className="add-item-description"
          name={name}
          id={name}
          rows={rows}
          placeholder={placeholder}
          value={name === 'tag' ? inputValue : data}
          onChange={handleInputChange}
          onKeyDown={name === 'tag' ? handleKeyDown : null}
        ></textarea>
      )}

      {name === 'tag' && children}
    </section>
  );
}

export default AddItemInfo;
