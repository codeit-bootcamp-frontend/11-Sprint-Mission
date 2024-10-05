import React from "react";

import LeftNav from "./LeftNav";
import RightNav from "./RightNav";

const Nav = () => {
  return (
    <div className="w-full border-b border-gray-100 flex justify-between lg:p-3 lg:pl-48 lg:pr-48">
      <LeftNav />
      <RightNav />
    </div>
  );
};

export default Nav;
