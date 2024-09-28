// 이메일 유효성 검사 함수
export function isEmailEmpty(email) {
  return email.trim() === '';
}

export function isEmailValid(email) {
  const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailFormat.test(email.trim());
}

// 닉네임 유효성 검사 함수
export function isNicknameEmpty(nickname) {
  return nickname.trim() === '';
}

// 비밀번호 유효성 검사 함수
export function isPasswordEmpty(password) {
  return password.trim() === '';
}

export function isShortPassword(password) {
  return password.trim().length < 8;
}

// 비밀번호 확인 유효성 검사 함수
export function isPwdCheckEmpty(confirmPassword) {
  return confirmPassword.trim() === '';
}

export function isPwdMismatch(password, confirmPassword) {
  return password.trim() !== confirmPassword.trim();
}

// 에러 생성 함수
export function showError(inputElement, message) {
  let errorDiv = inputElement.nextElementSibling;
  // errorDiv가 없거나, 존재 해도 error-message 클래스를 가지고 있지 않은 경우
  if (!errorDiv || !errorDiv.classList.contains('error-message')) {
    errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    inputElement.after(errorDiv);
  }
  errorDiv.textContent = message;
  inputElement.style.border = '2px solid red';
}

// 에러 삭제 함수
export function removeError(inputElement) {
  let errorDiv = inputElement.nextElementSibling;
  if (errorDiv && errorDiv.classList.contains('error-message')) {
    errorDiv.remove();
  }
  inputElement.style.border = '';
}
