// import { useState } from "react";
import ProfileImage from "../components/ProfileImage";
import Logo from "./Logo";
import Navigation from "./Navigation.js.js";
// import Button from "../components/Button";

const Headers = (props) => {
  // const [isLogin, setIsLogin] = useState(true);

  return (
    <div id='header'>
      <div className='container'>
        <Logo />
        <Navigation />
        <ProfileImage size={{ width: "4rem", height: "4rem" }} />
        {/* {isLogin ? (
        ) : (
          <Button className='login' link={true} href='/login' styleType={"square blue"}>
            로그인
          </Button>
        )} */}
      </div>
    </div>
  );
};

export default Headers;
