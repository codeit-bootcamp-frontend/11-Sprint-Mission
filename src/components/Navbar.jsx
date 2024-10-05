import "../../style/home.css";
{
  /* 기존 파일들은 어떻게 하죠...? 전부 리액트 컴퍼넌트로 바꿔야 하나요?
   */
}

function Navbar() {
  return (
    <div>
      <a href="/">
        <img
          id="header_logo"
          src="images/logos/panda.png"
          alt="판다마켓 헤더 로고"
        />
      </a>
      <nav>
        <ul>
          <li>
            <a href="freeboard.html">자유게시판</a>
          </li>
          <li>
            <a href="/items.html">중고마켓</a>
          </li>
        </ul>
      </nav>

      {/* 사용자 계정? 아이콘?에 대한 설명이 없어서 일단 임시로 로그인 버튼을 그대로 가져왔습니다. */}
      <a href="login.html" id="login" className="a_button">
        로그인
      </a>
    </div>
  );
}
