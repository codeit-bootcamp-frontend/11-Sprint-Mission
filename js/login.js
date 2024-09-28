const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const loginButton = document.getElementById("login-button");

// 유효성 검사 함수
function validateInput(type, showError = true) {
  let value, errorElement, inputElement;

  // 타입이 email일 때
  if (type === "email") {
    value = emailInput.value.trim();
    errorElement = emailError;
    inputElement = emailInput;

    if (showError) {
      errorElement.textContent = ""; // 에러 메시지 초기화
      inputElement.classList.remove("invalid-input"); // 빨간 테두리 제거
    }

    if (!value) {
      if (showError) {
        errorElement.textContent = "이메일을 입력해주세요.";
        inputElement.classList.add("invalid-input"); // 빨간 테두리 추가
      }
      return false;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      if (showError) {
        errorElement.textContent = "잘못된 이메일 형식입니다.";
        inputElement.classList.add("invalid-input");
      }
      return false;
    }

    return true; // 모든 조건을 통과하면 true 반환
  }

  // 타입이 password일 때
  if (type === "password") {
    value = passwordInput.value.trim();
    errorElement = passwordError;
    inputElement = passwordInput;

    if (showError) {
      errorElement.textContent = ""; // 에러 메시지 초기화
      inputElement.classList.remove("invalid-input"); // 빨간 테두리 제거
    }

    if (!value) {
      if (showError) {
        errorElement.textContent = "비밀번호를 입력해주세요.";
        inputElement.classList.add("invalid-input"); // 빨간 테두리 추가
      }
      return false;
    }

    if (value.length < 8) {
      if (showError) {
        errorElement.textContent = "비밀번호를 8자 이상 입력해주세요.";
        inputElement.classList.add("invalid-input");
      }
      return false;
    }

    return true; // 모든 조건을 통과하면 true 반환
  }
}

// 로그인 버튼 상태 업데이트 함수
function updateLoginButtonState() {
  const isEmailValid = validateInput("email", false);
  const isPasswordValid = validateInput("password", false);

  // 둘 다 유효할 때만 버튼 활성화
  loginButton.disabled = !(isEmailValid && isPasswordValid);
}

// 포커스 아웃 시 해당 필드만 유효성 검사
emailInput.addEventListener("focusout", () => {
  validateInput("email"); // 이메일 필드 유효성 검사
  updateLoginButtonState(); // 전체 폼 상태 업데이트
});

passwordInput.addEventListener("focusout", () => {
  validateInput("password"); // 비밀번호 필드 유효성 검사
  updateLoginButtonState(); // 전체 폼 상태 업데이트
});

// 입력 중일 때 폼 전체의 유효성 검사
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
