import { useState } from 'react';
import styled from 'styled-components';
import { media } from '@/styles/media.styles';

const ICON_ARROW = '/ic_arrow_down.svg';
const ICON_SORT = '/ic_sort.svg';
import font from '@/styles/fontStyle.styles';

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

function SelectMenu({ title, option }: DropDownProps) {
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
    onSelect?: (value: string) => void
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

export default SelectMenu;

const StyledSelectContainer = styled.div`
  position: relative;
  order: 4;
  .select {
    &-title {
      width: 13rem;
      height: 4.4rem;
      padding: 1.2rem 2rem;
      ${font('16')}
      color: var(--gray-800);
      text-align: left;
      border: 1px solid var(--gray-200);
      border-radius: 1.2rem;
      background-color: #fff;
      background-image: url(${ICON_ARROW});
      background-size: 2.4rem;
      background-repeat: no-repeat;
      background-position: 8.6rem center;

      ${media.mo`
        width: 4.2rem;
        background-image: url(${ICON_SORT});
        font-size: 0;
        background-position: 0.9rem center;
      `}
    }
    &-option {
      position: absolute;
      left: 0;
      bottom: -10rem;
      display: flex;
      flex-direction: column;
      width: 13rem;
      text-align: center;
      border: 1px solid var(--gray-200);
      border-radius: 1.2rem;
      overflow: hidden;

      ${media.mo`
        left: -8.7rem;
      `}

      &-list {
        height: 4.2rem;
        padding: 0.9rem 0;
        background-color: #fff;
        font-size: 1.6rem;
        font-weight: 400;
        color: var(--gray-800);
        &:not(:last-child) {
          border-bottom: 1px solid var(--gray-200);
        }
      }
    }
  }
`;
