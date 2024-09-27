const pattern = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+/;

const emailInput = document.querySelector('#email-input');
const msg = document.querySelector('.emailMessage');
const errMsg = document.querySelector('.emailErrorMessage');

const passwordMessage = document.querySelector('.passwordMessage');
const passwordLengthError = document.querySelector('.passwordLengthError');

const passwordCheckInput = document.querySelector('#passwordCheck-input');
const passwordMismatchError = document.querySelector('.passwordMismatchError');

const loginBtn = document.querySelector('.loginBtn');

const nickNameInput = document.querySelector('#nickname-input');
const nickNameMessage = document.querySelector('.nickNameMessage');

const passwordInput = document.querySelector('#password-input');
const passwordToggleBtn = document.querySelector('.passwordToggleBtn');

const passwordCheckToggleBtn = document.querySelector('.passwordCheckToggleBtn');

const signupBtn = document.querySelector('.signupBtn');


// 이메일 형식 체크
function emailCheck() {
  // 이메일 input에 입력 값이 없는 경우
  const emailEmpty = emailInput.value == '';
  emailInput.classList.toggle('error', emailEmpty);
  msg.classList.toggle('show', emailEmpty);
  
  // 이메일 input에 입력 값은 있지만 이메일 형식에 맞지 않는 경우
  const emailValidation = !emailEmpty && !pattern.test(emailInput.value);
  errMsg.classList.toggle('show', emailValidation);
}


// 비밀번호 체크
function passwordCheck() {
  // 비밀번호 input에 입력 값이 없는 경우
  const passwordEmpty = passwordInput.value == '';
  passwordInput.classList.toggle('error', passwordEmpty);
  passwordMessage.classList.toggle('show', passwordEmpty);

  // 비밀번호 input에 입력 값은 있지만 8글자 미만인 경우
  const passwordLengthValidation = passwordInput.value.length < 8 && !passwordEmpty;
  passwordInput.classList.toggle('error', passwordLengthValidation);
  passwordLengthError.classList.toggle('show', passwordLengthValidation);



  // 반대 순서로 "비밀번호 확인" 먼저 입력 후 "비밀번호" 조건들에 맞게 입력 하면, "비밀번호 확인"의 에러 메시지가 사라지지 않는 문제,, 이 방법이 맞나...?
  // 비밀번호 체크하는 함수인데 아래 조건문이 들어가면 안되겠죠..?
  if (passwordInput.value == passwordCheckInput.value && passwordInput.value.length >= 8) {
    passwordCheckInput.classList.remove('error');
    passwordMismatchError.classList.remove('show');
  }
}


// 비밀번호 확인
function passwordConfirm() {
  const passwordMatching = passwordInput.value !== passwordCheckInput.value;
  passwordCheckInput.classList.toggle('error', passwordMatching);
  passwordMismatchError.classList.toggle('show', passwordMatching);
}


// 이메일, 비밀번호 입력 시 로그인 버튼 활성화 / 비활성화
function activateLoginBtnState () {
  const LoginFormValid = pattern.test(emailInput.value) && passwordInput.value.length >= 8;
  loginBtn.classList.toggle('activate', LoginFormValid);
  loginBtn.disabled = !LoginFormValid;
}


// 이메일, 비밀번호 입력 후 엔터키 누르면 로그인 버튼 클릭
function loginOnEnter(e) {
  if (e.keyCode == 13 && pattern.test(emailInput.value) && passwordInput.value.length >= 8) {
    loginBtn.click();
  }
}


// 닉네임 체크
function nickNameCheck() {
  const isNickNameEmpty = nickNameInput.value == '';
  nickNameInput.classList.toggle('error', isNickNameEmpty);
  nickNameMessage.classList.toggle('show', isNickNameEmpty);
}


// 비밀번호 - 아이콘(눈) 버튼 클릭 시 비밀번호 보이기 / 숨기기
function passwordToggleVisibility() {
  const isPasswordHidden = passwordInput.getAttribute('type') === 'password';
  passwordToggleBtn.classList.toggle('show', isPasswordHidden);
  passwordInput.setAttribute('type', isPasswordHidden ? 'text' : 'password'); 
}


// 비밀번호 확인 - 아이콘(눈) 버튼 클릭 시 비밀번호 보이기 / 숨기기
function passwordCheckToggleVisibility() {
  const isPasswordHidden = passwordCheckInput.getAttribute('type') === 'password';
  passwordCheckToggleBtn.classList.toggle('show', isPasswordHidden);
  passwordCheckInput.setAttribute('type', isPasswordHidden ? 'text' : 'password'); 
}


// 이메일, 닉네임, 비밀번호, 비밀번호 확인 입력 시 로그인 버튼 활성화 / 비활성화
function activateSignupBtnState() {
  const signupFormValid = pattern.test(emailInput.value) &&
                          nickNameInput.value !== '' &&
                          passwordInput.value.length >= 8 &&
                          passwordInput.value == passwordCheckInput.value;

  signupBtn.classList.toggle('activate', signupFormValid);
  signupBtn.disabled = !signupFormValid;
}


// 이메일, 닉네임, 비밀번호, 비밀번호 확인 입력 후 엔터키 누르면 로그인 버튼 클릭
function signupOnEnter(e) {
  if (
    e.keyCode == 13 &&
    pattern.test(emailInput.value) &&
    nickNameInput.value !== '' &&
    passwordInput.value.length >= 8 &&
    passwordInput.value == passwordCheckInput.value
  ) {
    signupBtn.click();
  }
}


export { 
  passwordToggleBtn,
  passwordCheckToggleBtn,
  emailInput, passwordInput,
  nickNameInput,
  passwordCheckInput,
  signupBtn,
  passwordToggleVisibility,
  passwordCheckToggleVisibility,
  emailCheck,
  passwordCheck,
  activateLoginBtnState,
  loginOnEnter,
  nickNameCheck,
  passwordConfirm,
  activateSignupBtnState,
  signupOnEnter
}