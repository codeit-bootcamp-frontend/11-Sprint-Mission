import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>판다마켓</h1>
      <Link href="/boards">자유게시판</Link>
    </div>
  );
}
