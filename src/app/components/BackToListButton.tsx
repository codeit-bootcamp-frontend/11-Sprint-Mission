import Link from 'next/link';
import Image from 'next/image';

export default function BackToListButton() {
  return (
    <>
      <div className="flex justify-center items-center mt-12">
        <Link href="/board">
          <button className="w-[240px] h-12 rounded-full bg-blue text-white text-lg flex justify-center items-center gap-2">
            목록으로 돌아가기
            <div className="relative w-6 h-6">
              <Image
                fill
                src="/images/back.png"
                alt="돌아가기"
                sizes="(max-width: 640px) 24px, 24px"
              />
            </div>
          </button>
        </Link>
      </div>
    </>
  );
}
