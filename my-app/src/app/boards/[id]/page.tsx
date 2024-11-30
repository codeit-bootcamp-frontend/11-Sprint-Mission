import { Article, Comment } from "@/app/type/type";
import Image from "next/image";
import Link from "next/link";
import CommentPost from "@/app/components/CommnetPost";
// Article 데이터 가져오기
async function fetchArticle(articleId: string): Promise<Article | null> {
  const res = await fetch(
    `https://panda-market-api.vercel.app/articles/${articleId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

// 댓글 데이터 가져오기
async function fetchComments(articleId: string): Promise<Comment[]> {
  const res = await fetch(
    `https://panda-market-api.vercel.app/articles/${articleId}/comments?limit=10`
  );
  if (!res.ok) {
    throw new Error("댓글을 불러오는 데 실패했습니다.");
  }
  const data = await res.json();
  return data.list || [];
}

export default async function Page({ params }: { params: { id: string } }) {
  const article = await fetchArticle(params.id);
  const comments = await fetchComments(params.id);

  if (!article) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-4 pt-[24px] pl-4 pr-4 xl:max-w-[1200px] mx-auto">
      <div className="flex justify-between">
        <h1 className="text-[20px] font-bold">{article.title}</h1>
        <div className="flex flex-col gap-[2px]">
          <span className="w-[3px] h-[3px] bg-gray400 rounded-full"></span>
          <span className="w-[3px] h-[3px] bg-gray400 rounded-full"></span>
          <span className="w-[3px] h-[3px] bg-gray400 rounded-full"></span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <div className="w-[40px] h-[40px] relative">
            <Image src="/head/myPageIcon.png" fill alt="작성자아이콘" />
          </div>
          <p className="ml-4 mr-2 text-[14px]">{article.writer.nickname}</p>
          <p className="text-gray400 text-[14px]">
            {new Date(article.createdAt).toLocaleDateString("ko-KR")}
          </p>
        </div>
        <div className="text-gray400">|</div>
        <div className="flex justify-center items-center gap-[4px] w-[79px] h-[32px] border border-gray200 rounded-[35px]">
          <div className="w-[21px] h-[18px] relative">
            <Image src="/icon/like_icon.png" fill alt="좋아요" />
          </div>
          <p>{article.likeCount}</p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray200"></div>
      <p className="text-4">{article.content}</p>

      <div className="comment mt-6">
        <CommentPost />
        {comments.length === 0 ? (
          <div className="flex flex-col items-center">
            <div className="w-[140px] h-[140px] relative">
              <Image
                src="/icon/Img_comments_empty.png"
                fill
                alt="댓글이 없습니다."
              />
            </div>
            <div className="text-center mb-[40px]">
              <p className="text-gray400">아직 댓글이 없어요.</p>
              <p className="text-gray400">지금 댓글을 달아보세요!</p>
            </div>
            <Link
              className="w-[240px] h-[48px] bg-skyblue text-white rounded-[40px] flex justify-center items-center"
              href="/boards"
            >
              <p>목록으로 돌아가기</p>
              <div className="w-[24px] h-[24px] relative">
                <Image src="/icon/ic_back.png" fill alt="화살표" />
              </div>
            </Link>
          </div>
        ) : (
          <ul className="flex flex-col gap-4 mt-6">
            {comments.map((comment) => (
              <li key={comment.id} className="mb-4">
                <div className="flex justify-between">
                  <p className="text-[14px]">{comment.content}</p>
                  <div className="flex flex-col gap-[2px]">
                    <span className="w-[3px] h-[3px] bg-gray400 rounded-full"></span>
                    <span className="w-[3px] h-[3px] bg-gray400 rounded-full"></span>
                    <span className="w-[3px] h-[3px] bg-gray400 rounded-full"></span>
                  </div>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="w-[32px] h-[32px] relative">
                    <Image
                      src="/head/myPageIcon.png"
                      fill
                      alt={comment.writer.nickname}
                    />
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <p className="text-[12px] color-gray600">
                      {comment.writer.nickname}
                    </p>
                    <p className="text-[12px] text-gray400">
                      {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-gray200 mt-[8px]"></div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
