import { Suspense } from "react";
import AllPost from "../components/boards/AllPost";
import BestPost from "../components/boards/BestPost";

export default function boards() {
  return (
    <>
      <BestPost />
      <Suspense fallback={<div>로딩 중</div>}>
        <AllPost />
      </Suspense>
    </>
  );
}
