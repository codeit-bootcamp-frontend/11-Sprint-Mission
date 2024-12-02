import { useState } from 'react';
import styled from 'styled-components';
import SortIcon from '@/public/images/icons/ic_sort.svg';

interface DropdownProps {
  onSortSelection: (sortOption: any) => void;
  sortOptions: { key: string; label: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({ onSortSelection, sortOptions }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <SortButtonSection>
      <SortButton onClick={toggleDropdown}>
        <SortIcon alt="정렬" />
      </SortButton>

      {isDropdownVisible && (
        <DropdownSection>
          {sortOptions.map((option) => (
            <DropdownItem
              key={option.key}
              onClick={() => {
                onSortSelection(option.key);
                setIsDropdownVisible(false);
              }}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownSection>
      )}
    </SortButtonSection>
  );
};

const SortButtonSection = styled.div`
  position: relative;
`;

const SortButton = styled.button`
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  padding: 9px;
  margin-left: 8px;
`;

const DropdownSection = styled.div`
  position: absolute;
  background:  ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  border: 1px solid var(--gray-200);
  z-index: 50;
`;

const DropdownItem = styled.div`
  padding: 12px 44px;
  border-bottom: 1px solid var(--gray-200);
  font-size: 16px;
  color: var(--gray-800);
  cursor: pointer;
`;

export default Dropdown;
