import React from "react";
import BestItemsSection from "./component/BestItemsSection";
import AllItemsSection from "./component/AllItemsSection";

/* 어디서 쓰는 코드지?
const SortSelect = styled.div`
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: right 12px center;
  min-width: 120px;
`;
*/

function MarketPage() {
	return (
		<div>
			<BestItemsSection />
			<AllItemsSection />
		</div>
	);
}

export default MarketPage;