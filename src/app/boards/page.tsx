"use client";

import BestArticles from "@/components/boards/BestArticles";
import SortedArticles from "@/components/boards/SortedArticles";

export default function BoardsPage() {
  return (
    <div
      className="flex flex-col mx-auto
      w-[343px]
      tablet:w-[696px]
      pc:w-[1200px]"
    >
      <BestArticles />
      <SortedArticles />
    </div>
  );
}
