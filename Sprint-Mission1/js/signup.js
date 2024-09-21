document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("signupEmail");
  const passwordInput = document.getElementById("singupPassword");
  const chpasswordInput = document.getElementById("checkPassword");
  const signButton = document.getElementById("singupButton");
  const emailError = document.getElementById("e-error");
  const passwordError = document.getElementById("p-error");
  const chpasswordError = document.getElementById("cp-error");
  const passcloseEyesbtn = document.querySelector(".password-wrap .close-eyes");
  const passopenEyesbtn = document.querySelector(".password-wrap .open-eyes");
  const chcloseEyesbtn = document.querySelector(".check-p-wrap .close-eyes");
  const chopenEyesbtn = document.querySelector(".check-p-wrap .open-eyes");


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
  // 비밀번호 확인 유효성 검사
  function confirmPassword() {
    const passwordValue = passwordInput.value.trim();
    const chpasswordValue = chpasswordInput.value.trim();
    chpasswordError.textContent = "";
    chpasswordInput.classList.remove("error");

    if (passwordValue !== chpasswordValue) {
      chpasswordError.textContent = "비밀번호가 일치하지 않습니다";
      chpasswordInput.classList.add("error");
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

  // 각 버튼에 대한 클릭 이벤트 핸들러
  passcloseEyesbtn.addEventListener('click', () => togglePasswordVisibility(passwordInput, passcloseEyesbtn, passopenEyesbtn));
  passopenEyesbtn.addEventListener('click', () => togglePasswordVisibility(passwordInput, passcloseEyesbtn, passopenEyesbtn));

  chcloseEyesbtn.addEventListener('click', () => togglePasswordVisibility(chpasswordInput, chcloseEyesbtn, chopenEyesbtn));
  chopenEyesbtn.addEventListener('click', () => togglePasswordVisibility(chpasswordInput, chcloseEyesbtn, chopenEyesbtn));


  // 회원가입 버튼 활성화/비활성화
  function toggleSignupButton() {
    if (validateEmail() && validatePassword() && confirmPassword()) {
      signButton.classList.remove("disabled");
      signButton.disabled = false;
    } else {
      signButton.classList.add("disabled");
      signButton.disabled = true;
    }
  }

  // 이메일 focus out 이벤트
  emailInput.addEventListener("focusout", function () {
    validateEmail();
    toggleSignupButton();
  });

  // 비밀번호 focus out 이벤트
  passwordInput.addEventListener("focusout", function () {
    validatePassword();
    toggleSignupButton();
  });
  // 비밀번호 확인 focus out 이벤트
  chpasswordInput.addEventListener("focusout", function () {
    confirmPassword();
    toggleSignupButton();
  });

  // 회원가입 버튼 클릭 시 폼 제출 및 페이지 이동
  document.getElementById("signForm").addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateEmail() && validatePassword() && confirmPassword()) {
      window.location.href = "/login.html";
    }
  });
});