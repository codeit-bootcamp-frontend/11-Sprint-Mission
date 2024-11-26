// import React, { useState } from "react";
// import DetailComment from "./DetailComment";

// function DetailInput({ productId }) {
//   const [inputValue, setInputValue] = useState("");

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handlePostComment = () => {};

//   return (
//     <div>
//       <p>문의하기</p>
//       <textarea
//         value={inputValue}
//         onChange={handleInputChange}
//         placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
//       />
//       <button onChange={handlePostComment} disabled={!inputValue}>
//         등록
//       </button>
//       <DetailComment productId={productId} />
//     </div>
//   );
// }

// export default DetailInput;
