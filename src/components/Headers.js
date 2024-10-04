import { useState } from "react";
import ProfileImage from "./ProfileImage";
import Logo from "./Logo";
import Navigation from "./Navigation.js";
import Button from "./Button";

const Headers = (props) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div id='header'>
      <div className='container'>
        <Logo />
        <Navigation />
        {isLogin ? (
          <ProfileImage size={{ width: "4rem", height: "4rem" }} />
        ) : (
          <Button className='login' link={true} href='/login' style={"square blue"}>
            로그인
          </Button>
        )}
      </div>
    </div>
  );
};

export default Headers;
