import ProfileImage from "../components/common/ProfileImage";
import Logo from "../components/common/Logo";
import Navigation from "./Navigation";

const Headers = (props) => {
  return (
    <div id="header">
      <div className="container">
        <Logo />
        <Navigation />
        <ProfileImage size={{ width: "4rem", height: "4rem" }} />
      </div>
    </div>
  );
};

export default Headers;
