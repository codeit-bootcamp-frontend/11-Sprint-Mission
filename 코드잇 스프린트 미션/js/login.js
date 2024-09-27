import {
  isEmailEmpty,
  isEmailValid,
  isPasswordEmpty,
  isShortPassword,
  showError,
  removeError,
} from './validation.js';

// 변수 선언
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

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
