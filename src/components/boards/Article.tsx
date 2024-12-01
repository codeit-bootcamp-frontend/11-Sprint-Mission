import Image from "next/image";
import Link from "next/link";
import bestBadge from "@images/img_best_badge.svg";
import likeIcon from "@icons/ic_like_heart.svg";
import { Article as ArticleType } from "@/types/article";
import formatDate from "@/utils/formatDate";

const Article = ({
  id,
  title,
  writer,
  likeCount,
  updatedAt,
  image,
  isBest = false,
}: ArticleType & { isBest?: boolean }) => {
  const imageUrl = image || "http://via.placeholder.com/500.jpg";

  return (
    <Link
      href={`/boards/${id}`}
      className="block transition-transform hover:scale-[1.01] w-full"
    >
      {isBest ? (
        <div
          className="relative bg-gray50 rounded-md shadow-md hover:shadow-lg transition-shadow
          w-[343px] h-[198px] 
          tablet:w-[340px] tablet:h-[198px] 
          pc:w-96 pc:h-[169px]"
        >
          <div className="absolute top-0 left-6">
            <Image
              src={bestBadge}
              alt="best article badge"
              width={102}
              height={30}
              quality={100}
            />
          </div>

          <div className="absolute top-[46px] h-[calc(100%-46px)] left-6 w-[calc(100%-48px)] flex flex-col justify-between items-start">
            <div className="flex justify-between w-full">
              <div className="text-[18px] pc:text-[20px] font-[600] leading-tight line-clamp-2 h-full">
                {title}
              </div>
              <div className="w-18 h-18 rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={`${title} thumbnail`}
                  width={72}
                  height={72}
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="flex justify-between w-full mb-4 text-gray500">
              <div className="flex items-center gap-2">
                <div className="truncate text-[#4B5563]">{writer.nickname}</div>
                <div className="flex items-center gap-1">
                  <Image
                    src={likeIcon}
                    alt="like icon"
                    width={16}
                    height={16}
                  />
                  <span>{likeCount.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-gray400">{formatDate(updatedAt)}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between w-full h-[138px] bg-[#FCFCFC]">
          <div className="flex justify-between">
            <div className="mt-1 ml-1 text-[18px] pc:text-[20px] font-[600]">
              {title}
            </div>
            <div className="w-18 h-18 rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={`${title} thumbnail`}
                width={72}
                height={72}
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex justify-between mb-6 ml-1">
            <div className="flex items-center gap-2">
              <div>
                <div></div> {/* 임시 프로필 */}
                <div className="text-[#4B5563]">{writer.nickname}</div>
              </div>
              <div className="text-gray400">{formatDate(updatedAt)}</div>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={likeIcon}
                alt="like icon"
                width={24}
                height={24}
              />
              <span className="text-">{likeCount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default Article;
