import LOGO_PC from "../assets/logo.png";
import LOGO_MO from "../assets/mobiles/logo.png";

const Header = (props) => {
  return (
    <div id='header'>
      <div className='container'>
        <h1 className='logo'>
          <a href='/'>
            <picture>
              <source srcSet={LOGO_MO} media='(max-width: 767px)' />
              <img src={LOGO_PC} alt='로고' />
            </picture>
          </a>
        </h1>
        <div className='btn-login'>
          <a href='/pages/login.html' className='button square blue'>
            로그인
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
