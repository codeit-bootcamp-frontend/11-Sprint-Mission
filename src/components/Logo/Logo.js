import "./Logo.css";

import Main from "../../pages/main/MainPage";
function Logo() {
  return <a src={Main} className="LoginButton"></a>; // 메인홈으로 이동-새로고침되야할듯
}

export default Logo;
