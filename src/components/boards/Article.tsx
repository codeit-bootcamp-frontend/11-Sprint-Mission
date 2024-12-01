import Link from "next/link";
import { Article as ArticleType } from "@/types/article";
import { PLACEHOLDER_IMAGE } from "@/constants/article";
import BestArticle from "@/components/boards/BestSection/BestArticle";
import NormalArticle from "@/components/boards/NormalSection/NormalArticle";
import likeIcon from "@icons/ic_like_heart.svg";

interface ArticleProps extends ArticleType {
  isBest?: boolean;
}

const Article = ({ isBest = false, ...articleProps }: ArticleProps) => {
  const imageUrl = articleProps.image || PLACEHOLDER_IMAGE;

  const commonProps = {
    ...articleProps,
    imageUrl,
    likeIcon,
  };

  return (
    <Link
      href={`/boards/${articleProps.id}`}
      className="block transition-transform hover:scale-[1.01] w-full"
    >
      {isBest ? (
        <BestArticle {...commonProps} />
      ) : (
        <NormalArticle {...commonProps} />
      )}
    </Link>
  );
};

export default Article;
