import React from "react";
import "../css/Category.css";

const Category = ({ categoryData, isShowCancleBtn }) => {
  return (
    <div className="tag-area">
      {categoryData?.map((category, index) => (
        <div key={index} className="tag-box">
          {`#` + category}
          {isShowCancleBtn && <button className="tag-cancle"></button>}
        </div>
      ))}
    </div>
  );
};

export default Category;
