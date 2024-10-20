import React from "react";

const DetailItemTag = ({ i }) => {
  return (
    <div className="bg-slate-200  text-xs h-5 border rounded-xl flex p-4 items-center relative">
      # {i}
    </div>
  );
};

export default DetailItemTag;
