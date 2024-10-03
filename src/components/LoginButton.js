import { Link } from "react-router-dom";

const LoginButton = (props) => {
  return (
    <div className='btn-login'>
      <Link to={"/login"} className='button square blue'>
        로그인
      </Link>
    </div>
  );
};

export default LoginButton;
