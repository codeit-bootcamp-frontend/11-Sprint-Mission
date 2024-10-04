import { useState } from "react";

const DropDown = () => {
  const [isOption, setIsOption] = useState(false);
  const handleOptionClick = () => {
    setIsOption(!isOption);
  };
  return (
    <div className='select'>
      <button className='select-title' value='favorite' onClick={handleOptionClick}>
        최신순
      </button>
      {isOption ? (
        <div className='select-option'>
          <button className='select-option-list' value='favorite'>
            최신순
          </button>
          <button className='select-option-list' value='recent'>
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
