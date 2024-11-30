import Profile from "@/public/images/profile.svg";
import { Article } from "@/types/Types";
import { formatDate } from "date-fns";

interface ArticleInfoProps {
  article: Article;
}

const ArticleInfo = ({ article }: ArticleInfoProps) => {
  const formetDate = formatDate(article.createdAt, "yyyy. MM. dd");

  return (
    <div>
      <Profile width={24} heigt={24} />
      {article.writer.nickname} {formetDate}
    </div>
  );
};

export default ArticleInfo;
