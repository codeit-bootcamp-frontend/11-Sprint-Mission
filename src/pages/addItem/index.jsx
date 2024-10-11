import React, { useRef, useState } from "react";

const AddItem = () => {
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productTag, setProductTag] = useState("");
  const [productTagsArray, setProductTagsArray] = useState([]);

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

  const onChangeProductName = (e) => {
    // 프로덕트 네임바꾸는 함수
    setProductName(e.target.value);
  };

  const onChangeProductDescription = (e) => {
    // 프로덕트디스크립션 바꾸는 함수
    setProductDescription(e.target.value);
  };
  const onChangeProductPrcie = (e) => {
    // 프로덕트프라이스 바꾸는 함수
    setProductPrice(e.target.value);
  };

  const onChangeProductTag = (e) => {
    // 프로덕트프라이스 바꾸는 함수
    setProductTag(e.target.value);
  };
  const isButtonValid = () => {
    // form버튼 활성화 조건
    return (
      productName.trim() !== "" &&
      productDescription.trim() !== "" &&
      productPrice.trim() !== "" &&
      productTag.trim() !== ""
    );
  };
  const formButtonBgc = !isButtonValid() ? "bg-[#9CA3AF]" : "bg-blue-500";
  return (
    <div className="w-full flex justify-center">
      <form className="w-full p-2 flex flex-col gap-y-2 lg:w-2/3 lg:justify-center">
        <h2 className="flex justify-between text-lg">
          상품 등록하기
          <button
            type="submit"
            disabled={!isButtonValid()}
            className={`w-14 h-10 border rounded-lg text-slate-100 ${formButtonBgc}`}
          >
            등록
          </button>
        </h2>
        <div className="w-full h-60 sm:h-64">
          <div className="w-1/2 h-4/5 flex flex-col gap-y-2">
            <h3 className="text-base">상품 이미지</h3>
            <div className="flex w-full h-full gap-x-4">
              <div
                className="w-1/2 bg-slate-200 h-full relative flex justify-center items-center"
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
        <div className="flex flex-col gap-y-2">
          <h2 className="w-full">상품명</h2>
          <input
            className="w-full  h-[56px] py-[16px] px-[24px] bg-slate-200 border rounded-lg text-sm"
            placeholder="상품명을 입력해주세요"
            value={productName}
            onChange={onChangeProductName}
          ></input>
        </div>
        <div className="flex flex-col gap-y-2">
          <h2>상품 소개</h2>
          <textarea
            className="w-full  h-[282px] py-[16px] px-[24px] bg-slate-200 border rounded-lg text-sm"
            placeholder="상품 소개를 입력해주세요"
            value={productDescription}
            onChange={onChangeProductDescription}
          ></textarea>
        </div>
        <div className="flex flex-col gap-y-2">
          <h2>판매가격</h2>
          <input
            className="w-full  h-[56px] py-[16px] px-[24px] bg-slate-200 border rounded-lg text-sm"
            placeholder="판매 가격을 입력해주세요"
            value={productPrice}
            onChange={onChangeProductPrcie}
            type="number"
          ></input>
        </div>
        <div className="flex flex-col gap-y-2">
          <h2>태그</h2>
          <input
            className="w-full  h-[56px] py-[16px] px-[24px] bg-slate-200 border rounded-lg text-sm"
            placeholder="태그를 입력해주세요"
            value={productTag}
            onChange={onChangeProductTag}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
