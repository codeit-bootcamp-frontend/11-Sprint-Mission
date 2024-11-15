import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getProductDetail } from "../../api/itemApi";
import { useParams } from "react-router-dom";
import ItemProfile from "./component/ItemProfile";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  @media (min-width: 768px) {
    padding: 16px 24px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
    padding: 24px 0;
    margin: 0 auto;
  }
`;

function ItemPage() {
	const [product, setProduct] = useState(null);
	const [error, setError] = useState(null);

	const { productId } = useParams();

	useEffect(() => {
		async function fetchProduct() {
			if(!productId) {
				setError("아이디없음");
				return;
			}

			try {
				const data = await getProductDetail(productId);

				if(!data) throw new Error("데이터 못참음");
				
				setProduct(data);
			}
			catch (error) {
				setError(error.message);
			}
		}
		fetchProduct();
	}, [productId]);

	if (error) alert(`${error}`);

	if (!productId || !product) return null;

	return (
		<Container>
			<ItemProfile product={product} />
		</Container>
	)
}

export default ItemPage;