// DOM 요소 가져오기
const getElement = (id) => document.getElementById(id);

const form = getElement("signin-form");
const emailInput = getElement("email");
const passwordInput = getElement("password");
const emailErrorMessage = getElement("email-error-message");
const passwordErrorMessage = getElement("password-error-message");
const loginButton = getElement("login-button");
const togglePasswordButton = getElement("toggle-password");
const passwordToggleIcon = togglePasswordButton.querySelector("img");

// 이메일 유효성 검사 함수
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// 비밀번호 유효성 검사 함수
function validatePassword(pwd) {
  return pwd.length >= 8;
}

// 입력 필드 유효성 검사 함수 (통합된 함수)
function validateInput({
  inputElement,
  errorMessageElement,
  validationFunction,
  emptyMessage,
  invalidMessage,
}) {
  const value = inputElement.value.trim();
  let isValid = true;
  let errorText = "";

  if (!value) {
    isValid = false;
    errorText = emptyMessage; // 비어 있을 때 메시지
  } else if (validationFunction && !validationFunction(value)) {
    isValid = false;
    errorText = invalidMessage; // 유효성 검사 실패 메시지
  }

  inputElement.classList.toggle("error", !isValid); // 유효하지 않은 경우 error 클래스 토글
  errorMessageElement.textContent = errorText;
  errorMessageElement.style.display = isValid ? "none" : "block"; // 가시성 제어

  return isValid;
}

// 버튼 활성화 상태 업데이트 함수
function updateButtonState() {
  const isEmailValid =
    emailInput.value.trim() !== "" && validateEmail(emailInput.value);
  const isPasswordValid =
    passwordInput.value.trim() !== "" && validatePassword(passwordInput.value);

  loginButton.disabled = !(isEmailValid && isPasswordValid);
}

// 비밀번호 표시/숨김 토글 함수
function togglePasswordVisibility() {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  passwordToggleIcon.src =
    type === "password"
      ? "images/icons/eye-invisible.svg"
      : "images/icons/eye-visible.svg";
  passwordToggleIcon.alt =
    type === "password" ? "비밀번호 숨김" : "비밀번호 표시";
}

// 공통 유효성 검사 이벤트 리스너 등록 함수
function addValidationListeners(
  inputElement,
  errorMessageElement,
  validationFunction,
  emptyMessage,
  invalidMessage
) {
  const validateAndUpdate = () => {
    validateInput({
      inputElement,
      errorMessageElement,
      validationFunction,
      emptyMessage,
      invalidMessage,
    });
    updateButtonState();
  };

  // 중복 코드 제거: input과 blur 이벤트에 동일한 핸들러 등록
  ["input", "blur"].forEach((event) =>
    inputElement.addEventListener(event, validateAndUpdate)
  );
}

// 이벤트 리스너 등록
addValidationListeners(
  emailInput,
  emailErrorMessage,
  validateEmail,
  "이메일을 입력해주세요.",
  "올바른 이메일 형식을 입력해주세요."
);
addValidationListeners(
  passwordInput,
  passwordErrorMessage,
  validatePassword,
  "비밀번호를 입력해주세요.",
  "비밀번호는 8자 이상이어야 합니다."
);

togglePasswordButton.addEventListener("click", togglePasswordVisibility);

// 초기 버튼 상태 설정
updateButtonState();

// 폼 제출 이벤트 처리
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!loginButton.disabled) {
    window.location.href = "/items.html";
  }
});
