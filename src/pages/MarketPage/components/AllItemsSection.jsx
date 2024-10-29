import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/itemApi";
import ItemCard from "./ItemCard";
import { ReactComponent as SortIcon } from "../../../assets/images/icons/ic_sort.svg";
import { ReactComponent as SearchIcon } from "../../../assets/images/icons/ic_search.svg";
import { Link } from "react-router-dom";
import DropDownList from "./DropDownList";
import Pagination from "./Pagination";

const getPageSize = () => {
	const width = window.innerWidth;

	if(width < 768) return 1;
	else if(width < 1280) return 2;
	else return 4;
};

function AllItemsSection() {
	const [pageSize, setPageSize] = useState(getPageSize());
	const [itemList, setItemList] = useState([]);
	const [orderBy, setOrderBy] = useState("recent");
	const [isDropDown, setIsDropDown] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState();

	const fetchSortData = async({ orderBy, page, pageSize }) => {
		const products =await getProducts({ orderBy, page, pageSize });
		setItemList(products.list);
		setTotalPage(Math.ceil(products.totalCount / pageSize));
	};

	const handleSortCard = (sortOption) => {
		setOrderBy(sortOption);
		setIsDropDown(false);
	};

	const toggleDropDown = () => {
		setIsDropDown(!isDropDown);
	}

	const pageChange = (pageNum) => {
		setPage(pageNum);
	}

	useEffect(() => {
		const handleResize = () => {
				setPageSize(getPageSize());
		};

		window.addEventListener("resize", handleResize);
		fetchSortData({ orderBy, page, pageSize });

		// Cleanup function
		return () => {
				window.removeEventListener("resize", handleResize);
			};
	}, [orderBy, page, pageSize]);

	return (
		<div>
			<div className="allItemsContainer">
				<h1 className="itemTitle">전체 상품</h1>
				<Link to="/additem" className="loginLink btn">상품 등록하기</Link>
			</div>

			<div className="allItemsContainer">
				<div className="searchBar">
					<SearchIcon />
					<input 
						className="searchBarInput" 
						placeholder="검색할 상품을 입력해주세요"
					/>
				</div>
				<div className="sort">
					<button class="sortDropDownBtn" onClick={toggleDropDown}>
						<SortIcon />
					</button>
					{isDropDown && (
						<DropDownList onSortCard={handleSortCard} />
					)}
				</div>
			</div>

			<div className="allItemsCard">
        {itemList?.map((item) => (
          <ItemCard item={item} key={`market-item-${item.id}`} />
        ))}
			</div>

			<div className="pagination">
				<Pagination 
					totalPage={totalPage}
					currentPage={page}
					pageChange={pageChange}
				/>
			</div>
		</div>
	)
}

export default AllItemsSection;