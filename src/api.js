const originUrl = "https://panda-market-api.vercel.app";

/**
 * 상품 검색 API
 * @param {Number} page 페이지 번호 (기본 : 1)
 * @param {Number} pageSize 페이지당 상품 수 (기본 : 10)
 * @param {String} orderBy recent 최신순(기본) / favorite 좋아요순
 * @param {String} keyword 검색 키워드
 * @returns 상품 리스트 객체 반환
 */
export async function getProducts(
  page = 1,
  pageSize = 12,
  orderBy = "recent",
  keyword = undefined
) {
  const url = new URL(originUrl + "/products");
  url.searchParams.append("page", page);
  url.searchParams.append("pageSize", pageSize);
  url.searchParams.append("orderBy", orderBy);
  keyword && url.searchParams.append("keyword", keyword);

  const res = await fetch(url.href);
  const data = await res.json();
  return data;
}
