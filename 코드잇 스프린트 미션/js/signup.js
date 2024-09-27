import {
  isEmailEmpty,
  isEmailValid,
  isNicknameEmpty,
  isPasswordEmpty,
  isShortPassword,
  isPwdCheckEmpty,
  isPwdMismatch,
  showError,
  removeError,
} from './validation.js';

// 변수 선언
const emailInput = document.querySelector('#email');
const nicknameInput = document.querySelector('#nickname');
const passwordInput = document.querySelector('#password');
const pwdCheckInput = document.querySelector('#passwordCheck');

// 이메일 유효성 검사 이벤트 핸들러
emailInput.addEventListener('focusout', () => {
  const email = emailInput.value;
  if (isEmailEmpty(email)) {
    showError(emailInput, '이메일을 입력해주세요.');
  } else if (!isEmailValid(email)) {
    showError(emailInput, '잘못된 이메일 형식입니다.');
  } else {
    removeError(emailInput);
  }
});

// 닉네임 유효성 검사 이벤트 핸들러
nicknameInput.addEventListener('focusout', () => {
  const nickname = nicknameInput.value;
  if (isNicknameEmpty(nickname)) {
    showError(nicknameInput, '닉네임을 입력해주세요.');
  } else {
    removeError(nicknameInput);
  }
});

// 비밀번호 유효성 검사 이벤트 핸들러
passwordInput.addEventListener('focusout', () => {
  const password = passwordInput.value;
  if (isPasswordEmpty(password)) {
    showError(passwordInput, '비밀번호를 입력해주세요.');
  } else if (isShortPassword(password)) {
    showError(passwordInput, '비밀번호를 8자 이상 입력해주세요.');
  } else {
    removeError(passwordInput);
  }
});

// 비밀번호 확인 input 유효성 검사 이벤트 핸들러
pwdCheckInput.addEventListener('focusout', () => {
  const confirmPassword = pwdCheckInput.value;
  const password = passwordInput.value;
  if (isPwdCheckEmpty(confirmPassword)) {
    showError(pwdCheckInput, '비밀번호를 다시 한 번 입력해주세요.');
  } else if (isPwdMismatch(password, confirmPassword)) {
    showError(pwdCheckInput, '비밀번호가 일치하지 않습니다.');
  } else {
    removeError(pwdCheckInput);
  }
});
