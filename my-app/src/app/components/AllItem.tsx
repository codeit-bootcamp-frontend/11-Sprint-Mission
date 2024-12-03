import Image from "next/image";
import { BestItemData } from "../type/type";
import Link from "next/link";

export default function AllItem({
  id,
  title,
  writer,
  likeCount,
  createdAt,
  image,
}: BestItemData) {
  return (
    <>
      <Link href={`/boards/${id}`}>
        <div className="w-full h-[136px] border-b border-gray-300 mt-[16px]">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{title}</h2>
              <div className="w-[72px] h-[72px] relative rounded-lg border border-gray200">
                <Image src={image} fill alt={title} />
              </div>
            </div>
            <div className="flex items-center justify-between mt-[15px] mb-[24px]">
              <div className="flex items-center gap-[4px]">
                <div className="w-[24px] h-[24px] relative">
                  <Image src="/head/myPageIcon.png" fill alt="myPageIcon" />
                </div>
                <p className="text-sm text-gray-400">{writer.nickname}</p>
                <p className="text-sm text-gray-400">
                  {new Date(createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-[8px]">
                <div className="w-[21px] h-[18px] relative">
                  <Image src="/icon/like_icon.png" fill alt="likeicon" />
                </div>
                <p className="text-sm text-gray-400">{likeCount}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
