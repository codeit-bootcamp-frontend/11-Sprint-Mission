import React from "react";
import profile from "../../assets/profile.svg";
const RightNav = () => {
  return (
    <div className="flex items-center p-2">
      <img className="h-6" src={profile} />
    </div>
  );
};

export default RightNav;
