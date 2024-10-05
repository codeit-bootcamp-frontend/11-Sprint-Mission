const originUrl = "https://panda-market-api.vercel.app";

/**
 * 상품 검색 API
 * @param {Number} page 페이지 번호 (기본 : 1)
 * @param {Number} pageSize 페이지당 상품 수 (기본 : 10)
 * @param {Boolean} favorite false : 최신순(기본) true : 인기순
 * @param {String} keyword 검색 키워드
 * @returns 상품 리스트 객체 반환
 */
export async function getProducts(
  page = 1,
  pageSize = 10,
  favorite = false,
  keyword = undefined
) {
  const url = new URL(originUrl + "/products");
  url.searchParams.append("page", page);
  url.searchParams.append("pageSize", pageSize);
  url.searchParams.append("orderBy", favorite ? "favorite" : "recent");
  keyword && url.searchParams.append("keyword", keyword);

  console.log(url.href);

  const res = await fetch(url.href);
  const data = await res.json();
  return data;
}
