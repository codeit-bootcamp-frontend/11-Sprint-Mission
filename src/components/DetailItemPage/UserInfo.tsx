import React from "react";
import { FormatDate } from "../../util/FormatDate";
import profile from "../../assets/image/size=large.png";

interface UserInfoProps {
  ownerNickname: string;
  createdAt: Date;
}

const UserInfo = ({ ownerNickname, createdAt }: UserInfoProps) => {
  return (
    <div className="user-box">
      <img className="user-profile" src={profile} alt="사용자 프로필 이미지" />
      <div>
        <p className="user-nickname">{ownerNickname}</p>
        <p className="created-time">{FormatDate(createdAt)}</p>
      </div>
    </div>
  );
};

export default UserInfo;
