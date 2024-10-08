import {
  pattern,
  passwordToggleBtn,
  passwordCheckToggleBtn,
  signupBtn,
  emailInput,
  passwordInput,
  nickNameInput,
  passwordCheckInput,
  passwordToggleVisibility,
  checkEmail,
  checkPassword,
} from "./validation.js";

const passwordMismatchError = document.querySelector(".passwordMismatchError");
const nickNameMessage = document.querySelector(".nickNameMessage");

// 비밀번호 확인
function confirmPassword() {
  const isPasswordMismatch =
    passwordInput.value.trim() !== passwordCheckInput.value;
  passwordCheckInput.classList.toggle("error", isPasswordMismatch);
  passwordMismatchError.classList.toggle("show", isPasswordMismatch);
}

// 닉네임 체크
function nickNameCheck() {
  const isNickNameEmpty = nickNameInput.value.trim() == "";
  nickNameInput.classList.toggle("error", isNickNameEmpty);
  nickNameMessage.classList.toggle("show", isNickNameEmpty);
}

// 비밀번호 확인 - 아이콘(눈) 버튼 클릭 시 비밀번호 보이기 / 숨기기
function passwordCheckToggleVisibility() {
  const isPasswordHidden =
    passwordCheckInput.getAttribute("type") === "password";
  passwordCheckToggleBtn.classList.toggle("show", isPasswordHidden);
  passwordCheckInput.setAttribute(
    "type",
    isPasswordHidden ? "text" : "password"
  );
}

// 이메일, 닉네임, 비밀번호, 비밀번호 확인 입력 시 로그인 버튼 활성화 / 비활성화
function activateSignupBtnState() {
  const isSignupFormValid =
    pattern.test(emailInput.value.trim()) &&
    nickNameInput.value.trim() !== "" &&
    passwordInput.value.length >= 8 &&
    passwordInput.value == passwordCheckInput.value;

  signupBtn.classList.toggle("activate", isSignupFormValid);
  signupBtn.disabled = !isSignupFormValid;
}

// 이메일, 닉네임, 비밀번호, 비밀번호 확인 입력 후 엔터키 누르면 로그인 버튼 클릭
function signupOnEnter(e) {
  if (
    e.keyCode == 13 &&
    pattern.test(emailInput.value.trim()) &&
    nickNameInput.value.trim() !== "" &&
    passwordInput.value.length >= 8 &&
    passwordInput.value == passwordCheckInput.value
  ) {
    signupBtn.click();
  }
}

// 이메일 형식 체크
emailInput.addEventListener("focusout", checkEmail);
emailInput.addEventListener("input", checkEmail);

// 비밀번호 체크
passwordInput.addEventListener("focusout", checkPassword);
passwordInput.addEventListener("input", checkPassword);

// 닉네임 체크
nickNameInput.addEventListener("focusout", nickNameCheck);
nickNameInput.addEventListener("input", nickNameCheck);

// 비밀번호 확인 체크
passwordCheckInput.addEventListener("focusout", confirmPassword);
passwordCheckInput.addEventListener("input", confirmPassword);

// 비밀번호 - 아이콘(눈) 버튼 클릭 시 비밀번호 보이기 / 숨기기
passwordToggleBtn.addEventListener("click", passwordToggleVisibility);

// 비밀번호 확인 - 아이콘(눈) 버튼 클릭 시 비밀번호 보이기 / 숨기기
passwordCheckToggleBtn.addEventListener("click", passwordCheckToggleVisibility);

// 이메일, 비밀번호 입력 시 로그인 버튼 활성화 / 비활성화
document.addEventListener("input", activateSignupBtnState);

// 이메일, 닉네임, 비밀번호, 비밀번호 확인 입력 후 엔터키 누르면 로그인 버튼 클릭
document.addEventListener("keydown", signupOnEnter);
