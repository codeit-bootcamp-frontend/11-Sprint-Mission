import Profile from "@/public/images/profile.svg";
import { Article } from "@/types/Types";
import { formatDate } from "date-fns";
import Image from "next/image";

interface ArticleInfoProps {
  article: Article;
}

const ArticleInfo = ({ article }: ArticleInfoProps) => {
  const formetDate = formatDate(article.createdAt, "yyyy. MM. dd");

  return (
    <div>
      <Image src={Profile} alt="프로필" width={24} height={24} />
      {article.writer.nickname} {formetDate}
    </div>
  );
};

export default ArticleInfo;
