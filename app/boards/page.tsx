import { Suspense } from "react";
import AllPost from "../components/boards/AllPost";
import BestPost from "../components/boards/BestPost";

export default function boards() {
  return (
    <>
      <BestPost />
      <Suspense fallback={<div>로딩 중</div>}>
        {/* 이 부분에 suspense를 감싼 이유가 빌드 할 때 오류가 뜨더라고요...?
      멘토링 시간에 들었던 기억이 있어서 suspense가 어떤 역할인지는 알겠는데
      오류를 해결하려면 suspense를 감싸달라고 해서 사용했습니다!
      */}
        <AllPost />
      </Suspense>
    </>
  );
}
