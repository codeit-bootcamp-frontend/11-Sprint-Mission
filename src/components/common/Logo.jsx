import { Link } from "react-router-dom";
import LOGO_PC from "../../assets/logo.png";
import LOGO_MO from "../../assets/mobiles/logo.png";

const Logo = (props) => {
  return (
    <h1 className='logo'>
      <Link to={"/"}>
        <picture>
          <source srcSet={LOGO_MO} media='(max-width: 767px)' />
          <img src={LOGO_PC} alt='로고' />
        </picture>
      </Link>
    </h1>
  );
};

export default Logo;
