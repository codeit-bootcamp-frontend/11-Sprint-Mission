import { useState } from 'react';
import './CommentForm.css';

type CommentFormProps = {
  onSubmit: (content: string) => void;
};

function CommentForm({ onSubmit }: CommentFormProps) {
  const [content, setContent] = useState('');
  const isValidContent = content.trim();

  const handleSubmit = () => {
    if (!isValidContent) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <div className="comment-form">
      <h2>문의하기</h2>
      <textarea
        className="inquiry-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.

"
      ></textarea>
      <button
        className={`submit-button ${isValidContent ? 'active' : ''}`}
        onClick={handleSubmit}
        disabled={!isValidContent}
      >
        등록
      </button>
    </div>
  );
}

export default CommentForm;
