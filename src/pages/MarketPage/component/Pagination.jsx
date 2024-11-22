import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../../assets/images/icons/arrow_left.svg";
import { ReactComponent as RightArrow } from "../../../assets/images/icons/arrow_right.svg";

const PaginationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const PaginationButton = styled.button`
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: #6b7280;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  &.active {
    background-color: var(--blue);
    color: #fff;
  }
`;


const Pagination = ({ totalPage, currentPage, pageChange }) => {
	const maxPage = 5;	
	let startPage;

	if(totalPage <= maxPage) {
		startPage = 1;
	}
	else {
		startPage = Math.max(currentPage - Math.floor(maxPage / 2), 1);
		startPage = Math.min(startPage, totalPage - maxPage + 1);
	}

	const pages = Array.from(
		{ length: Math.min(maxPage, totalPage - startPage + 1) },
    (_, i) => startPage + i
	);

	return (
		<PaginationBar>
			<PaginationButton
				disabled={currentPage === 1}
				onClick={() => pageChange(currentPage - 1)}
				alt="왼쪽화살표"
			>
				<LeftArrow />
			</PaginationButton>
			{pages.map((page) => (
				<PaginationButton
					key={page}
					className={currentPage === page ? "active" : ""}
					onClick={() => pageChange(page)}
				>
					{page}
				</PaginationButton>
			))}
			<PaginationButton
				disabled={currentPage === totalPage}
				onClick={() => pageChange(currentPage + 1)}
				alt="오른쪽화살표"
			>
				<RightArrow />
			</PaginationButton>
		</PaginationBar>
	)
}

export default Pagination;