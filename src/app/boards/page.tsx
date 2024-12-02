"use client";

import BestSection from "@/components/boards/BestSection/BestSection";
import NormalSection from "@/components/boards/NormalSection/NormalSection";

const containerStyles =
  "flex flex-col mx-auto w-[343px] tablet:w-[696px] pc:w-[1200px]";

export default function BoardsPage() {
  return (
    <div className={containerStyles}>
      <BestSection />
      <NormalSection />
    </div>
  );
}
