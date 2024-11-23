// import React, { useEffect, useState } from "react";
// import { getDetailComments } from "../../../api/api";
// import ProfileImg from "../../../images/profile.png";
// import { ReactComponent as Kebab } from "../../../images/ic_kebab.svg";

// const CommentItem = ({ item }) => {
//   const authorInfo = item.writer;
//   const formattedTimestamp = formatUpdatedAt(item.updatedAt);

//   return (
//     <div>
//       <div className="commentContainer">
//         {/* 더보기 버튼 */}
//         <button className="kebobButton">
//           <Kebab className="kebab" />
//         </button>

//         <div className="commentContent">{item.content}</div>

//         <div className="userProfile">
//           <img
//             src={authorInfo.image || ProfileImg} // 프로필 사진 기본값 설정
//             alt={`${authorInfo.nickname}님의 프로필 사진`}
//             className="userProfileImage"
//           />

//           <div>
//             <span className="username">{authorInfo.nickname}</span>
//             <span className="timestamp">{formattedTimestamp}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommentItem;
