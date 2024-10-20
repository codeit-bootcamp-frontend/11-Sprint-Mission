import React from "react";

const InquiryButton = ({ isActive }) => {
  return (
    <button
      type="submit"
      className={`w-14 h-10 border rounded-lg ${
        isActive
          ? "bg-blue-500 text-white"
          : "bg-slate-400 text-gray-200 cursor-not-allowed"
      }`}
      disabled={!isActive} // 비활성화 상태일 때 버튼을 클릭할 수 없게 함
    >
      등록
    </button>
  );
};

export default InquiryButton;
