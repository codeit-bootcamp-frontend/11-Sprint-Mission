// DOM 요소 가져오기
const getElement = (id) => document.getElementById(id);

const form = getElement("signup-form");
const emailInput = getElement("email");
const nicknameInput = getElement("nickname");
const passwordInput = getElement("password");
const confirmPasswordInput = getElement("passwordConfirmation");

const emailErrorMessage = getElement("email-error-message");
const nicknameErrorMessage = getElement("nickname-error-message");
const passwordErrorMessage = getElement("password-error-message");
const confirmPasswordErrorMessage = getElement(
  "passwordConfirmation-error-message"
);

const signupButton = getElement("signup-button");
const passwordToggle = getElement("password-toggle");
const confirmPasswordToggle = getElement("passwordConfirmation-toggle");

// 이메일 유효성 검사 함수
function validateEmail(email) {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return reg.test(email);
}

// 닉네임 유효성 검사 함수
function validateNickname(nickname) {
  return nickname.length > 0;
}

// 비밀번호 유효성 검사 함수
function validatePassword(password) {
  return password.length >= 8;
}

// 비밀번호 확인 유효성 검사 함수
function validatePasswordConfirmation(password, confirmPassword) {
  return password === confirmPassword;
}

// 입력 필드 유효성 검사 함수 (통합된 함수)
function validateInput({
  inputElement, // 유효성 검사할 input 요소
  errorMessageElement, // 에러 메시지를 출력할 요소
  validationFunction, // 유효성 검사에 사용할 함수
  emptyMessage, // 값이 비어 있을 때 표시할 메시지
  invalidMessage, // 유효하지 않을 때 표시할 메시지
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

  inputElement.classList.toggle("error", !isValid); // 에러 스타일 토글
  errorMessageElement.textContent = errorText;
  errorMessageElement.style.display = isValid ? "none" : "block";

  return isValid;
}

// 버튼 활성화 상태 업데이트 함수
function updateButtonState() {
  const isEmailValid =
    emailInput.value.trim() !== "" && validateEmail(emailInput.value);
  const isNicknameValid = nicknameInput.value.trim() !== "";
  const isPasswordValid = passwordInput.value.length >= 8;
  const isPasswordConfirmationValid =
    confirmPasswordInput.value === passwordInput.value;

  signupButton.disabled = !(
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmationValid
  );
}

// 비밀번호 표시/숨김 토글 함수
function togglePasswordVisibility(inputElement, toggleElement) {
  const type =
    inputElement.getAttribute("type") === "password" ? "text" : "password";
  inputElement.setAttribute("type", type);
  toggleElement.src =
    type === "password"
      ? "images/icons/eye-invisible.svg"
      : "images/icons/eye-visible.svg";
  toggleElement.alt = type === "password" ? "비밀번호 숨김" : "비밀번호 표시";
}

// 공통 유효성 검사 이벤트 리스너 등록 함수
function addValidationListeners(
  inputElement,
  errorMessageElement,
  validationFunction,
  emptyMessage,
  invalidMessage
) {
  inputElement.addEventListener("input", () => {
    validateInput({
      inputElement,
      errorMessageElement,
      validationFunction,
      emptyMessage,
      invalidMessage,
    });
    updateButtonState();
  });

  inputElement.addEventListener("blur", () => {
    validateInput({
      inputElement,
      errorMessageElement,
      validationFunction,
      emptyMessage,
      invalidMessage,
    });
  });
}

// 이벤트 리스너 등록
addValidationListeners(
  emailInput,
  emailErrorMessage,
  validateEmail,
  "이메일을 입력해주세요.",
  "잘못된 이메일 형식입니다."
);
addValidationListeners(
  nicknameInput,
  nicknameErrorMessage,
  validateNickname,
  "닉네임을 입력해주세요.",
  "닉네임이 유효하지 않습니다."
);
addValidationListeners(
  passwordInput,
  passwordErrorMessage,
  validatePassword,
  "비밀번호를 입력해주세요.",
  "비밀번호는 8자 이상이어야 합니다."
);
addValidationListeners(
  confirmPasswordInput,
  confirmPasswordErrorMessage,
  (value) => validatePasswordConfirmation(passwordInput.value, value),
  "비밀번호 확인을 입력해주세요.",
  "비밀번호가 일치하지 않습니다."
);

passwordInput.addEventListener("input", () => {
  validateInput({
    inputElement: confirmPasswordInput,
    errorMessageElement: confirmPasswordErrorMessage,
    validationFunction: (value) =>
      validatePasswordConfirmation(passwordInput.value, value),
    emptyMessage: "비밀번호 확인을 입력해주세요.",
    invalidMessage: "비밀번호가 일치하지 않습니다.",
  });
  updateButtonState();
});

passwordToggle.addEventListener("click", () =>
  togglePasswordVisibility(passwordInput, passwordToggle)
);
confirmPasswordToggle.addEventListener("click", () =>
  togglePasswordVisibility(confirmPasswordInput, confirmPasswordToggle)
);

// 초기 버튼 상태 설정
updateButtonState();

// 폼 제출 이벤트 리스너 등록
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!signupButton.disabled) {
    location.href = "/signup.html";
  }
});
