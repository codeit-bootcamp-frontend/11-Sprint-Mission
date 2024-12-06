import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/ic_logo.svg';
import google from '@/public/ic_google.svg';
import kakao from '@/public/ic_kakao.svg';

export default function Login() {
  return (
    <>
      <div className="join-page">
        <header>
          <div className="head">
            <Image src={logo} alt="로고" />
            <Link href="/" className="title">
              판다마켓
            </Link>
          </div>
        </header>
        <div className="join-content">
          <main>
            <div className="join-main">
              <div className="join">
                <form id="login-form" className="form" action="/site/items.html" method="GET">
                  <div className="email-form">
                    <label for="input-email" className="email-form__input">
                      이메일
                      <br />
                      <input id="input-email" className="input" name="email" type="email" placeholder="이메일을 입력해주세요" data-valid="false" />
                      <span className="invalid-text"></span>
                    </label>
                  </div>
                  <div className="password-form">
                    <label for="input-password" className="password-form__input">
                      비밀번호
                      <br />
                      <input
                        id="input-password"
                        className="input"
                        name="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        data-valid="false"
                      />
                      <span className="invalid-text"></span>
                    </label>
                  </div>
                  <button type="submit" id="login-button" className="button large-button" disabled>
                    로그인
                  </button>
                </form>
              </div>
            </div>
          </main>
          <aside>
            <div className="simple-auth">
              <div className="auth-content">
                간편 로그인하기
                <div className="auth-sns">
                  <Link href="https://www.google.com/" className="auth-sns__icon">
                    <Image src={google} alt="구글" />
                  </Link>
                  <Link href="https://www.kakaocorp.com/page/" className="auth-sns__icon">
                    <Image src={kakao} alt="카카오" />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
          <footer>
            <div className="to-us">
              <div className="us-message">판다마켓이 처음이신가요?</div>
              <Link href="/signup" className="us-link">
                회원가입
              </Link>
            </div>
          </footer>
        </div>
      </div>
      {/* <script type="module" src="/function/common-form.js"></script>
      <script type="module" src="/function/login.js"></script> */}
    </>
  );
}
