import Image from 'next/image';
import Link from 'next/link';

export default function AuthLogo() {
  return (
    <>
      <div className="relative w-[380px] h-[120px] mb-10 mx-auto">
        <Link href="/">
          <Image
            fill
            src="/images/logo.svg"
            alt="로고"
            sizes="(max-width: 640px) 380px, 120px"
          />
        </Link>
      </div>
    </>
  );
}
