const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const loginButton = document.getElementById("login-button");

// 이메일 유효성 검사 함수
function validateEmail() {
  const emailValue = emailInput.value.trim();
  emailError.textContent = "";
  emailInput.classList.remove("invalid-input");

  if (!emailValue) {
    emailError.textContent = "이메일을 입력해주세요.";
    emailInput.classList.add("invalid-input");
    return false;
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailValue)) {
    emailError.textContent = "잘못된 이메일 형식입니다.";
    emailInput.classList.add("invalid-input");
    return false;
  }

  return true;
}

// 비밀번호 유효성 검사 함수
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

// 폼 전체 유효성 검사 함수
function validateForm() {
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  loginButton.disabled = !(isEmailValid && isPasswordValid);
}

// 포커스 아웃 시 각각의 유효성 검사 실행
emailInput.addEventListener("focusout", validateEmail);
passwordInput.addEventListener("focusout", validatePassword);

// 입력 중일 때 폼 전체의 유효성 검사
emailInput.addEventListener("input", validateForm);
passwordInput.addEventListener("input", validateForm);

// 로그인 버튼을 눌렀을 때 페이지 이동 처리
document
  .querySelector(".email-login-section-form")
  .addEventListener("submit", (event) => {
    event.preventDefault(); // 기본 제출 동작 방지

    if (!loginButton.disabled) {
      window.location.href = "/items"; // 유효한 경우 /items로 이동
    }
  });
