import React from "react";
import "./MarketPage.css";
import BestItemsSection from "./components/BestItemsSection";
import AllItemsSection from "./components/AllItemsSection";

function MarketPage() {
	return (
		<div>
			<BestItemsSection />
			<AllItemsSection />
		</div>
	);
}

export default MarketPage;