import Link from 'next/link';

export default function Home() {
  return ( //요구사항 1. 자유 게시판 페이지 주소는 “/boards”
    <> 
     <h1>판다마켓</h1>
     <Link href="/board">자유게시판</Link> 
    </>
  );
}