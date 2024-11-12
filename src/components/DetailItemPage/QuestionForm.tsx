import React, { ChangeEvent, useState } from "react";

const QuestionForm = () => {
  const [question, setQuestion] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setQuestion(e.target.value);
  };

  return (
    <section className="question-container">
      <p className="question-header">문의하기</p>
      <form>
        <label htmlFor="question-input"></label>
        <textarea
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          id="question-input"
          name="question"
          onChange={handleChange}
        ></textarea>
        <div className="button-box">
          <button className="question-register-button" disabled={!question}>
            등록
          </button>
        </div>
      </form>
    </section>
  );
};

export default QuestionForm;
