// 회원가입 함수에 있는 닉네임, 비밀번호 확인의 유효성 검사와 회원가입 버튼 활성화, 페이지 이동 기능을 담은 스크립트.

const nicknameInput = document.getElementById("nickname");
const confirmPasswordInput = document.getElementById("confirm-password");
const form = document.querySelector(".auth-form");
const signupButton = document.querySelector(".auth-btn");

// 닉네임 유효성 검사
nicknameInput.addEventListener("focusout", function () {
  if (nicknameInput.value === "") {
    showErrorMessage(nicknameInput, "닉네임을 입력해주세요.");
  } else {
    clearErrorMessage(nicknameInput);
  }
});

// 비밀번호 일치 검사 함수
function confirmPassword() {
  if (
    confirmPasswordInput.value &&
    confirmPasswordInput.value !== passwordInput.value
  ) {
    showErrorMessage(confirmPasswordInput, "비밀번호가 일치하지 않습니다.");
  } else {
    clearErrorMessage(confirmPasswordInput);
  }
}

// 비밀번호 확인 입력 후 비밀번호를 수정하여 일치하지 않게 된 경우도 캐치하기 위해 두 곳에서 모두 일치 검사.
passwordInput.addEventListener("focusout", confirmPassword);
confirmPasswordInput.addEventListener("focusout", confirmPassword);

// 비밀번호 확인 유효성 검사
confirmPasswordInput.addEventListener("focusout", function () {
  if (confirmPasswordInput.value === "") {
    showErrorMessage(confirmPasswordInput, "비밀번호 확인을 입력해주세요.");
  }
});

// 회원가입 버튼 활성화/비활성화 함수
function toggleSignupButton() {
  const isEmailValid = emailPattern.test(emailInput.value);
  const isPasswordValid = passwordInput.value.length >= 8;
  const isNicknameValid = nicknameInput.value !== "";
  const isConfirmPasswordValid =
    confirmPasswordInput.value === passwordInput.value;

  if (
    isEmailValid &&
    isPasswordValid &&
    isNicknameValid &&
    isConfirmPasswordValid &&
    !document.querySelector(".error-message")
  ) {
    signupButton.disabled = false;
    signupButton.classList.add("auth-btn-active");
  } else {
    signupButton.disabled = true;
    signupButton.classList.remove("auth-btn-active");
  }
}

// 회원가입 폼의 모든 요소를 수정했을때도 버튼이 활성화/비활성화 될 수 있도록 부모 요소에 이벤트 등록
form.addEventListener("focusout", toggleSignupButton);

// 회원가입 버튼 클릭시 /signin 페이지로 이동
signupButton.addEventListener("click", function (event) {
  if (!signupButton.disabled) {
    window.location.href = "./signin";
  }
});
