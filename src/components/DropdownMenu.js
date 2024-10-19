import React, { useState } from 'react';
import { ReactComponent as Dropdown } from '../images/ic_kebab.svg';
import '../style/DropdownMenu.css';

function DropdownMenu({ onSelection }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="sortButtonWrapper">
      <button className="sortDropdownTriggerButton" onClick={toggleDropdown}>
        <Dropdown />
      </button>

      {isDropdownVisible && (
        <div className="dropdownMenu">
          <div
            className="dropdownItem"
            onClick={() => {
              onSelection('fixed');
              setIsDropdownVisible(false);
            }}
          >
            수정하기
          </div>
          <div
            className="dropdownItem"
            onClick={() => {
              onSelection('delete');
              setIsDropdownVisible(false);
            }}
          >
            삭제하기
          </div>
        </div>
      )}
    </div>
  );
}
export default DropdownMenu;
