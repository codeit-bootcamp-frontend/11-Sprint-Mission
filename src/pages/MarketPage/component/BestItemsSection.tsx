import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { getProducts } from "../../../api/itemApi";
import styled from "styled-components";
 
interface Product {
  createdAt: Date;
  favoriteCount: number;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
  isFavorite: boolean;
}

interface ProductListData {
  totalCount: number;
  list: Product[];
}

type ProductSortOption = "recent" | "favorite";

const getPageSize = () => {
	const width = window.innerWidth;

	if(width < 768) return 1;
	else if(width < 1280) return 2;
	else return 4;
};

const BestItemsContainer = styled.div`
  padding: 80px 5px 24px 5px;

	@media (min-width: 768px) {
		padding: 60px 5px 24px 5px;
    margin-bottom: 40px;
	}

	@media (min-width: 1200px) {
		padding: 60px 10px 24px 10px;
	}
`;

const ItemsTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  line-height: normal;
`;

const BestItemsCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
	@media (min-width: 768px) {
		display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
	}

	@media (min-width: 1200px) {
		grid-template-columns: repeat(4, 1fr);
	}
`;

const BestItemsSection: React.FC = () => {
	const [itemList, setItemList] = useState<Product[]>([]);
	const [pageSize, setPageSize] = useState(getPageSize());

	const fetchSortData = async({ orderBy, pageSize } : { orderBy: ProductSortOption; pageSize: number }) => {
		const data: ProductListData = await getProducts({ orderBy, pageSize });

		setItemList(data.list);
	};

	useEffect(() => {
		const handleResize = () => {
			setPageSize(getPageSize());
		};

		window.addEventListener("resize", handleResize);
		fetchSortData({ orderBy:"favorite", pageSize });

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [pageSize]);

	return (
		<BestItemsContainer>
			<ItemsTitle>베스트 상품</ItemsTitle>

			<BestItemsCard>
				{itemList?.map((item) => (
					<ItemCard item={item} key={`best-item-${item.id}`} />
				))}
			</BestItemsCard>
		</BestItemsContainer>
	);
}

export default BestItemsSection; 