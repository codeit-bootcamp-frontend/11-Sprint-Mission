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
const signupBtn = document.querySelector('button');

// 이메일 유효성 검사
function validateEmail() {
  const email = emailInput.value;
  if (isEmailEmpty(email)) {
    showError(emailInput, '이메일을 입력해주세요.');
    return false;
  } else if (!isEmailValid(email)) {
    showError(emailInput, '잘못된 이메일 형식입니다.');
    return false;
  } else {
    removeError(emailInput);
    return true;
  }
}

// 닉네임 유효성 검사
function validateNickname() {
  const nickname = nicknameInput.value;
  if (isNicknameEmpty(nickname)) {
    showError(nicknameInput, '닉네임을 입력해주세요.');
    return false;
  } else {
    removeError(nicknameInput);
    return true;
  }
}

// 비밀번호 유효성 검사
function validatePassword() {
  const password = passwordInput.value;
  if (isPasswordEmpty(password)) {
    showError(passwordInput, '비밀번호를 입력해주세요.');
    return false;
  } else if (isShortPassword(password)) {
    showError(passwordInput, '비밀번호를 8자 이상 입력해주세요.');
    return false;
  } else {
    removeError(passwordInput);
    return true;
  }
}

// 비밀번호 확인 유효성 검사
function validatePasswordConfirm() {
  const confirmPassword = pwdCheckInput.value;
  const password = passwordInput.value;
  if (isPwdCheckEmpty(confirmPassword)) {
    showError(pwdCheckInput, '비밀번호를 다시 한 번 입력해주세요.');
    return false;
  } else if (isPwdMismatch(password, confirmPassword)) {
    showError(pwdCheckInput, '비밀번호가 일치하지 않습니다.');
    return false;
  } else {
    removeError(pwdCheckInput);
    return true;
  }
}

// 버튼 초기 비활성화
signupBtn.disabled = true;

// 버튼 상태 업데이트 함수
function updateButtonState() {
  // prettier-ignore
  const hasEmailError = isEmailEmpty(emailInput.value) || !isEmailValid(emailInput.value);
  // prettier-ignore
  const hasNicknameError = isNicknameEmpty(nicknameInput.value);
  // prettier-ignore
  const hasPasswordError = isPasswordEmpty(passwordInput.value) || isShortPassword(passwordInput.value);
  // prettier-ignore
  const hasPwdCheckError = isPwdCheckEmpty(pwdCheckInput.value) || isPwdMismatch(passwordInput.value, pwdCheckInput.value);
  // prettier-ignore
  const isFormValid = !hasEmailError && !hasNicknameError && !hasPasswordError && !hasPwdCheckError;
  // 버튼 활성화 상태 설정
  signupBtn.disabled = !isFormValid;
}

// 해당하는 input만 유효성 검사를 시행하고 버튼 상태를 업데이트
emailInput.addEventListener('focusout', () => {
  validateEmail();
  updateButtonState();
});

nicknameInput.addEventListener('focusout', () => {
  validateNickname();
  updateButtonState();
});

passwordInput.addEventListener('focusout', () => {
  validatePassword();
  updateButtonState();
});

pwdCheckInput.addEventListener('focusout', () => {
  validatePasswordConfirm();
  updateButtonState();
});

// input 변경시 버튼 실시간으로 업데이트
emailInput.addEventListener('input', updateButtonState);
nicknameInput.addEventListener('input', updateButtonState);
passwordInput.addEventListener('input', updateButtonState);
pwdCheckInput.addEventListener('input', updateButtonState);

signupBtn.addEventListener('click', (event) => {
  if (!signupBtn.disabled) {
    event.preventDefault();
    location.href = 'signin.html';
  }
});
