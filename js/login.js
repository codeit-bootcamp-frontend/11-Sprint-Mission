import {
  pattern,
  passwordToggleBtn,
  emailInput,
  passwordInput,
  passwordToggleVisibility,
  checkEmail,
  checkPassword,
} from "./validation.js";

const loginBtn = document.querySelector(".loginBtn");

// 이메일, 비밀번호 입력 시 로그인 버튼 활성화 / 비활성화
function activateLoginBtnState() {
  const isLoginFormValid =
    pattern.test(emailInput.value.trim()) && passwordInput.value.length >= 8;
  loginBtn.classList.toggle("activate", isLoginFormValid);
  loginBtn.disabled = !isLoginFormValid;
}

// 이메일, 비밀번호 입력 후 엔터키 누르면 로그인 버튼 클릭
function loginOnEnter(e) {
  if (
    e.keyCode == 13 &&
    pattern.test(emailInput.value.trim()) &&
    passwordInput.value.length >= 8
  ) {
    loginBtn.click();
  }
}

// 이메일 형식 체크
emailInput.addEventListener("focusout", checkEmail);
emailInput.addEventListener("input", checkEmail);

// 비밀번호 체크
passwordInput.addEventListener("focusout", checkPassword);
passwordInput.addEventListener("input", checkPassword);

// 아이콘(눈) 버튼 클릭 시 비밀번호 보이기 / 숨기기
passwordToggleBtn.addEventListener("click", passwordToggleVisibility);

// 이메일, 비밀번호 입력 시 로그인 버튼 활성화 / 비활성화
document.addEventListener("input", activateLoginBtnState);

// 이메일, 비밀번호 입력 후 엔터키 누르면 로그인 버튼 클릭
document.addEventListener("keydown", loginOnEnter);
