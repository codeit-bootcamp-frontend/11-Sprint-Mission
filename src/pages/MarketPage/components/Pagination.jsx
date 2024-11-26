import React from "react";
import { ReactComponent as LeftArrow } from "../../../assets/images/icons/arrow_left.svg";
import { ReactComponent as RightArrow } from "../../../assets/images/icons/arrow_right.svg";
import "./Pagination.css";

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
		<div className="paginationBar">
			<button 
				className="paginationBtn" 
				disabled={currentPage === 1}
				onClick={() => pageChange(currentPage - 1)}
				alt="왼쪽화살표"
			>
				<LeftArrow />
			</button>
			{pages.map((page) => (
				<button
					key={page}
					className={`paginationBtn ${
						currentPage === page ? "active" : ""
					}`}
					onClick={() => pageChange(page)}
				>
					{page}
				</button>
			))}
			<button 
				className="paginationBtn" 
				disabled={currentPage === totalPage}
				onClick={() => pageChange(currentPage + 1)}
				alt="오른쪽화살표"
			>
				<RightArrow />
			</button>
		</div>
	)
}

export default Pagination;