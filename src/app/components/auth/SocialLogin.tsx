import Image from 'next/image';

export default function SocialLogin() {
  return (
    <>
      <div className="w-full h-[74px] bg-skyBlue rounded-lg flex justify-between p-6 my-6">
        <span className="text-gray-900">간편 로그인하기</span>
        <div className="flex gap-4 items-center">
          <div className="relative w-10 h-10">
            <Image
              fill
              className="cursor-pointer"
              src="/images/google.svg"
              alt="구글 로고"
              sizes="(max-width: 640px) 40px, 40px"
            />
          </div>
          <div className="relative w-10 h-10">
            <Image
              fill
              className="cursor-pointer"
              src="/images/kakaotalk.svg"
              alt="카카오톡 로고"
              sizes="(max-width: 640px) 40px, 40px"
            />
          </div>
        </div>
      </div>
    </>
  );
}
