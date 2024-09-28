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
const loginBtn = document.querySelector('button');

// 이메일 유효성 검사
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

// 비밀번호 유효성 검사
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

// 버튼 초기 비활성화
loginBtn.disabled = true;

// 버튼 상태 업데이트 함수
function updateButtonState() {
  // prettier-ignore
  const hasEmailError = isEmailEmpty(emailInput.value) || !isEmailValid(emailInput.value);
  // prettier-ignore
  const hasPasswordError = isPasswordEmpty(passwordInput.value) || isShortPassword(passwordInput.value);
  const isFormValid = !hasEmailError && !hasPasswordError;
}

// 해당하는 input만 유효성 검사를 시행하고 버튼 상태를 업데이트
emailInput.addEventListener('focusout', () => {
  validateEmail();
  updateButtonState();
});

passwordInput.addEventListener('focusout', () => {
  validatePassword();
  updateButtonState();
});

// input 변경시 버튼 실시간으로 업데이트
emailInput.addEventListener('input', updateButtonState);
passwordInput.addEventListener('input', updateButtonState);
