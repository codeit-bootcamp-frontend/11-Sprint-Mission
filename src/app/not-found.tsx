import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">페이지를 찾을 수 없습니다</h2>
      <p className="mb-4">요청하신 페이지가 존재하지 않습니다.</p>
      <Link
        href="/"
        className="text-primary_100 hover:underline"
      >
        메인페이지로 돌아가기
      </Link>
    </div>
  );
}
