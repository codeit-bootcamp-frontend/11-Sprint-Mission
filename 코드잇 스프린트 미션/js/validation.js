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

// 비밀번호 표시 토글 함수
export function togglePasswordVisibility(passwordInput) {
  // 토글이니 가려져 있으면 text로 바꿔서 보이게, 보일 때는 안 보이게 password로 변경
  const isPasswordHidden = passwordInput.type === 'password';
  passwordInput.type = isPasswordHidden ? 'text' : 'password';
}

// 비밀번호 아이콘 표시 토글 함수
export function toggleEyeIcon(eyeIcon, passwordInput) {
  // 비밀번호 인풋이 text일 때, 즉 비밀번호가 보일 때를 변수로 할당
  const isPasswordVisible = passwordInput.type === 'text';
  if (isPasswordVisible) {
    eyeIcon.src = 'image/icon/eye-open.png';
  } else {
    eyeIcon.src = 'image/icon/eye-close.png';
  }
}

// 비밀번호 아이콘 클릭 할 때의 실행 함수
export function handleEyeIconClick(passwordInput, eyeIcon) {
  togglePasswordVisibility(passwordInput); // 비밀번호 표시 토글
  toggleEyeIcon(eyeIcon, passwordInput); // 아이콘 변경
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
  const errorDiv = inputElement.nextElementSibling;
  if (errorDiv && errorDiv.classList.contains('error-message')) {
    errorDiv.remove();
  }
  inputElement.style.border = '';
}
