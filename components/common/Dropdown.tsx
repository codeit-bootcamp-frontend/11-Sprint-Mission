import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';
import Image from 'next/image';
import dropdownIcon from '@/public/ic_drowdown.svg';
import { ScreenType } from '@/hooks/useResize';
import sortImage from '@/public/ic_sort.svg';
import { OrderType } from '@/api/productApi';

type DropdownItem = {
  id: number;
  label: string;
  value: string;
};

interface DropdownProps {
  items: DropdownItem[];
  screenType: ScreenType;
  onclickSelect: (item: OrderType) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  screenType,
  onclickSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>(items[0].label);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleItemClick = (item: DropdownItem) => {
    setSelectedItem(item.label);
    setIsOpen(false);

    onclickSelect(item.value);
  };

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      {screenType === 'mobile' ? (
        <Image
          src={sortImage}
          onClick={toggleDropdown}
          alt="Sorting options"
          className={styles['sort-icon']}
        />
      ) : (
        <div className={styles['dropdown-content']}>
          <div className={styles['dropdown-text']}>{selectedItem}</div>
          <button
            onClick={toggleDropdown}
            className={styles['dropdown-button']}
            aria-expanded={isOpen ? 'true' : 'false'}
            aria-controls="dropdown-menu"
            role="button"
          >
            <Image
              className={styles['dropdown-icon']}
              src={dropdownIcon}
              alt="Dropdown icon"
              width={24}
              height={24}
            />
          </button>
        </div>
      )}

      {isOpen && (
        <ul id="dropdown-menu" className={styles['dropdown-menu']}>
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={styles['dropdown-item']}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
