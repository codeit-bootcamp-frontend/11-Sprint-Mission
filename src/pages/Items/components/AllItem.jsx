import React from "react";

const AllItem = ({ product }) => {
  return (
    <div key={product.id} className="bg-gray-200 p-4">
      <img src={product.images[0]} alt="프로덕트 이미지"></img>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </div>
  );
};

export default AllItem;
