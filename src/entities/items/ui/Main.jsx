import React from "react";

import { useQuery } from "@tanstack/react-query";
import { fetchItems } from "../service/fetchItems";
import { useState } from "react";
import BestItems from "./BestItems";
// import useResponsiveDisplayCount from "../hooks/useResponsiveDisplayCount";
import AllItems from "./AllItems";

const Main = () => {
  // const { bestDisplayCount, allDisplayCount } = useResponsiveDisplayCount(); // 훅 사용
  const [sortBy, setSortBy] = useState("recent");

  const handleSortChange = (e) => {
    setSortBy(e.target.value); // 선택된 옵션에 따라 sortBy 값을 업데이트
  };

  return (
    <main className="w-full flex justify-center items-center flex-col mt-5 ">
      <BestItems />
      <AllItems
        handleSortChange={handleSortChange}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </main>
  );
};

export default Main;
