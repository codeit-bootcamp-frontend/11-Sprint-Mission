import Header from "@/components/common/Header";
import DetailArticle from "@/components/detail/DetailArticle";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  fetchArticleById,
  fetchInquiryById,
  postArticleComment,
} from "../api/articleApi";
import { ArticleCommentInterface, ArticleInterface } from "@/types/article";
import PrimaryButton from "@/components/common/PrimaryButton";
import DetailInquiry from "@/components/detail/DetailInquiry";
import InquiryEmpty from "@/components/detail/InquiryEmpty";
import BackIcon from "@/components/Icons/BackIcon";

const INITIAL_DETAILS: ArticleInterface = {
  id: 0,
  title: "",
  content: "",
  image: "",
  createdAt: "",
  updatedAt: "",
  likeCount: 0,
  writer: {
    id: 0,
    nickname: "",
  },
};

const INITIAL_COMMENTS: ArticleCommentInterface = {
  list: [],
  nextCursor: null,
};

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(INITIAL_DETAILS);
  const [comments, setComments] =
    useState<ArticleCommentInterface>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const { list, nextCursor } = comments;
  const endRef = useRef(null); // infinity scroll 구현을 위한 endPoint를 할당할 Ref

  const loadArticleById = useCallback((id: string) => {
    fetchArticleById(id).then((response) => setArticle(response));
  }, []);

  const loadInquiryById = useCallback(
    (id: string, nextCursor: string | null = null) => {
      fetchInquiryById(id, nextCursor).then(({ list, nextCursor }) => {
        setComments((prev) => ({
          list: [...prev.list, ...list],
          nextCursor,
        }));
      });
    },
    []
  );

  /**
   * 댓글 추가 핸들러
   * @param {*} e
   */
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!id) {
        throw new Error("Id is null");
      }
      const response = await postArticleComment({
        id: Number(id),
        content: newComment,
      });
      setComments((prev) => ({
        ...prev,
        list: [response, ...prev.list],
      }));
      setNewComment("");
    },
    [id, newComment]
  );

  /**
   * IntersectionObserver API를 사용한 inifinity scroll
   */
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries; // 감시 대상 : endRef
      if (entry.isIntersecting && nextCursor && id) {
        // 대상이 viewport에 들어왔을 때, nextCursor가 null이 아닌경우 다음 댓글 요청
        loadInquiryById(id.toString(), nextCursor);
      }
    },
    [id, nextCursor, loadInquiryById]
  );

  useEffect(() => {
    if (!id) return;
    loadArticleById(id.toString());
    loadInquiryById(id.toString());
  }, [id, loadArticleById, loadInquiryById]);

  /**
   * Intersection Obsever API를 사용해 endRef(.end-point)의 영역을 비동기 감시
   */
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null, // 감시 기준 : viewport
      threshold: 1.0, // 대상이 viewport에 완전히 노출될 때
    });
    const current = endRef.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleObserver]);
  return (
    <>
      <Header />
      <div className='page-detail'>
        <DetailArticle {...article} />
        <div className='article-inquiry-wrap'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='input_inquiry'>댓글달기</label>
            <textarea
              id='input_inquiry'
              value={newComment}
              placeholder='댓글을 입력해주세요.'
              onChange={({ target }) => setNewComment(target.value)}
            />
            <PrimaryButton type='submit' name='btn-add' disabled={!newComment}>
              등록
            </PrimaryButton>
          </form>
          {list.length > 0 ? (
            list.map(({ id, content, writer, updatedAt }) => (
              <DetailInquiry
                key={id}
                id={id.toString()}
                content={content}
                writer={writer}
                updatedAt={updatedAt}
                onUpdate={() => {}}
                onDelete={() => {}}
              />
            ))
          ) : (
            <InquiryEmpty isArticle={true} />
          )}
        </div>
        {nextCursor && <div className='end-point' ref={endRef} />}
        <Link href='/boards' className='navigate-to-items'>
          목록으로 돌아가기
          <span>
            <BackIcon />
          </span>
        </Link>
      </div>
    </>
  );
}

export default Detail;
