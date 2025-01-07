"use client";

import BestSection from "@/components/boards/BestSection/BestSection";
import NormalSection from "@/components/boards/NormalSection/NormalSection";

export default function BoardsPage() {
  return (
    <div className="container-styles">
      <BestSection />
      <NormalSection />
    </div>
  );
}
