import React, { useState } from "react";
import InquiryButton from "../../../../features/addInquiry/InquiryButton";

const Inquiry = () => {
  const [text, setText] = useState(""); // textarea 내용을 추적하는 상태
  const handleTextChange = (e) => {
    setText(e.target.value); // 입력된 값으로 상태 업데이트
  };
  return (
    <>
      {" "}
      <div className="w-full">문의하기</div>
      <textarea
        className="w-full h-32 p-2 border bg-slate-200 text-sm"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        value={text} // textarea의 값은 상태값에 따라 변화
        onChange={handleTextChange} // 상태 업데이트 함수
      ></textarea>
      <div className="w-full flex justify-end">
        <InquiryButton isActive={text.trim() !== ""} />{" "}
        {/* 글이 있으면 활성화 */}
      </div>
    </>
  );
};

export default Inquiry;
