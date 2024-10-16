import React from "react";
import DropDownInquiry from "./DropDownInquiry";
import { calculateGapHour } from "utils/formatDate";

function DetailInquiry({ content, writer, updatedAt }) {
  return (
    <div className="content-inquiry">
      <DropDownInquiry />
      <div className="inquiry-comment">
        <p>{content}</p>
        <textarea name="inquiry_comment" id="inquiry_comment" />
      </div>
      <div className="inquiry-footer">
        <div className="writer-icon">
          <img src="/images/icons/ic_user_login.svg" alt={writer.nickname} />
        </div>
        <div>
          <div className="writer-name">{writer.nickname}</div>
          <div className="date-update">{calculateGapHour(updatedAt)}</div>
        </div>
      </div>
    </div>
  );
}

export default DetailInquiry;
