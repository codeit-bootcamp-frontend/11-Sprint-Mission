import Image from 'next/image';

export default function EmptyComment() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-[140px] h-[140px]">
          <Image
            fill
            src="/images/noComment.png"
            alt="댓글 없음"
            sizes="(max-width: 640px) 140px 140px"
          />
        </div>
        <span className="text-center text-gray-400 mt-4">
          아직 댓글이 없어요, <br />
          지금 댓글을 달아보세요!
        </span>
      </div>
    </>
  );
}
