import heartIcon from "../../../../assets/icons/heart.svg";

function BestCard() {
  return (
    <div>
      <img
        src="https://www.fitpetmall.com/wp-content/uploads/2023/10/image-26.png"
        className="rounded-2xl w-[343px] h-[343px]"
      />
      <div className="flex flex-col gap-2">
        <p className="text-[#1F2937] font-medium text-sm">판매제목</p>
        <p className="text-[#1F2937] font-bold text-base">가격</p>
        <div className="flex items-center gap-1">
          <img src={heartIcon} alt="찜버튼 이미지" />
          <p className="text-[#4B5563] text-xs font-medium">찜버튼</p>
        </div>
      </div>
    </div>
  );
}

export default BestCard;
