"use client";
import { useState, useEffect } from "react";
import BestItem from "../components/BestItem";
import SearchBar from "../components/SearchBar";
import AllItem from "../components/AllItem";
import { BestItemData } from "../type";

async function fetchBestBoards(
  page = 1,
  pageSize = 3,
  orderBy = "like",
  keyword = ""
) {
  const url = `https://panda-market-api.vercel.app/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("오류가 발생했습니다.");
  }
  return await res.json();
}

export default function Page() {
  const [bestBoards, setBestBoards] = useState<BestItemData[]>([]);
  const [allBoards, setAllBoards] = useState<BestItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(3);
  const [orderBy, setOrderBy] = useState<string>("recent");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 375) {
        setPageSize(1); // 모바일
      } else if (width <= 768) {
        setPageSize(2); // 태블릿
      } else {
        setPageSize(3); // 데스크탑
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // "최신순" 또는 "좋아요순" 클릭 시 orderBy 상태 업데이트
  const handleSortChange = (orderBy: string) => {
    setOrderBy(orderBy);
  };

  useEffect(() => {
    const loadBestBoards = async () => {
      try {
        const data = await fetchBestBoards(1, pageSize, "like");
        setBestBoards(data?.list || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };
    loadBestBoards();
  }, [pageSize]);

  // 모든 게시글 로드 (10개 이상)
  useEffect(() => {
    const loadAllBoards = async () => {
      try {
        const data = await fetchBestBoards(1, 10, orderBy, searchKeyword);
        setAllBoards(data?.list || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      }
    };
    loadAllBoards();
  }, [orderBy, searchKeyword]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="w-full max-w-[1200px] mx-auto pt-4 pb-0 px-4">
      <h3 className="text-lg font-bold mb-[16px]">베스트 게시글</h3>
      <div className="lg:flex md:flex justify-between gap-[16px]">
        {bestBoards.map((item) => (
          <BestItem key={item.id} {...item} />
        ))}
      </div>
      <div className="mt-[24px]">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">게시글</h3>
          <button className="w-[88px] h-[42px] text-background bg-skyblue rounded-lg">
            글쓰기
          </button>
        </div>
        <SearchBar
          onSearch={setSearchKeyword}
          onSortChange={handleSortChange}
        />
        {allBoards.map((item) => (
          <AllItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
