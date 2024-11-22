import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getProductDetail } from "../../api/itemApi";
import { useParams } from "react-router-dom";
import ItemProfile from "./component/ItemProfile";
import ItemComment from "./component/ItemComment";
import { ReactComponent as BackIcon } from "../../assets/images/icons/ic_back.svg";

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

const Line = styled.div<{$margin?: string}>`
  width: 100%;
  border: none;
  height: 1px;
  background-color: #E5E7EB;
  margin: ${(props) =>
    props.$margin || "16px 0"};
`;

const BackToMarketPageLink = styled(Link)`
	background-color: #3692FF;
	color: #fff;
	padding: 11.5px 23px;
	border-radius: 999px;
	font-size: 16px;
	font-weight: bold;
	cursor: pointer;

	&:hover {
		background-color: #3692FF;
	}

	&:focus {
		background-color: #3692FF;
	}

  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  margin: 0 auto;
`;

interface Product {
  createdAt: Date;
  updatedAt: string;
  favoriteCount: number;
  ownerId: number;
  ownerNickname: string; 
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
  isFavorite: boolean;
}

const ItemPage: React.FC = () => {
	const [product, setProduct] = useState<Product | null>(null);
	const [error, setError] = useState<string | null>(null);

	const { productId } = useParams();

	const productIdNumber = Number(productId);

	useEffect(() => {
		async function fetchProduct() {
			if(!productIdNumber) {
				setError("아이디없음");
				return;
			}

			try {
				const data: Product = await getProductDetail(productIdNumber);

				if(!data) throw new Error("데이터 못참음");

				setProduct(data);
			} catch (error) {
				if (error instanceof Error) setError(error.message);
        else setError("오류 발생.");
			}
		}
		fetchProduct();
	}, [productIdNumber]);

	if (error) console.log(`${error}`);

	if (!productId || !product) return null;

	return (
		<Container>
			<ItemProfile product={product} />

			<Line />

			<ItemComment productId={productIdNumber} />

			<BackToMarketPageLink to="/items">
          목록으로 돌아가기
          <BackIcon />
        </BackToMarketPageLink>
		</Container>
	)
}

export default ItemPage;