import { Article } from "@/types/Types";
import Image from "next/image";
import Link from "next/link";
import ArticleInfo from "./ArticleInfo";

interface ArticleItemProps {
  article: Article;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  return (
    <>
      <Link href={`/board/${article.id}`}>
        <div>
          <h3>{article.title}</h3>
          {article.image && (
            <div>
              <div>
                <Image
                  fill
                  src={article.image}
                  alt={`${article.id}번 게시글 이미지`}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <ArticleInfo article={article} />
        </div>
      </Link>
    </>
  );
};

export default ArticleItem;
