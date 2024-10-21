import logo from "../assets/icons/logo.svg";
import profileIcon from "../assets/icons/profile.svg";

function Header() {
  return (
    <div>
      <div className="flex max-w-[1568px] mx-auto py-3 items-center ">
        <div className="flex items-center gap-2">
          <img className="hidden md:block" src={logo} alt="판다 로고" />
          <a className="font-bold text-xl md:text-2xl text-[#3692FF]">
            판다마켓
          </a>
        </div>
        <div className="flex justify-center items-center ml-2 gap-2 font-bold text-base md:text-lg text-[#4B5563] ">
          <a>자유게시판</a>
          <a>중고마켓</a>
        </div>
        <img className="ml-auto" src={profileIcon} alt="프로필 이미지" />
      </div>
      <div className="border-b border-b-gray-300 -mx-4 md:-mx-6 " />
    </div>
  );
}

export default Header;
