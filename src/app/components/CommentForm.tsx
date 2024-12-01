import { useState } from 'react';

export default function CommentForm({
  setContent,
}: {
  setContent: (content: string) => void;
}) {
  const [comment, setComment] = useState<string>('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const commentContent = (
      form.elements.namedItem('comment') as HTMLTextAreaElement
    ).value;
    setContent(commentContent);
  };

  return (
    <>
      <form className="mt-10" onSubmit={handleSubmit}>
        <label htmlFor="comment" className="h3">
          댓글달기
        </label>
        <textarea
          id="comment"
          className="w-full h-[104px] text-gray-500 bg-gray-100 h-10 rounded-lg px-6 py-4 mt-4 resize-none focus:outline-none"
          placeholder="댓글을 입력해주세요"
          onChange={handleCommentChange}
        />
        <div className="flex justify-end">
          <button
            className="w-[74px] h-[42px] bg-blue text-white rounded-lg font-medium mt-4 disabled:bg-gray-400"
            disabled={!comment.trim()}
          >
            등록
          </button>
        </div>
      </form>
    </>
  );
}
