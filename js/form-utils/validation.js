export {
  isEmail,
  removeSpaceByPassword,
  showWarning,
  deleteWarning,
  validLoginInput,
  validSignupInput,
};

// 이메일 유효성 검사
function isEmail(email) {
  const emailPattern =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return emailPattern.test(email);
}

// 비밀번호 공백 제거
function removeSpaceByPassword(text) {
  text.value = text.value.replace(/\s/g, '');
}

// 오류 메시지 출력
function showWarning(input, warning, message) {
  input.style.outline = '1px solid red';
  warning.style.display = 'block';
  warning.textContent = message;
}

// 오류 메시지 제거
function deleteWarning(input, warning) {
  input.style.outline = '2px solid #3692ff';
  warning.style.display = 'none';
}

// 로그인 시, 값 채워졌을 때 버튼 활성화
function validLoginInput(visibleBtn, invisibleBtn, email, password) {
  const validEmailInput = isEmail(email.value);
  const validPasswordInput = password.value.length >= 8;

  if (validEmailInput && validPasswordInput) {
    visibleBtn.style.display = 'block';
    invisibleBtn.style.display = 'none';
  } else {
    visibleBtn.style.display = 'none';
    invisibleBtn.style.display = 'block';
  }
}

// 회원가입 시, 값 다 채워졌을 때 버튼 활성화
function validSignupInput(
  visibleBtn,
  invisibleBtn,
  email,
  username,
  password,
  passwordCheck
) {
  const validEmailInput = isEmail(email.value);
  const validUsernameInput = username.value.trim() !== '';
  const validPasswordInput = password.value.length >= 8;
  const validPasswordCheckInput = passwordCheck.value === password.value;

  if (
    validEmailInput &&
    validPasswordInput &&
    validUsernameInput &&
    validPasswordCheckInput
  ) {
    visibleBtn.style.display = 'block';
    invisibleBtn.style.display = 'none';
  } else {
    visibleBtn.style.display = 'none';
    invisibleBtn.style.display = 'block';
  }
}
