import ProfileImage from "../components/common/ProfileImage";
import Logo from "../components/common/Logo";
import Navigation from "./Navigation";

const Headers = (props) => {
  return (
    <div id="header">
      <div className="container">
        <Logo />
        <Navigation />
        <ProfileImage />
      </div>
    </div>
  );
};

export default Headers;
