import React, { useRef, useState } from "react";

const AddItem = () => {
  const [selectedPicture, setSelectedPicture] = useState(null);
  const fileInputRef = useRef(null);

  // div 클릭 시 파일 선택 창 열기
  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // input 클릭
    }
  };

  // 파일 선택 시 발생하는 이벤트 처리
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPicture(URL.createObjectURL(file)); // 선택된 파일을 미리보기로 설정
    }
    e.target.value = ""; // 파일 선택 후 초기화
  };

  // input의 기본 클릭 이벤트를 무효화해서 두 번 열리지 않도록 방지
  const preventDefaultClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full p-2 flex flex-col gap-y-3 lg:w-2/3 lg:justify-center">
        <h2 className="flex justify-between text-lg">
          상품 등록하기
          <button className="w-14 h-10 border rounded-lg text-slate-100 bg-[#9CA3AF]">
            등록
          </button>
        </h2>
        <div className="w-full h-32 sm:h-64">
          <div className="w-1/2 h-4/5 flex flex-col gap-y-2">
            <h3 className="text-base">상품 이미지</h3>
            <div className="flex w-full h-full gap-x-4">
              <div
                className="w-1/2 bg-slate-300 h-full relative flex justify-center items-center"
                onClick={handleDivClick}
              >
                <div className="flex flex-col justify-center items-center gap-y-2 text-[#9CA3AF]">
                  <div className="flex justify-center text-4xl">+</div>
                  <div className="font-light ">이미지 등록</div>
                </div>
                <input
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange} // 파일이 변경될 때 호출
                  onClick={preventDefaultClick} // input의 기본 클릭 이벤트를 방지
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
      </div>
    </div>
  );
};

export default AddItem;
