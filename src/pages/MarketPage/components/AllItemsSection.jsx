import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/itemApi";
import ItemCard from "./ItemCard";
import { ReactComponent as SortIcon } from "../../../assets/images/icons/ic_sort.svg";
import { ReactComponent as SearchIcon } from "../../../assets/images/icons/ic_search.svg";
import { Link } from "react-router-dom";

const getPageSize = () => {
	const width = window.innerWidth;

	if(width < 768) return 1;
	else if(width < 1280) return 2;
	else return 4;
};

function AllItemsSection() {
	const [pageSize, setPageSize] = useState(getPageSize());
	const [itemList, setItemList] = useState([]);

	const fetchSortData = async() => {
		const products =await getProducts({ pageSize });
		setItemList(products.list);
	};

	useEffect(() => {
		const handleResize = () => {
				setPageSize(getPageSize());
		};

		window.addEventListener("resize", handleResize);
		fetchSortData();

		// Cleanup function
		return () => {
				window.removeEventListener("resize", handleResize);
			};
	}, [pageSize,]);

	return (
		<div>
			<div>
				<h1>전체 상품</h1>
				<Link to="/additem">상품 등록하기</Link>
			</div>

			<div>
				<div>
					<SearchIcon />
					<input placeholder="검색할 상품을 입력해주세요"/>
				</div>
			</div>

			<div>
        {itemList?.map((item) => (
          <ItemCard item={item} key={`market-item-${item.id}`} />
        ))}
			</div>
		</div>
	)
}

export default AllItemsSection;