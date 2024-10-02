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

  let unEmailValid = false;
  let unPasswordValid = false;
  let unchPasswordValid = false;

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
    clearError(emailInput, emailError)

    if (!emailValue) {
      showError(emailInput, emailError, "이메일을 입력해주세요.")
      unEmailValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      showError(emailInput, emailError, "잘못된 이메일 형식입니다.")
      unEmailValid = false;
      unEmailValid = false;
    } else {
      unEmailValid = true;
    }
    toggleSignupButton()
  }

  // 비밀번호 유효성 검사
  function validatePassword() {
    const passwordValue = passwordInput.value.trim();
    clearError(passwordInput, passwordError)

    if (!passwordValue) {
      showError(passwordInput, passwordError, "비밀번호를 입력해주세요.")
      unPasswordValid = false;
    } else if (passwordValue.length < 8) {
      showError(passwordInput, passwordError, "비밀번호를 8자 이상 입력해주세요.")
      unPasswordValid = false;
    } else {
      unPasswordValid = true;
    }
    toggleSignupButton()

  }
  // 비밀번호 확인 유효성 검사
  function confirmPassword() {
    const passwordValue = passwordInput.value.trim();
    const chpasswordValue = chpasswordInput.value.trim();
    clearError(chpasswordInput, chpasswordError)

    if (passwordValue !== chpasswordValue) {
      showError(chpasswordInput, chpasswordError, "비밀번호가 일치하지 않습니다.")
      unchPasswordValid = false;
    } else {
      unchPasswordValid = true;
    }
    toggleSignupButton()

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
    if (unEmailValid && unPasswordValid && unchPasswordValid) {
      signButton.disabled = false;
    } else {
      signButton.disabled = true;
    }
  }

  
  // 이메일 및 비밀번호 focus out 이벤트
  emailInput.addEventListener("focusout", validateEmail);
  passwordInput.addEventListener("focusout", validatePassword);
  chpasswordInput.addEventListener("focusout", confirmPassword);


  // 회원가입 버튼 클릭 시 폼 제출 및 페이지 이동
  document.getElementById("signForm").addEventListener("submit", function (event) {
    if (unEmailValid && unPasswordValid && unchPasswordValid) {
      window.location.href = "/login.html"; 
    } else {
      event.preventDefault();
      validateEmail();
      validatePassword();
      confirmPassword();
    }
  });
});