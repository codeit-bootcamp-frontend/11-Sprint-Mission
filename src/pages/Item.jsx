import React from "react";
import { useParams } from "react-router-dom";
import { SubHeader } from "../layouts/Header";
import Product from "../components/Item/Product";
import ContactUs from "../components/Item/ContactUs";
import Comments from "../components/Item/Comments";

const Item = () => {
  const { id } = useParams();

  return (
    <>
      <SubHeader />
      <Product id={id} />
      <ContactUs />
      <Comments id={id} />
    </>
  );
};

export default Item;
