import React, { useRef } from "react";

const ImageUploader = ({ selectedPicture, onFileChange }) => {
  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 클릭 시 파일 선택창을 엽니다.
    }
  };

  const preventDoubleClick = (e) => {
    e.stopPropagation(); // 중복 클릭 방지
  };

  return (
    <div className="w-full h-60 sm:h-64">
      <div className="w-full h-full flex flex-col gap-y-2 sm:w-1/2 sm:h-4/5">
        <h3 className="text-base">상품 이미지</h3>
        <div className="flex w-full h-full gap-x-4">
          <div
            className="w-1/2 bg-slate-200 h-full relative flex justify-center items-center"
            onClick={handleDivClick}
          >
            <div className="flex flex-col justify-center items-center gap-y-2 text-[#9CA3AF]">
              <div className="flex justify-center text-4xl">+</div>
              <div className="flex justify-center items-center h-1/2 text-xs sm:text-base">
                이미지 등록
              </div>
            </div>
            <input
              className="absolute inset-0 opacity-0 cursor-pointer"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={onFileChange} // 파일 선택 시 호출되는 함수
              onClick={preventDoubleClick} // 중복클릭 방지
            />
          </div>
          <div className="w-1/2 h-full border rounded-lg">
            {selectedPicture && (
              <img
                className="w-full h-full border rounded-lg"
                src={selectedPicture}
                alt="선택된 이미지"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
