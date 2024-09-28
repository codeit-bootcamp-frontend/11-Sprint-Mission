const emailInput = document.getElementById("email-input");
const nicknameInput = document.getElementById("nickname-input");
const passwordInput = document.getElementById("password-input");
const passwordConfirmInput = document.getElementById("password-confirm-input");
const emailError = document.getElementById("email-error");
const nicknameError = document.getElementById("nickname-error");
const passwordError = document.getElementById("password-error");
const passwordConfirmError = document.getElementById("password-confirm-error");
const signupButton = document.getElementById("signup-button");

// 이메일 유효성 검사
function validateEmail() {
  const emailValue = emailInput.value.trim();
  emailError.textContent = ""; // 에러 메시지 초기화
  emailInput.classList.remove("invalid-input"); // 빨간 테두리 제거

  if (!emailValue) {
    emailError.textContent = "이메일을 입력해주세요.";
    emailInput.classList.add("invalid-input"); // 빨간 테두리 추가
    return false;
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailValue)) {
    emailError.textContent = "잘못된 이메일 형식입니다.";
    emailInput.classList.add("invalid-input");
    return false;
  }

  return true;
}

// 닉네임 유효성 검사
function validateNickname() {
  const nicknameValue = nicknameInput.value.trim();
  nicknameError.textContent = ""; // 에러 메시지 초기화
  nicknameInput.classList.remove("invalid-input");

  if (!nicknameValue) {
    nicknameError.textContent = "닉네임을 입력해주세요.";
    nicknameInput.classList.add("invalid-input");
    return false;
  }

  return true;
}

// 비밀번호 유효성 검사
function validatePassword() {
  const passwordValue = passwordInput.value.trim();
  passwordError.textContent = "";
  passwordInput.classList.remove("invalid-input");

  if (!passwordValue) {
    passwordError.textContent = "비밀번호를 입력해주세요.";
    passwordInput.classList.add("invalid-input");
    return false;
  } else if (passwordValue.length < 8) {
    passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
    passwordInput.classList.add("invalid-input");
    return false;
  }

  return true;
}

// 비밀번호 확인 유효성 검사
function validatePasswordConfirm() {
  const passwordValue = passwordInput.value.trim();
  const passwordConfirmValue = passwordConfirmInput.value.trim();
  passwordConfirmError.textContent = "";
  passwordConfirmInput.classList.remove("invalid-input");

  if (passwordValue !== passwordConfirmValue) {
    passwordConfirmError.textContent = "비밀번호가 일치하지 않습니다.";
    passwordConfirmInput.classList.add("invalid-input");
    return false;
  }

  return true;
}

// 포커스 아웃 시 해당 필드에 대한 유효성 검사만 수행
emailInput.addEventListener("focusout", () => {
  validateEmail(); // 이메일 필드만 유효성 검사
  updateSignupButtonState(); // 회원가입 버튼 상태 업데이트
});

nicknameInput.addEventListener("focusout", () => {
  validateNickname(); // 닉네임 필드만 유효성 검사
  updateSignupButtonState();
});

passwordInput.addEventListener("focusout", () => {
  validatePassword(); // 비밀번호 필드만 유효성 검사
  updateSignupButtonState();
});

passwordConfirmInput.addEventListener("focusout", () => {
  validatePasswordConfirm(); // 비밀번호 확인 필드만 유효성 검사
  updateSignupButtonState();
});

// 모든 필드가 유효할 때만 회원가입 버튼을 활성화하는 함수
function updateSignupButtonState() {
  const isFormValid =
    validateEmail() &&
    validateNickname() &&
    validatePassword() &&
    validatePasswordConfirm();
  signupButton.disabled = !isFormValid; // 폼이 유효하지 않으면 버튼 비활성화
}

// 회원가입 버튼 클릭 시 페이지 이동 처리
document
  .querySelector(".email-signup-section-form")
  .addEventListener("submit", (event) => {
    event.preventDefault(); // 기본 제출 동작 방지

    if (!signupButton.disabled) {
      window.location.href = "/signin"; // 유효한 경우 /signin으로 이동
    }
  });
