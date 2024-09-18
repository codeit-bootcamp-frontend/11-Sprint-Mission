## 요구사항
- Github에 PR(Pull Request)을 만들어서 미션을 제출합니다.
- Netlify에 파일 배포가 아닌 포크한 Github 레포지토리로 연결합니다.
- 피그마 디자인에 맞게 페이지를 만들어 주세요.
- React와 같은 UI 라이브러리를 사용하지 않고 진행합니다.

### 기본
- [x] 아래로 스크롤 해도 상단 네비게이션 바(Global Navigation Bar)가 최상단에 고정됩니다.
로그인 페이지, 회원가입 페이지 공통
- [x] “판다마켓" 로고 클릭 시 루트 페이지(“/”)로 이동합니다.
- [x] 로그인 페이지, 회원가입 페이지 모두 로고 위 상단 여백이 동일합니다.
- [x] input 요소에 focus in 일 때, 테두리 색상은 #3692FF입니다.
- [x] input 요소에 focus out 일 때, 테두리는 없습니다.
- [x] SNS 아이콘들은 클릭시 각각 실제 서비스 홈페이지로 이동합니다.
로그인 페이지
- [x] “회원가입”버튼 클릭 시 “/signup” 페이지로 이동합니다.
- [x] “로그인”버튼 클릭 시 “/login” 페이지로 이동합니다.

### 심화
- [x] palette에 있는 color값들을 css 변수로 등록하고 사용해 주세요.
- [x] 비밀번호 input 요소 위에 비밀번호를 확인할 수 있는 아이콘을 추가해 주세요.


## 주요 변경사항
- 로그인/회원가입 페이지의 모든 input을 채웠는지 확인하고 만족하면 로그인 버튼색 변경
- 로그인/회원가입 페이지 submit 버튼 활성화/비활성화 시 커서 스타일 pointer/no-drop
- 비밀번호와 비밀번호 확인의 값이 일치/불일치 할 때 경고문구 출력
- 모든 조건을 충족시키지 않으면 폼 전송 불가

## 스크린샷

![Login Page](https://millennium00forum1.s3.ap-northeast-2.amazonaws.com/screencapture-127-0-0-1-5500-views-login-html-2024-09-10-02_17_03.png-1725907258686)
![Signup Page](https://millennium00forum1.s3.ap-northeast-2.amazonaws.com/screencapture-127-0-0-1-5500-views-signup-html-2024-09-10-02_18_00.png-1725907263851)
![Compare PW](https://millennium00forum1.s3.ap-northeast-2.amazonaws.com/screencapture-127-0-0-1-5500-views-signup-html-2024-09-10-03_44_55.png-1725907594823)
![Submit Success](https://millennium00forum1.s3.ap-northeast-2.amazonaws.com/scshot-panda.png-1725907859720)

## 멘토에게
- js에서 전역 변수를 어느 정도까지 선언하는 것이 좋을지 판단 방법을 알고 싶습니다.
- 셀프 코드 리뷰를 통해 질문 이어가겠습니다.
