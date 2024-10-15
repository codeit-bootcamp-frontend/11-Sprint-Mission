import React from "react";
import { Link } from "react-router-dom";

const AddItemButton = () => {
  return (
    <Link to="/addItem">
      <button className="h-9 w-24 text-xs text-white p-1 rounded-lg bg-[#3692FF] ">
        상품 등록하기
      </button>
    </Link>
  );
};

export default AddItemButton;
