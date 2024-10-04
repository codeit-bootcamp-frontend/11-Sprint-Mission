import { useState } from "react";

const DropDown = ({ onBest, onNewest }) => {
  const [isOption, setIsOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("최신순");

  const handleSelectClick = () => {
    setIsOption(!isOption);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOption(false);
    if (option === "최신순") {
      onNewest();
    } else if (option === "좋아요순") {
      onBest();
    }
  };

  return (
    <div className='select'>
      <button className='select-title' value='favorite' onClick={handleSelectClick}>
        {selectedOption}
      </button>
      {isOption ? (
        <div className='select-option'>
          <button className='select-option-list' value='favorite' onClick={() => handleOptionClick("최신순")}>
            최신순
          </button>
          <button className='select-option-list' value='recent' onClick={() => handleOptionClick("좋아요순")}>
            좋아요순
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DropDown;
