import React from 'react';

// onSelect 함수 타입 정의
interface DropdownProps {
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onSelect }) => {
  const handleSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    const selectedValue = e.currentTarget.textContent ?? '';
    onSelect(selectedValue);
  };

  return (
    <ul>
      <li onClick={handleSelect}>최신순</li>
      <li onClick={handleSelect}>좋아요순</li>
    </ul>
  );
};

export default Dropdown;
