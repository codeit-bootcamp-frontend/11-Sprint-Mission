import Link from "next/link";
import { Article as ArticleType } from "@/types/article";
import { placeholderImage } from "@/constants/article";
import BestArticle from "@/components/boards/BestSection/BestArticle";
import NormalArticle from "@/components/boards/NormalSection/NormalArticle";
import likeIcon from "@icons/ic_like_heart.svg";

interface ArticleProps extends ArticleType {
  isBest?: boolean;
  isLoading?: boolean;
}

const Article = ({
  isBest = false,
  isLoading = false,
  ...articleProps
}: ArticleProps) => {
  const imageUrl = articleProps.image || placeholderImage;

  const commonProps = {
    ...articleProps,
    imageUrl,
    likeIcon,
    isLoading,
  };

  const content = isBest ? (
    <BestArticle {...commonProps} />
  ) : (
    <NormalArticle {...commonProps} />
  );

  return isLoading ? (
    content
  ) : (
    <Link
      href={`/boards/${articleProps.id}`}
      className="block transition-transform hover:scale-[1.01] w-full"
    >
      {content}
    </Link>
  );
};

export default Article;
