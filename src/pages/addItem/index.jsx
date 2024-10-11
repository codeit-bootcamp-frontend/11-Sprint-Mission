import React, { useEffect, useRef, useState } from "react";

const AddItem = () => {
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productTag, setProductTag] = useState("");
  const [productTagsArray, setProductTagsArray] = useState([]);
  const [productsArray, setProductsArray] = useState([]); // product 배열 상태

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: productName,
      description: productDescription,
      price: productPrice,
      tag: [...productTagsArray],
      image: selectedPicture,
    };
    // product 배열에 새로운 상품 추가
    setProductsArray([...productsArray, newProduct]);

    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductTag("");
    setProductTagsArray([]);
    setSelectedPicture(null);
  };

  // 엔터를 눌렀을 때 태그를 추가
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (productTag.trim() !== "") {
        // 태그 배열에 추가
        setProductTagsArray([...productTagsArray, productTag.trim()]);
        setProductTag(""); // 입력 필드 초기화
      }
    }
  };
  // 태그 삭제 처리 함수
  const handleDeleteTag = (indexToDelete) => {
    setProductTagsArray(
      productTagsArray.filter((_, index) => index !== indexToDelete)
    );
  };
  // input의 기본 클릭 이벤트를 무효화해서 두 번 열리지 않도록 방지
  const preventDefaultClick = (e) => e.stopPropagation();

  /////
  const onChangeProductName = (e) => setProductName(e.target.value);
  const onChangeProductDescription = (e) =>
    setProductDescription(e.target.value);
  const onChangeProductPrcie = (e) => setProductPrice(e.target.value);
  const onChangeProductTag = (e) => setProductTag(e.target.value);

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
  console.log(productsArray);
  useEffect(() => {
    console.log("Current Tags:", productTagsArray);
  }, [productTagsArray]);
  return (
    <div className="w-full flex justify-center">
      <form className="w-full p-2 flex flex-col gap-y-2 lg:w-2/3 lg:justify-center">
        <h2 className="flex justify-between text-lg">
          상품 등록하기
          <button
            type="submit"
            disabled={!isButtonValid()}
            className={`w-14 h-10 border rounded-lg text-slate-100 ${formButtonBgc}`}
            onClick={handleSubmit}
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
                  <div className="flex justify-center items-center h-1/2 text-xs sm:text-base">
                    이미지 등록
                  </div>
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
            className="w-full  h-13 py-5 px-5 bg-slate-200 border rounded-lg text-sm"
            placeholder="상품명을 입력해주세요"
            value={productName}
            onChange={onChangeProductName}
          ></input>
        </div>
        <div className="flex flex-col gap-y-2">
          <h2>상품 소개</h2>
          <textarea
            className="w-full h-96 py-5 px-5 bg-slate-200 border rounded-lg text-sm"
            placeholder="상품 소개를 입력해주세요"
            value={productDescription}
            onChange={onChangeProductDescription}
          ></textarea>
        </div>
        <div className="flex flex-col gap-y-2">
          <h2>판매가격</h2>
          <input
            className="w-full  h-13 py-5 px-5 bg-slate-200 border rounded-lg text-sm"
            placeholder="판매 가격을 입력해주세요"
            value={productPrice}
            onChange={onChangeProductPrcie}
            type="number"
          ></input>
        </div>
        <div className="flex flex-col gap-y-2">
          <h2>태그</h2>
          <input
            className="w-full  h-13 py-5 px-5 bg-slate-200 border rounded-lg text-sm"
            placeholder="태그를 입력해주세요"
            value={productTag}
            onChange={onChangeProductTag}
            onKeyDown={handleKeyDown}
          ></input>
          <div className="flex flex-wrap gap-x-2 gap-y-2 ">
            {productTagsArray.map((tag, index) => (
              <div
                className="bg-slate-200  h-10 border rounded-xl flex  p-4  items-center relative"
                key={index}
              >
                {" "}
                <div>#{tag}</div>
                <button
                  type="button"
                  className="h-6 w-6 flex p-0 items-center justify-center border rounded-full bg-gray-400 text-xl text-gray-50 "
                  onClick={() => handleDeleteTag(index)}
                >
                  <div className="">x</div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
