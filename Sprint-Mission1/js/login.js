document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("pandaEmail");
  const passwordInput = document.getElementById("pandaPassword");
  const loginButton = document.getElementById("loginButton");
  const emailError = document.getElementById("e-error");
  const passwordError = document.getElementById("p-error");
  const closeEyesbtn = document.querySelector(".close-eyes");
  const openEyesbtn = document.querySelector(".open-eyes");



  // 이메일 유효성 검사
  function validateEmail() {
    const emailValue = emailInput.value.trim();
    emailError.textContent = "";
    emailInput.classList.remove("error");

    if (!emailValue) {
      emailError.textContent = "이메일을 입력해주세요.";
      emailInput.classList.add("error");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      emailError.textContent = "잘못된 이메일 형식입니다.";
      emailInput.classList.add("error");
      return false;
    }
    return true;
  }

  // 비밀번호 유효성 검사
  function validatePassword() {
    const passwordValue = passwordInput.value.trim();
    passwordError.textContent = "";
    passwordInput.classList.remove("error");

    if (!passwordValue) {
      passwordError.textContent = "비밀번호를 입력해주세요.";
      passwordInput.classList.add("error");
      return false;
    } else if (passwordValue.length < 8) {
      passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
      passwordInput.classList.add("error");
      return false;
    }
    return true;
  }
  // 비밀번호 숨김 상태 확인 함수
  function togglePasswordVisibility(passwordType, passclosebtn, passopenbtn) {
    const inPasswordType = passwordType.getAttribute('type') === 'password'; 

    if (inPasswordType) {
      passwordType.setAttribute('type', 'text'); 
      passclosebtn.classList.remove('visible');
      passopenbtn.classList.add('visible');
    } else {
      passwordType.setAttribute('type', 'password'); 
      passclosebtn.classList.add('visible');
      passopenbtn.classList.remove('visible');
    }
  }

  closeEyesbtn.addEventListener('click', () => togglePasswordVisibility(passwordInput, closeEyesbtn, openEyesbtn));
  openEyesbtn.addEventListener('click', () => togglePasswordVisibility(passwordInput, closeEyesbtn, openEyesbtn));


  // 로그인 버튼 활성화/비활성화
  function toggleLoginButton() {
    if (validateEmail() && validatePassword()) {
      loginButton.classList.remove("disabled");
      loginButton.disabled = false;
    } else {
      loginButton.classList.add("disabled");
      loginButton.disabled = true;
    }
  }

  // 이메일 focus out 이벤트
  emailInput.addEventListener("focusout", function () {
    validateEmail();
    toggleLoginButton();
  });

  // 비밀번호 focus out 이벤트
  passwordInput.addEventListener("focusout", function () {
    validatePassword();
    toggleLoginButton();
  });

  // 로그인 버튼 클릭 시 폼 제출 및 페이지 이동
  document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateEmail() && validatePassword()) {
      window.location.href = "/items.html";
    }
  });
});