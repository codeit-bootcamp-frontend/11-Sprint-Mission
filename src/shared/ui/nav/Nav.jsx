import React from "react";
import logo from "../../assets/logo.svg";
import logoText from "../../assets/logoText.svg";
import profile from "../../assets/profile.svg";
import LeftNav from "./leftNav";
import RightNav from "./RightNav";

const Nav = () => {
  return (
    <div className="w-screen border-b border-gray-100 flex justify-between lg:p-3 lg:pl-48 lg:pr-48">
      <LeftNav />
      <RightNav />
    </div>
  );
};

export default Nav;
