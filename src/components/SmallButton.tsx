import React, {ReactNode} from "react";
import "./SmallButton.css"

interface ButtonProp {
  children: ReactNode;
}

function SmallButton({ children }: ButtonProp) {
  return (
    <>
      <button className="small-button">
        <div className="small-btn-text">{children}</div>
      </button>
    </>
  );
}

export default SmallButton;
