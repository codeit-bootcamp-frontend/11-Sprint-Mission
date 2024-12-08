import React, { useState } from 'react';
import SortIcon from '@public/svgs/ic_sort.svg';
import styles from '@styles/DropdownMenu.module.css';
import { ArticleOrderBy } from '@components/types/articleTypes';

interface DropdownMenuProps {
  onSelection: (Option: ArticleOrderBy) => void;
  sortOptions: { key: ArticleOrderBy; label: string }[];
}

function DropdownMenu({ onSelection, sortOptions }: DropdownMenuProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className={styles['sortButtonWrapper']}>
      <button
        className={styles['sortDropdownTriggerButton']}
        onClick={toggleDropdown}
      >
        <SortIcon />
      </button>

      {isDropdownVisible && (
        <div className={styles['dropdownMenu']}>
          {sortOptions.map((option) => (
            <div
              className={styles['dropdownItem']}
              key={option.key}
              onClick={() => {
                onSelection(option.key);
                setIsDropdownVisible(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default DropdownMenu;
