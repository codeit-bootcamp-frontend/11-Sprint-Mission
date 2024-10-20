import React from "react";
import InquiryButton from "../../../../features/addInquiry/InquiryButton";

const Inquiry = () => {
  return (
    <>
      {" "}
      <div className="w-full">문의하기</div>
      <textarea
        className="w-full h-32 p-2 border bg-slate-200 text-sm"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
      ></textarea>
      <div className="w-full flex justify-end">
        <InquiryButton />
      </div>
    </>
  );
};

export default Inquiry;
