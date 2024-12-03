import Image from "next/image";
import { BestItemData } from "../type/type";
import Link from "next/link";
export default function BestItem({
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
        <div className="lg:w-[384px] h-[169px] md:w-[340px] md:h-[198px] bg-gray50">
          <div className="pt-0 pr-6 pb-4 pl-6">
            <div className="flex justify-center items-center gap-[4px] w-[102px] h-[30px] bg-skyblue rounded-bl-2xl rounded-br-2xl">
              <div className="w-[16px] h-[16px] relative">
                <Image src="/icon/best_icon.png" fill alt="besticon" />
              </div>
              <p className="text-background">Best</p>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{title}</h2>
              <div className="w-[72px] h-[72px] relative rounded-lg border border-gray200">
                <Image src={image} fill alt={title} />
              </div>
            </div>
            <div className="flex items-center justify-between mt-[40px]">
              <div className="flex items-center gap-[4px]">
                <p className="text-sm text-gray-400">{writer.nickname}</p>
                <div className="flex items-center gap-[8px]">
                  <div className="w-[21px] h-[18px] relative">
                    <Image src="/icon/like_icon.png" fill alt="likeicon" />
                  </div>
                  <p className="text-sm text-gray-400">{likeCount}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
