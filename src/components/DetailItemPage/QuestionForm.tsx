import React, { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postComments } from "../../api/api";

const QuestionForm = () => {
  const [question, setQuestion] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setQuestion(e.target.value);
  };

  // const mutation = useMutation({
  //   mutationFn: (content: string) => postComments(content),
  //   onSuccess: (data) => {
  //     alert("문의사항 등록이 완료되었습니다.");
  //     setQuestion("");
  //   },
  //   onError: () => {
  //     alert("문의사항 등록에 실패했습니다. 다시 시도해주세요");
  //   },
  // });

  // const handleSubmit = () => {
  //   if (!question) {
  //     alert("문의사항을 입력해주세요");
  //     return;
  //   }

  //   const newComment = {
  //     content: question,
  //   };
  //   mutation.mutate(content);
  // };

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
          <button
            className="question-register-button"
            disabled={!question}
            // onClick={handleSubmit}
          >
            등록
          </button>
        </div>
      </form>
    </section>
  );
};

export default QuestionForm;
