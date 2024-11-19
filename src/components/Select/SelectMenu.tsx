import { useState } from 'react';
import StyledSelectContainer from './SelectMenu.styles';

// Option 타입 정의
interface Option {
  label: string;
  value: string;
  onSelect?: (value: string) => void;
}

// DropDown 컴포넌트의 prop 타입 정의
interface DropDownProps {
  title: string;
  option: Option[];
}

function SeletMenu({ title, option }: DropDownProps) {
  const [isOptionVisible, setIsOptionVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>(title);

  // 셀렉트 버튼 클릭 핸들러
  const handleSelectClick = () => {
    setIsOptionVisible((prev) => !prev);
  };

  // 옵션 클릭 핸들러
  const handleOptionClick = (
    label: string,
    value: string,
    onSelect?: (value: string) => void,
  ) => {
    setSelectedLabel(label);
    setIsOptionVisible(false);
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <StyledSelectContainer>
      <button className='select-title' onClick={handleSelectClick}>
        {selectedLabel}
      </button>
      {isOptionVisible && (
        <div className='select-option'>
          {option.map(({ label, value, onSelect }) => (
            <button
              key={value}
              className='select-option-list'
              onClick={() => handleOptionClick(label, value, onSelect)}>
              {label}
            </button>
          ))}
        </div>
      )}
    </StyledSelectContainer>
  );
}

export default SeletMenu;
