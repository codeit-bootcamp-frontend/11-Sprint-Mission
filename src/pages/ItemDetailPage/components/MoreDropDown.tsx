// 기존 DropDown 컴포넌트랑 겹치는 부분이 많긴한데 그 때 재사용을 고려 안 해서 일단 새로 만들겠습니다 ㅜㅜ...

import React from "react";
import "./MoreDropDown.css";

function MoreDropDown({ onEdit, onDelete }) {
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
