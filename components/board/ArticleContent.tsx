import { Article } from "@/types/Types";
import Kebob from "@/public/images/ic_kebab.svg";
import ArticleInfo from "./ArticleInfo";
import Image from "next/image";

interface ArticleContentProps {
  article: Article;
}

const ArticleContent = ({ article }: ArticleContentProps) => {
  return (
    <div>
      <div>
        <h3>{article.title}</h3>

        <button>
          <Image src={Kebob} alt="kebob" width={24} height={24} />
        </button>

        <div>
          <ArticleInfo article={article} />
          {/* 하트 */}
        </div>
      </div>

      <div>{article.content}</div>
    </div>
  );
};

export default ArticleContent;
