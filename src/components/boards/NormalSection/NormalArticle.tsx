import Image from "next/image";
import { Article } from "@/types/article";
import formatDate from "@/utils/formatDate";
import { skeletonClass } from "@/styles/skeleton";

interface NormalArticleProps extends Omit<Article, "image"> {
  imageUrl: string;
  likeIcon: string;
  isLoading: boolean;
}

const NormalArticle = ({
  title,
  writer,
  likeCount,
  updatedAt,
  imageUrl,
  likeIcon,
  isLoading = false,
}: NormalArticleProps) => {
  const baseContainerClass =
    "flex flex-col justify-between w-full h-[138px] bg-[#FCFCFC]";

  if (isLoading) {
    return (
      <div className={baseContainerClass}>
        <div className="flex justify-between">
          {/* Title skeleton */}
          <div className="mt-1 ml-1 flex flex-col gap-2 w-[70%]">
            <div className={`${skeletonClass} h-6 w-full`} />
            <div className={`${skeletonClass} h-6 w-3/4`} />
          </div>
          {/* Thumbnail skeleton */}
          <div className={`${skeletonClass} w-[72px] h-[72px] rounded-lg`} />
        </div>

        <div className="flex justify-between mb-6 ml-1">
          <div className="flex items-center gap-2">
            {/* Nickname and date skeleton */}
            <div className={`${skeletonClass} w-20 h-5`} />
            <div className={`${skeletonClass} w-24 h-5`} />
          </div>
          {/* Like count skeleton */}
          <div className="flex items-center gap-2">
            <div className={`${skeletonClass} w-6 h-6 rounded-full`} />
            <div className={`${skeletonClass} w-12 h-5`} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={baseContainerClass}>
      <div className="flex justify-between">
        <h2 className="mt-1 ml-1 text-[18px] pc:text-[20px] font-[600]">
          {title}
        </h2>
        <div className="w-18 h-18 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={`${title} 라는 제목을 가진 게시글의 사진`}
            width={72}
            height={72}
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="flex justify-between mb-6 ml-1">
        <div className="flex items-center gap-2">
          <div className="text-[#4B5563]">{writer.nickname}</div>
          <time className="text-gray400">{formatDate(updatedAt)}</time>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={likeIcon}
            alt="좋아요 아이콘"
            width={24}
            height={24}
          />
          <span>{likeCount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default NormalArticle;
