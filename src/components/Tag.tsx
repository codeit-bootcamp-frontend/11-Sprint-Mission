import React, { ReactNode } from 'react';
import x from '../assets/icons/ic_x.svg';
import './Tag.css';

interface TagProp {
  children: ReactNode;
}

function Tag({ children }: TagProp) {
  return (
    <>
      <div className="single-tag">
        <div className="tag-content">
          <div>{children}</div>
          <button className="x-button">
            <img src={x} alt="태그삭제" />
          </button>
        </div>
      </div>
    </>
  );
}
export default Tag;
