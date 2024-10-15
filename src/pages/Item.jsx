import React from "react";
import { SubHeader } from "../layouts/Header";
import Product from "../components/Item/Product";
import ContactUs from "../components/Item/ContactUs";
import Comments from "../components/Item/Comments";

const Item = () => {
  return (
    <>
      <SubHeader />
      <Product />
      <ContactUs />
      <Comments />
    </>
  );
};

export default Item;
