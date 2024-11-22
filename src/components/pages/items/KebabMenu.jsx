import { useState } from 'react';
import './KebabMenu.css';

const KebabMenu = ({ openEdit, onDelete, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const toggleMenu = () => {
    if (!isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsOpen(true), 10);
    } else {
      setIsOpen(false);
      setTimeout(() => setShouldRender(false), 100);
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
              setTimeout(() => setShouldRender(false), 200);
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
