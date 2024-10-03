const pattern = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+/;

const emailInput = document.querySelector("#email-input");
const msg = document.querySelector(".emailMessage");
const errMsg = document.querySelector(".emailErrorMessage");

const passwordMessage = document.querySelector(".passwordMessage");
const passwordLengthError = document.querySelector(".passwordLengthError");

const passwordCheckInput = document.querySelector("#passwordCheck-input");

const nickNameInput = document.querySelector("#nickname-input");

const passwordInput = document.querySelector("#password-input");
const passwordToggleBtn = document.querySelector(".passwordToggleBtn");

const passwordCheckToggleBtn = document.querySelector(
  ".passwordCheckToggleBtn"
);

const signupBtn = document.querySelector(".signupBtn");

// 이메일 형식 체크
function checkEmail() {
  // 이메일 input에 입력 값이 없는 경우
  const isEmailEmpty = emailInput.value.trim() == "";
  emailInput.classList.toggle("error", isEmailEmpty);
  msg.classList.toggle("show", isEmailEmpty);

  // 이메일 input에 입력 값은 있지만 이메일 형식에 맞지 않는 경우
  const isValidEmailInput =
    !isEmailEmpty && !pattern.test(emailInput.value.trim());
  errMsg.classList.toggle("show", isValidEmailInput);
}

// 비밀번호 체크
function checkPassword() {
  // 비밀번호 input에 입력 값이 없는 경우
  const isPasswordEmpty = passwordInput.value.trim() == "";
  passwordInput.classList.toggle("error", isPasswordEmpty);
  passwordMessage.classList.toggle("show", isPasswordEmpty);

  // 비밀번호 input에 입력 값은 있지만 8글자 미만인 경우
  const isPasswordLengthValid =
    passwordInput.value.length < 8 && !isPasswordEmpty;
  passwordInput.classList.toggle("error", isPasswordLengthValid);
  passwordLengthError.classList.toggle("show", isPasswordLengthValid);
}

// 비밀번호 - 아이콘(눈) 버튼 클릭 시 비밀번호 보이기 / 숨기기
function passwordToggleVisibility() {
  const isPasswordHidden = passwordInput.getAttribute("type") === "password";
  passwordToggleBtn.classList.toggle("show", isPasswordHidden);
  passwordInput.setAttribute("type", isPasswordHidden ? "text" : "password");
}

export {
  pattern,
  passwordToggleBtn,
  passwordCheckToggleBtn,
  emailInput,
  passwordInput,
  nickNameInput,
  passwordCheckInput,
  signupBtn,
  passwordToggleVisibility,
  checkEmail,
  checkPassword,
};
