import React from "react";
import { ImgPath } from ".";

function UserIconInfo({ image = null, nickname, desc }) {
  return (
    <div className="ownerInfo">
      <img
        src={image ? image : `${ImgPath("/common/ic_user.png")}`}
        alt="productBottom"
      />
      <div className="ownerWrap">
        <span className="owner">{nickname}</span>
        <span className="update">{desc}</span>
      </div>
    </div>
  );
}

export default UserIconInfo;
