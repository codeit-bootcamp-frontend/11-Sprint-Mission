document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("pandaEmail");
  const passwordInput = document.getElementById("pandaPassword");
  const loginButton = document.getElementById("loginButton");
  const emailError = document.getElementById("e-error");
  const passwordError = document.getElementById("p-error");

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

  // 비밀번호 토글 버튼 (추가된 코드)
  const togglePasswordButton = document.createElement('img');
  togglePasswordButton.src = 'img/icon-password.close.svg';
  passwordInput.parentNode.insertBefore(togglePasswordButton, passwordInput.nextSibling);

  togglePasswordButton.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePasswordButton.src = 'img/icon-password.open.svg';
      togglePasswordButton.alt = '비밀번호 숨기기';
    } else {
      passwordInput.type = 'password';
      togglePasswordButton.src = 'img/icon-password.close.svg';
      togglePasswordButton.alt = '비밀번호 보이기';
    }
  });

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
      validateEmail();
      validatePassword();
    }
  });
});