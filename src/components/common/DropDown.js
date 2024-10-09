import { useState } from "react";

/**
 * 드롭다운
 *
 * @param {Array} options - 옵션 개체 배열로, 각각 '라벨'과 '값'을 갖습니다
 * @param {Function} onSelect - 옵션 선택을 처리하는 콜백 기능
 */
const DropDown = ({ options, onSelect }) => {
  const [isOptionVisible, setIsOptionVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0].label);

  const handleSelectClick = () => {
    setIsOptionVisible(!isOptionVisible);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setIsOptionVisible(false);
    onSelect(option.value);
  };

  return (
    <div className='select'>
      <button className='select-title' onClick={handleSelectClick}>
        {selectedOption}
      </button>
      {isOptionVisible && (
        <div className='select-option'>
          {options.map((option) => (
            <button key={option.value} className='select-option-list' onClick={() => handleOptionClick(option)}>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
