import { useEffect, useState,useCallback } from "react";
import styled from "styled-components";
import { debounce } from 'lodash';
import { getProducts } from "../../../api/itemApi";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import DropDownList from "./DropDownList";
import Pagination from "./Pagination";
import { ReactComponent as SortIcon } from "../../../assets/images/icons/ic_sort.svg";
import { ReactComponent as SearchIcon } from "../../../assets/images/icons/ic_search.svg";

const getPageSize = () => {
	const width = window.innerWidth;

	if(width < 768) return 4;
	else if(width < 1280) return 6;
	else return 12;
};

const AllItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 24px;
  gap: 24px;
	
	@media (min-width: 768px) {
		padding: 0 16px;
    margin-bottom: 24px;
    gap: 24px;
	}
`;

const ItemsTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  line-height: normal;
`;

const SearchBar = styled.div`
  display: flex;
  background-color: #f3f4f6;
  border-radius: 12px;
  padding: 9px 16px;
  flex: 1;
  align-items: center;
  max-width: 400px;

  input {
    border: none;
    flex: 1;
    background-color: inherit;
    margin-left: 4px;
    &:focus {
      outline: none;
    }
  }

	@media (min-width: 768px) {
		max-width: 400px;
	}
`;

const SortButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
`;

const AllItemsCard = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 8px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px 16px;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 40px 24px;
  }
`;

function AllItemsSection() {
	const [pageSize, setPageSize] = useState(getPageSize());
	const [itemList, setItemList] = useState([]);
	const [orderBy, setOrderBy] = useState("recent");
	const [isDropDown, setIsDropDown] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState();

	const fetchSortData = useCallback(async() => {
		try {
			const products =await getProducts({ orderBy, page, pageSize });
			setItemList(products.list);
			setTotalPage(Math.ceil(products.totalCount / pageSize));
		} catch (error) {
			console.log('Error fetchingdata: ', error);
		}
	}, [orderBy, page, pageSize]);

	useEffect(() => {
    fetchSortData();
  }, [fetchSortData]);

	useEffect(() => {
		const handleResize = () => {
			setPageSize(getPageSize());
		};

		const debouncedHandleResize = debounce(handleResize, 250);
		window.addEventListener("resize", debouncedHandleResize);

		return () => {
				window.removeEventListener("resize", debouncedHandleResize);
			};
	}, [itemList]);

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

	return (
		<div>
			<AllItemsContainer>
				<ItemsTitle>전체 상품</ItemsTitle>
				<Link to="/additem" className="loginLink btn">상품 등록하기</Link>
			</AllItemsContainer>

			<AllItemsContainer>
				<SearchBar>
					<SearchIcon />
					<input 
						className="searchBarInput" 
						placeholder="검색할 상품을 입력해주세요"
					/>
				</SearchBar>
				<div className="sort">
					<SortButton onClick={toggleDropDown}>
						<SortIcon />
					</SortButton>
					{isDropDown && (
						<DropDownList onSortCard={handleSortCard} />
					)}
				</div>
			</AllItemsContainer>

			<AllItemsCard>
        {itemList?.map((item) => (
          <ItemCard item={item} key={`market-item-${item.id}`} />
        ))}
			</AllItemsCard>

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
