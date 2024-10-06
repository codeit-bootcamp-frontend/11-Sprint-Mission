import React from "react";
import HeartIcon from "../images/ic_heart.svg";
// import { useEffect, useState } from "react";
// import ItemCard from "./ItemCard";
import { getProducts } from "../api/api";

function BestProductItem({ item }) {
    return (
      <div className="BestProductItem">
        <img className="BestProductItemImg" src={item.images} alt={item.name} />
        <div>
          <p className="BestProductName">{item.name}</p>
          <p className="BestProductPrice">{item.price}원</p>
          <p className="BestProductFavoriteCount">
            <img src={HeartIcon} alt="HertIcon" />
            {item.favoriteCount}
          </p>
        </div>
      </div>
    );
  }
  
  function BestProduct({ items }) {
    return (
      <ul className="BestProduct">
        {items.map((item) => {
          return (
            <li key={item.id}>
              <BestProductItem item={item} />
            </li>
          );
        })}
      </ul>
    );
}
  
export default BestProduct;