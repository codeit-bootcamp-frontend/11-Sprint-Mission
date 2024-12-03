import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
      <div className="relative w-16 h-16 animate-spin">
        <Image
          fill
          src="/images/loading.png"
          alt="로딩 중"
          sizes="(max-width: 640px) 3rem 3rem"
        />
      </div>
    </div>
  );
}
