/**
 * 
 * @returns 
 * @description
 * 
 * 1. 기본
 * - [x] 자유 게시판 페이지 주소는 “/boards” 입니다.
 * - [] 전체 게시글에서 드롭 다운으로 “최신 순” 또는 “좋아요 순”을 선택해서 정렬을 할 수 있습니다.
 * - [] 게시글 목록 조회 api를 사용하여 베스트 게시글, 게시글을 구현합니다.
 * - [] 게시글 title에 검색어가 일부 포함되면 검색이 됩니다.
 2. 심화
 * - [] 반응형으로 보여지는 베스트 게시판 개수를 다르게 설정할때 서버에 보내는 pageSize값을 적절하게 설정합니다.
 * - [] next의 prefetch 기능을 사용해봅니다.
 */

// export async function getStaticProps() {
//   const res = await axios.get("/articles");
//   const articles = res.data.results ?? [];
// }

export default function Home() {
  return <></>;
}
