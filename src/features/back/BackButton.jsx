import React from "react";
import { Link } from "react-router-dom";
import backButton from "../../shared/assets/back.svg";

const BackButton = () => {
  return (
    <div className="mt-10 flex justify-center mb-24 ">
      <Link to="/items">
        <div className="bg-[#3692FF]  text-sm text-white p-3 flex items-center gap-x-2 rounded-2xl">
          <div>목록으로 돌아가기</div>{" "}
          <div>
            {" "}
            <img src={backButton}></img>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BackButton;
