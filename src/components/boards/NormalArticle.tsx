import Image from "next/image";
import { Article } from "@/types/article";
import formatDate from "@/utils/formatDate";

interface NormalArticleProps extends Omit<Article, "image"> {
  imageUrl: string;
  likeIcon: string;
}

const NormalArticle = ({
  title,
  writer,
  likeCount,
  updatedAt,
  imageUrl,
  likeIcon,
}: NormalArticleProps) => {
  return (
    <div className="flex flex-col justify-between w-full h-[138px] bg-[#FCFCFC]">
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
