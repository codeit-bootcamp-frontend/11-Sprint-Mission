import Image from "next/image";
import Badge from "@/assets/images/ui/img_badge.svg";
import Link from "next/link";
import Heart from "@/assets/images/icons/ic_heart.svg";
import styles from "@/styles/BoardsBestArticles.module.css";

// 일단 any 타입 지정
export default function BoardsBestArticles({ articles }: any) {
  return (
    <ul>
      <Image src={Badge} alt="Best Badge" />
      <li>
        {/* 베스트 게시글 클릭했을 때 해당 게시글로 이동했으면 좋겠다 싶어서 임의로 경로 설정 */}
        <Link href={`/articles/${articles.id}`}>
          <div>
            <p>{articles.title}</p>
            <Image
              src={articles.image}
              alt={articles.title}
              width={72}
              height={72}
            />
            <span>{articles.writer.nickname}</span>
            <div>
              <Image src={Heart} alt="좋아요 버튼" width={16} height={16} />
              <span>{articles.likecount}</span>
              <span>{articles.createdAt}</span>
            </div>
          </div>
        </Link>
      </li>
    </ul>
  );
}
