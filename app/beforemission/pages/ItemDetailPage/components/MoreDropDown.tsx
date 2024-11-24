import React from "react";
import "./MoreDropDown.css";

interface MoreDropDownProps {
  onEdit: () => void;
  onDelete: () => void;
}

function MoreDropDown({ onEdit, onDelete }: MoreDropDownProps) {
  return (
    <div className="moreDropDown">
      <div className="moreDropDownMenu" onClick={onEdit}>
        수정하기
      </div>
      <div className="moreDropDownMenu" onClick={onDelete}>
        삭제하기
      </div>
    </div>
  );
}

export default MoreDropDown;
