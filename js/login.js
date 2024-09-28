const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const loginButton = document.getElementById("login-button");

// 이메일 유효성 검사 함수
function validateEmail(showError = true) {
  const emailValue = emailInput.value.trim();
  if (showError) {
    emailError.textContent = ""; // 에러 메시지 초기화
    emailInput.classList.remove("invalid-input"); // 빨간 테두리 제거
  }

  if (!emailValue) {
    if (showError) {
      emailError.textContent = "이메일을 입력해주세요.";
      emailInput.classList.add("invalid-input"); // 빨간 테두리 추가
    }
    return false;
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailValue)) {
    if (showError) {
      emailError.textContent = "잘못된 이메일 형식입니다.";
      emailInput.classList.add("invalid-input");
    }
    return false;
  }

  return true;
}

// 비밀번호 유효성 검사 함수
function validatePassword(showError = true) {
  const passwordValue = passwordInput.value.trim();
  if (showError) {
    passwordError.textContent = ""; // 에러 메시지 초기화
    passwordInput.classList.remove("invalid-input"); // 빨간 테두리 제거
  }

  if (!passwordValue) {
    if (showError) {
      passwordError.textContent = "비밀번호를 입력해주세요.";
      passwordInput.classList.add("invalid-input"); // 빨간 테두리 추가
    }
    return false;
  } else if (passwordValue.length < 8) {
    if (showError) {
      passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
      passwordInput.classList.add("invalid-input");
    }
    return false;
  }

  return true;
}

// 로그인 버튼 상태 업데이트 함수
function updateLoginButtonState() {
  // 여기서는 에러 메시지를 보여주지 않음 (단순 상태 확인)
  const isEmailValid = validateEmail(false);
  const isPasswordValid = validatePassword(false);

  // 둘 다 유효할 때만 버튼 활성화
  loginButton.disabled = !(isEmailValid && isPasswordValid);
}

// 포커스 아웃 시 해당 필드만 유효성 검사
emailInput.addEventListener("focusout", () => {
  validateEmail(); // 이메일 필드만 유효성 검사
  updateLoginButtonState(); // 전체 폼 상태 업데이트
});

passwordInput.addEventListener("focusout", () => {
  validatePassword(); // 비밀번호 필드만 유효성 검사
  updateLoginButtonState(); // 전체 폼 상태 업데이트
});

// 입력 중일 때 폼 전체의 유효성 검사 (에러 메시지는 표시되지 않음)
emailInput.addEventListener("input", updateLoginButtonState);
passwordInput.addEventListener("input", updateLoginButtonState);

// 로그인 버튼을 눌렀을 때 페이지 이동 처리
document
  .querySelector(".email-login-section-form")
  .addEventListener("submit", (event) => {
    event.preventDefault(); // 기본 제출 동작 방지

    if (!loginButton.disabled) {
      window.location.href = "/items"; // 유효한 경우 /items로 이동
    }
  });
