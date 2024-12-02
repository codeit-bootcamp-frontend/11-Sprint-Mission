import Image from "next/image";
import bestBadge from "@images/img_best_badge.svg";
import { Article } from "@/types/article";
import formatDate from "@/utils/formatDate";
import { skeletonClass } from "@/styles/skeleton";

interface BestArticleProps extends Omit<Article, "image"> {
  imageUrl: string;
  likeIcon: string;
  isLoading?: boolean;
}

const BestArticle = ({
  title,
  writer,
  likeCount,
  updatedAt,
  imageUrl,
  likeIcon,
  isLoading = false,
}: BestArticleProps) => {
  const baseContainerClass =
    "relative bg-gray50 rounded-md shadow-md hover:shadow-lg transition-shadow w-[343px] h-[198px] tablet:w-[340px] tablet:h-[198px] pc:w-96 pc:h-[169px]";

  if (isLoading) {
    return (
      <div className={baseContainerClass}>
        <div className="absolute top-0 left-6">
          {/* Best badge skeleton */}
          <div className={`${skeletonClass} w-[102px] h-[30px]`} />
        </div>
        <div className="absolute top-[46px] h-[calc(100%-46px)] left-6 w-[calc(100%-48px)] flex flex-col justify-between items-start">
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-2 w-[70%]">
              {/* Title skeleton */}
              <div className={`${skeletonClass} h-6 w-full`} />
              <div className={`${skeletonClass} h-6 w-3/4`} />
            </div>
            {/* Thumbnail skeleton */}
            <div className={`${skeletonClass} w-[72px] h-[72px] rounded-lg`} />
          </div>

          <div className="flex justify-between w-full mb-4">
            <div className="flex items-center gap-2">
              {/* Nickname and date skeleton */}
              <div className={`${skeletonClass} w-20 h-5`} />
              <div className={`${skeletonClass} w-16 h-5`} />
            </div>
            {/* Like count skeleton */}
            <div className={`${skeletonClass} w-24 h-5`} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={baseContainerClass}>
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
          <h2 className="text-[18px] pc:text-[20px] font-[600] leading-tight line-clamp-2 h-full">
            {title}
          </h2>
          <div className="w-18 h-18 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={`${title} 라는 제목을 가진 베스트 게시글의 사진`}
              width={72}
              height={72}
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex justify-between w-full mb-4 text-gray500">
          <div className="flex items-center gap-2">
            <span className="truncate text-[#4B5563]">{writer.nickname}</span>
            <div className="flex items-center gap-1">
              <Image
                src={likeIcon}
                alt="좋아요 아이콘"
                width={16}
                height={16}
              />
              <span>{likeCount.toLocaleString()}</span>
            </div>
          </div>
          <time className="text-gray400">{formatDate(updatedAt)}</time>
        </div>
      </div>
    </div>
  );
};

export default BestArticle;
