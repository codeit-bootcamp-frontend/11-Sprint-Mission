import React from "react";
import HeartIcon from "../images/ic_heart.svg";
import "./AllProduct.css";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { getProducts } from "../api/api";

function AllProductItem({ item }) {
    return (
      <div className="AllProductItem">
        <img className="AllProductItemImg" src={item.images} alt={item.name} />
        <div>
          <p className="productName">{item.name}</p>
          <p className="productPrice">{item.price}원</p>
          <p className="productFavoriteCount">
            <img src={HeartIcon} alt="HeartIcon" />
            {item.favoriteCount}
          </p>
        </div>
      </div>
    );
  }
  
  function AllProduct({ items }) {
    return (
      <ul className="AllProduct">
        {items.map((item) => {
          return (
            <li key={item.id}>
              <AllProductItem item={item} />
            </li>
          );
        })}
      </ul>
    );
  }

export default AllProduct;