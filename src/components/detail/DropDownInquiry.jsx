import React, { useState } from "react";

function DropDownInquiry({ setIsEditting }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    setIsOpen(false);
    setIsEditting(true);
  };

  const handleDelete = () => {
    setIsOpen(false);
  };
  return (
    <div className="menu">
      <button
        type="button"
        className="btn-open-menu"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img src="/images/icons/ic_menu.svg" alt="메뉴 열기" />
      </button>
      {isOpen && (
        <div className="menus">
          <button type="button" onClick={handleEdit}>
            수정하기
          </button>
          <button type="button" onClick={handleDelete}>
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}

export default DropDownInquiry;
