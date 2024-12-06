import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/ic_logo.svg';
import google from '@/public/ic_google.svg';
import kakao from '@/public/ic_kakao.svg';

export default function Signup() {
  return (
    <>
        <div className="join-page">
          <header>
            <div className="head">
              <Image src={logo} alt="로고" />
              <Link href="/" classNameName="title">
                판다마켓
              </Link>
            </div>
          </header>
          <div className="join-content">
            <main>
              <div className="join-main">
                <div className="join">
                  <form id="signup-form" className="form" action="/site/signup.html" method="GET">
                    <div className="email-form">
                      <label for="signup-email" className="email-form__input">
                        이메일
                        <br />
                        <input id="signup-email" className="input" name="email" type="email" placeholder="이메일을 입력해주세요" data-valid="false" />
                        <span className="invalid-text"></span>
                      </label>
                    </div>
                    <div className="nickname-form">
                      <label for="signup-nickname" className="nickname-form__input">
                        닉네임
                        <br />
                        <input
                          id="signup-nickname"
                          className="input"
                          name="nickname"
                          type="text"
                          placeholder="닉네임을 입력해주세요"
                          data-valid="false"
                        />
                        <span className="invalid-text"></span>
                      </label>
                    </div>
                    <div className="password-form">
                      <label for="signup-password" className="password-form__input">
                        비밀번호
                        <br />
                        <input
                          id="signup-password"
                          className="input"
                          name="password"
                          type="password"
                          placeholder="비밀번호를 입력해주세요"
                          data-valid="false"
                        />
                        <span className="invalid-text"></span>
                      </label>
                    </div>
                    <div className="password-form">
                      <label for="checkout-password" className="password-form__input">
                        비밀번호 확인
                        <br />
                        <input
                          id="checkout-password"
                          className="input"
                          name="password"
                          type="password"
                          placeholder="비밀번호를 다시 한 번 입력해주세요"
                          data-valid="false"
                        />
                        <span className="invalid-text"></span>
                      </label>
                    </div>
                  </form>
                </div>
                <button type="submit" id="signup-button" className="button large-button" disabled>
                  회원가입
                </button>
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
                <div className="us-message">이미 회원이신가요?</div>
                <Link href="/login" className="us-link">
                  로그인
                </Link>
              </div>
            </footer>
          </div>
        </div>
        {/* <script type="module" src="/function/common-form.js"></script>
    <script type="module" src="/function/signup.js"></script> */}
    </>
  );
}
