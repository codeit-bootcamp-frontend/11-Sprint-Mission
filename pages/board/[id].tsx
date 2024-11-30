import { getArticle } from "@/api/article.api";
import { Article } from "@/types/Article.type";
import Image from "next/image";
import styles from "@/styles/article.module.css";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import formatDate from "@/lib/formatDate";
import { getCommentListByArticleId } from "@/api/comment.api";
import { Comment, CommentList } from "@/types/Commnet.type";

export async function getServerSideProps(context: any) {
  const { id } = context.params;

  const article = await getArticle({ id });
  const initComments = await getCommentListByArticleId({
    articleId: id,
    limit: 10,
  });

  return {
    props: {
      article,
      initComments,
    },
  };
}

export default function ArticleDetail({
  article,
  initComments,
}: {
  article: Article;
  initComments: CommentList;
}) {
  const [comments, setComments] = useState(initComments);
  const [commentValue, setCommentVlaue] = useState("");

  const handleChangeComment = (value: string) => {
    setCommentVlaue(value);
  };

  const handleSubmitComment = () => {
    //
  };

  if (!article) return null;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrap}>
          <h2 className={styles.title}>{article.title}</h2>
          <Dropdown />
        </div>
        <div className={styles.wrap}>
          <div className={styles.info}>
            <div className={styles.profile}>
              <Image fill src="/images/profile.svg" alt="프로필" />
            </div>
            <span className={styles.writer}>{article.writer.nickname}</span>
            <span className={styles.createdAt}>
              {formatDate(article.createdAt)}
            </span>
          </div>
          <div className={styles.likeCount}>
            <div className={styles.heart}>
              <Image fill src="/images/ic_heart.svg" alt="좋아요" />
            </div>
            <span>{article.likeCount}</span>
          </div>
        </div>
      </header>
      <main className={styles.content}>{article.content}</main>
      <CommentForm
        value={commentValue}
        onChange={handleChangeComment}
        onSubmit={handleSubmitComment}
      />
      <CommentListWrap comments={comments} />
    </>
  );
}

interface CommentFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

function CommentForm({ value, onChange, onSubmit }: CommentFormProps) {
  const [valid, setValid] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  useEffect(() => {
    if (value.trim().length < 1) setValid(false);
    else setValid(true);
  }, [value]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={styles.fieldContent}>
        <label className={styles.label} htmlFor="comment">
          댓글달기
        </label>
        <textarea
          className={styles.inputContent}
          id="comment"
          name="content"
          placeholder="댓글을 입력해주세요"
          value={value}
          onChange={handleChange}
          required
        />
      </fieldset>
      <button className={styles.submitButton} type="submit" disabled={!valid}>
        등록
      </button>
    </form>
  );
}

function CommentListWrap({ comments }: { comments: CommentList }) {
  return (
    <div>
      {comments.list.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

function CommentItem({ comment }: { comment: Comment }) {
  if (!comment.content.trim()) return null;

  return (
    <div className={styles.CommentItem}>
      <div className={styles.commentMain}>
        <span className={styles.commentContent}>{comment.content}</span>
        <Dropdown />
      </div>
      <div className={styles.commentHeader}>
        <div className={styles.profile}>
          <Image fill src="/images/profile.svg" alt="프로필" />
        </div>
        <div className={styles.commentInfo}>
          <span className={styles.writer}>{comment.writer.nickname}</span>
          <span className={styles.createdAt}>
            {formatDate(comment.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

function Dropdown() {
  const [selectedDropdown, setSelecedDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { flag } = useOutsideClick(dropdownRef);

  const handleClickDropdown = () => setSelecedDropdown((prev) => !prev);

  const handleClickOption = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.dataset.option) return;
    // onChange(target.dataset.option as OrderBy);
  };

  useEffect(() => {
    setSelecedDropdown(!flag);
  }, [flag]);

  return (
    <div
      className={styles.Dropdown}
      onClick={handleClickDropdown}
      ref={dropdownRef}
    >
      <Image fill src="/images/ic_kebab.svg" alt="기능" />

      {selectedDropdown && (
        <div className={styles.optionWrap} onClick={handleClickOption}>
          <div className={styles.option} data-option="edit">
            수정하기
          </div>
          <div className={styles.option} data-option="delete">
            삭제하기
          </div>
        </div>
      )}
    </div>
  );
}
