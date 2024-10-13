import React from "react";
import Item from "./Item";
import "./AllItems.css";

const AllItems = ({ items }) => {
  return (
    <div className="allItems">
      {items.map(({ price, name, images, favoriteCount }) => {
        return (
          <Item
            price={price}
            name={name}
            images={images}
            favoriteCount={favoriteCount}
          />
        );
      })}
    </div>
  );
};

export default AllItems;
