"use client";

import BestSection from "@/components/boards/BestSection/BestSection";
import NormalSection from "@/components/boards/NormalSection/NormalSection";

export default function BoardsPage() {
  return (
    <div
      className="flex flex-col mx-auto
      w-[343px]
      tablet:w-[696px]
      pc:w-[1200px]"
    >
      <BestSection />
      <NormalSection />
    </div>
  );
}
