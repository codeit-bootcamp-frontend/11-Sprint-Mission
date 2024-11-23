import Link from 'next/link';

export default function Page() {
  return (
    <>
      <div className="flex justify-center">
        <Link href="https://sparkling-sorbet-9dae1e.netlify.app/">
          <button className="bg-blue text-gray-50 rounded-[120px] w-[240px] h-[48px] mt-20 text-xl hover:bg-blue-600">
            이전 프로젝트로 이동
          </button>
        </Link>
      </div>
    </>
  );
}
