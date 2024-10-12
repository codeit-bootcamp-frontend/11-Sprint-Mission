const SubmitSection = ({ isDisabled, formButtonBgc }) => {
  return (
    <h2 className="flex justify-between text-lg mb-10">
      상품 등록하기
      <button
        type="submit"
        disabled={isDisabled}
        className={`w-14 h-10 border rounded-lg text-slate-100 ${formButtonBgc} ${
          isDisabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        등록
      </button>
    </h2>
  );
};

export default SubmitSection;
