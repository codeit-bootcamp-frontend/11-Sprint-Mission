import { useState } from 'react';
import { DEFAULT_DELAY_TIME } from '@constant';
import './KebabMenu.css';

interface KebabMenuProps {
  openEdit: () => void;
  onDelete: (id: number) => void;
  id: number;
}

const KebabMenu = ({ openEdit, onDelete, id }: KebabMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const toggleMenu = () => {
    if (!isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsOpen(true), DEFAULT_DELAY_TIME);
    } else {
      setIsOpen(false);
      setTimeout(() => setShouldRender(false), DEFAULT_DELAY_TIME);
    }
  };

  return (
    <div className='comment-kebab-container'>
      <button className='kebab-btn' onClick={toggleMenu} aria-label='Menu'>
        ⋮
      </button>

      {shouldRender && (
        <ul className={`kebab-dropdown ${isOpen ? 'show' : ''}`}>
          <li
            className='kebab-dropdown-option option-top'
            onClick={() => {
              openEdit();
              setIsOpen(false);
              setTimeout(() => setShouldRender(false), DEFAULT_DELAY_TIME);
            }}
          >
            수정하기
          </li>
          <li
            className='kebab-dropdown-option option-bottom'
            onClick={() => {
              onDelete(id);
              setIsOpen(false);
              setTimeout(() => setShouldRender(false), 200);
            }}
          >
            삭제하기
          </li>
        </ul>
      )}
    </div>
  );
};

export default KebabMenu;
