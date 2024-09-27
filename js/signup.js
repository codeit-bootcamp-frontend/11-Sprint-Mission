import {
  passwordToggleBtn,
  passwordCheckToggleBtn,
  emailInput,
  passwordInput,
  nickNameInput,
  passwordCheckInput,
  passwordToggleVisibility,
  passwordCheckToggleVisibility,
  emailCheck,
  passwordCheck,
  nickNameCheck,
  passwordConfirm,
  activateSignupBtnState,
  signupOnEnter
} from './validation.js';


// 이메일 형식 체크
emailInput.addEventListener('focusout', emailCheck);
emailInput.addEventListener('input', emailCheck);


// 비밀번호 체크
passwordInput.addEventListener('focusout', passwordCheck);
passwordInput.addEventListener('input', passwordCheck);


// 닉네임 체크
nickNameInput.addEventListener('focusout', nickNameCheck);
nickNameInput.addEventListener('input', nickNameCheck);


// 비밀번호 확인 체크
passwordCheckInput.addEventListener('focusout', passwordConfirm);
passwordCheckInput.addEventListener('input', passwordConfirm);


// 비밀번호 - 아이콘(눈) 버튼 클릭 시 비밀번호 보이기 / 숨기기
passwordToggleBtn.addEventListener('click', passwordToggleVisibility);


// 비밀번호 확인 - 아이콘(눈) 버튼 클릭 시 비밀번호 보이기 / 숨기기
passwordCheckToggleBtn.addEventListener('click', passwordCheckToggleVisibility);


// 이메일, 비밀번호 입력 시 로그인 버튼 활성화 / 비활성화
document.addEventListener('input', activateSignupBtnState);


// 이메일, 닉네임, 비밀번호, 비밀번호 확인 입력 후 엔터키 누르면 로그인 버튼 클릭
document.addEventListener('keydown', signupOnEnter);