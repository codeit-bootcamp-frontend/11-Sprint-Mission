import { useState } from 'react';

/**
 * 코멘트 입력폼 컴포넌트
 * @return {JSX}
 */
function CommentWriteForm() {
  const [comment, setComment] = useState('');

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('comment submit');
  };

  let disabled = false;
  const minLength = 5;
  disabled = comment.length < minLength;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment" className="font-semibold self-start">
        문의하기
      </label>
      <textarea
        className="input mt-2 mb-4 w-full"
        name=""
        id="comment"
        rows="3"
        value={comment}
        onChange={handleChange}
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
      />
      <div className="text-right">
        <button className="btn" type="submit" disabled={disabled}>
          등록
        </button>
      </div>
    </form>
  );
}

export default CommentWriteForm;
