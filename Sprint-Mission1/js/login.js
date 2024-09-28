document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("pandaEmail");
  const passwordInput = document.getElementById("pandaPassword");
  const loginButton = document.getElementById("loginButton");
  const emailError = document.getElementById("e-error");
  const passwordError = document.getElementById("p-error");
  const closeEyesbtn = document.querySelector(".close-eyes");
  const openEyesbtn = document.querySelector(".open-eyes");

  let unEmailValid = false;
  let unPasswordValid = false;

  // 에러 메시지 출력 함수
  function showError(inputElement, errorElement, errorMessage) {
    errorElement.textContent = errorMessage;
    inputElement.classList.add("error");
  }

  // 에러 메시지 지우기 함수
  function clearError(inputElement, errorElement) {
    errorElement.textContent = "";
    inputElement.classList.remove("error");
  }

  // 이메일 유효성 검사
  function validateEmail() {
    const emailValue = emailInput.value.trim();
    clearError(emailInput, emailError);

    if (!emailValue) {
      showError(emailInput, emailError, "이메일을 입력해주세요.");
      unEmailValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      showError(emailInput, emailError, "잘못된 이메일 형식입니다.");
      unEmailValid = false;
    } else {
      unEmailValid = true;
    }
    toggleLoginButton();
  }

  // 비밀번호 유효성 검사
  function validatePassword() {
    const passwordValue = passwordInput.value.trim();
    clearError(passwordInput, passwordError);

    if (!passwordValue) {
      showError(passwordInput, passwordError, "비밀번호를 입력해주세요.");
      unPasswordValid = false;
    } else if (passwordValue.length < 8) {
      showError(passwordInput, passwordError, "비밀번호를 8자 이상 입력해주세요.");
      unPasswordValid = false;
    } else {
      unPasswordValid = true;
    }
    toggleLoginButton();
  }

  // 비밀번호 숨김 상태 확인 함수
  function togglePasswordVisibility(passwordType, passwordVisibleButton, passwordInvisibleButton) {
    const inPasswordType = passwordType.getAttribute('type') === 'password';
    passwordType.setAttribute('type', inPasswordType ? 'text' : 'password');
    passwordVisibleButton.classList.toggle('visible', !inPasswordType);
    passwordInvisibleButton.classList.toggle('visible', inPasswordType);
  }

  closeEyesbtn.addEventListener('click', () => togglePasswordVisibility(passwordInput, closeEyesbtn, openEyesbtn));
  openEyesbtn.addEventListener('click', () => togglePasswordVisibility(passwordInput, closeEyesbtn, openEyesbtn));

  // 로그인 버튼 활성화/비활성화
  function toggleLoginButton() {
    if (unEmailValid && unPasswordValid) {
      loginButton.disabled = false;
    } else {
      loginButton.disabled = true;
    }
  }

  // 이메일 및 비밀번호 focus out 이벤트
  emailInput.addEventListener("focusout", validateEmail);
  passwordInput.addEventListener("focusout", validatePassword);

  // 로그인 버튼 클릭 시 폼 제출 및 페이지 이동
  document.getElementById("loginForm").addEventListener("submit", function (event) {
    if (unEmailValid && unPasswordValid) {
      window.location.href = "/items.html";
    } else {
      event.preventDefault();
      // 유효하지 않다면 에러 메시지를 다시 확인
      validateEmail();
      validatePassword();
    }
  });
});
