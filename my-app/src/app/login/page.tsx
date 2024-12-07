import Image from "next/image";
import Link from "next/link";
export default function login() {
  return (
    <>
      <div className="mt-[80px]">
        <div className="pl-[16px] pr-[16px]">
          <div className="w-full">
            <Link
              className="w-full flex items-center justify-center gap-[11px]"
              href={"/"}
            >
              <div className="w-full h-auto max-w-[51px]">
                <Image
                  src="/head/logo_face.png"
                  alt="로고"
                  layout="responsive"
                  width={104}
                  height={105}
                />
              </div>
              <div className="w-full h-auto max-w-[133px]">
                <Image
                  src="/head/logo_txt.png"
                  alt="로고"
                  layout="responsive"
                  width={259}
                  height={64}
                />
              </div>
            </Link>
          </div>
          <form className="mt-[60px]" action="/items.html">
            <div className="w-[343px] flex flex-col gap-[16px]">
              <div className="flex flex-col">
                <label className="mb-[8px]" htmlFor="pandaEmail">
                  이메일
                </label>
                <input
                  className="w-full h-[56px] bg-gray100 pl-[24px] rounded-[12px]"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  name="useremail"
                  id="pandaEmail"
                  required
                />
                <div id="e-error" className="error-message"></div>
              </div>
              <div className="flex flex-col">
                <label className="mb-[8px]" htmlFor="pandaPassword">
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    className="w-full h-[56px] bg-gray100 pl-[24px] rounded-[12px]"
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    name="userpassword"
                    id="pandaPassword"
                    required
                  />
                  <div className="absolute top-1/2 right-6 w-[22px] h-[19px] transform -translate-y-1/2 ">
                    <div className="w-full h-auto max-w-[22px] absolute opacity-1 pointer-events-auto">
                      <Image
                        src="/icon/visibility.png"
                        alt="클릭시비밀번호보기"
                        layout="responsive"
                        width={22}
                        height={19}
                      />
                    </div>
                    <div className="w-full h-auto max-w-[22px] absolute opacity-0 pointer-events-none">
                      <Image
                        src="/icon/visible.png"
                        alt="클릭시비밀번호숨기기"
                        layout="responsive"
                        width={22}
                        height={19}
                      />
                    </div>
                  </div>
                </div>
                <div id="p-error" className="error-message"></div>
              </div>
              <button
                type="submit"
                id="loginButton"
                className="w-full h-[56px] text-center text-background text-[20px] text-gray100 bg-gray400 rounded-[40px]"
                disabled
              >
                로그인
              </button>

              <div className="flex justify-between items-center w-full h-[74px] bg-mainbg rounded-[8px] pl-[24px] pr-[24px]">
                <p className="w-full">간편 로그인하기</p>
                <div className="w-full flex justify-end gap-[16px]">
                  <div className="w-[42px] h-[42px] rounded-full relative bg-background">
                    <Link
                      className="w-[22px] h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      href="https://www.google.com/"
                    >
                      <Image
                        src="/icon/google.png"
                        alt="구글로고"
                        layout="responsive"
                        width={22}
                        height={22}
                      />
                    </Link>
                  </div>
                  <div className="w-[42px] h-[42px] rounded-full relative bg-background">
                    <Link
                      className="w-[22px] h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      href="https://www.kakaocorp.com/page/"
                    >
                      <Image
                        src="/icon/kakao.png"
                        alt="카카오톡로고"
                        layout="responsive"
                        width={26}
                        height={24}
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-[4px]">
                <span className="text-[14px]">판다마켓이 처음이신가요?</span>
                <Link className="text-skyblue" href={"/signup"}>
                  회원가입
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
