document.addEventListener("DOMContentLoaded", () => {
    let isEmailValid = false;
    let isNicknameValid = false;
    let isPasswordValid = false;
    let isPasswordConfirmationValid = false;
  
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const emailInput = document.getElementById("email");
    const nicknameInput = document.getElementById("nickname");
    const passwordInput = document.getElementById("password");
    const passwordConfirmationInput = document.getElementById(
      "passwordConfirmation"
    );
    const submitButton = document.querySelector(
      '.auth-container form button[type="submit"]'
    );
  
    // 오류 메세지 출력 및 상태 변경
    function showError(input, errorId) {
      const errorElement = document.getElementById(errorId);
      errorElement.style.display = "block";
      input.style.border = "1px solid #f74747";
    }
  
    // 기본상태로
    function hideError(input, errorId) {
      const errorElement = document.getElementById(errorId);
      errorElement.style.display = "none";
      input.style.border = "none";
    }
  
    // 이메일 유효성 검증 util function
      function validateEmailString(email) {
      const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      return emailRegex.test(email);
    }
  
    // 이메일 필드의 유효성 검사 (입력 여부 및 형식)
    function checkEmailValidity() {
      const emailValue = emailInput.value.trim();
  
      // 오류 메세지 및 입력 필드의 상태 초기화
      isEmailValid = false;
      hideError(emailInput, "emailEmptyError");
      hideError(emailInput, "emailInvalidError");
  
      if (!emailValue) {
        showError(emailInput, "emailEmptyError");
      } else if (!validateEmailString(emailValue)) {
        showError(emailInput, "emailInvalidError");
      } else {
        isEmailValid = true;
        hideError(emailInput, "emailEmptyError");
        hideError(emailInput, "emailInvalidError");
      }

      
      updateSubmitButtonState();
    }
    // 닉네임
    function checkNicknameValidity() {
      const nicknameValue = nicknameInput.value.trim();
      isNicknameValid = false;
      hideError(nicknameInput, "nicknameEmptyError");
  
      if (!nicknameValue) {
        showError(nicknameInput, "nicknameEmptyError");
      } else {
        isNicknameValid = true;
        hideError(emailInput, "nicknameEmptyError");
      }
      updateSubmitButtonState();
    }
  
    // 비밀번호 유효성 검사
    function checkPasswordValidity() {
      const passwordValue = passwordInput.value.trim();
      isPasswordValid = false;
  
      hideError(passwordInput, "passwordEmptyError");
      hideError(passwordInput, "passwordInvalidError");
  
      if (!passwordValue) {
        showError(passwordInput, "passwordEmptyError");
      } else if (passwordValue.length < 8) {
        showError(passwordInput, "passwordInvalidError");
      } else {
        isPasswordValid = true;
        hideError(passwordInput, "passwordEmptyError");
        hideError(passwordInput, "passwordInvalidError");
      }
      updateSubmitButtonState();
  
    // 비밀번호 확인 필드의 유효성 검사
    function checkPasswordConfirmationValidity() {
      const passwordConfirmationValue = passwordConfirmationInput.value.trim();
      isPasswordConfirmationValid = false;
  
      hideError(passwordConfirmationInput, "passwordConfirmationError");
      hideError(passwordConfirmationInput, "passwordConfirmationInitError");
  
      if (!isPasswordValid) {
        showError(passwordConfirmationInput, "passwordConfirmationInitError");
      } else if (
        !passwordConfirmationValue ||
        passwordConfirmationValue !== passwordInput.value.trim()
      ) {
        showError(passwordConfirmationInput, "passwordConfirmationError");
      } else {
        isPasswordConfirmationValid = true;
        hideError(passwordConfirmationInput, "passwordConfirmationError");
        hideError(passwordConfirmationInput, "passwordConfirmationInitError");
      }
      updateSubmitButtonState();
    }

     if (signupForm) {
      checkPasswordConfirmationValidity();
    }
  }
      // 
  if (emailInput) {
    emailInput.addEventListener("focusout", checkEmailValidity);
  }
  if (nicknameInput) {
    nicknameInput.addEventListener("focusout", checkNicknameValidity);
  }
  if (passwordInput) {
    passwordInput.addEventListener("input", checkPasswordValidity);
  }
  if (passwordConfirmationInput) {
    // 비밀번호 일치여부
    passwordConfirmationInput.addEventListener(
      "input",
      checkPasswordConfirmationValidity
    );
  }
  // To submit
    function updateSubmitButtonState() {
      let isFormValid = isEmailValid && isPasswordValid;
  
      if (signupForm) {
        isFormValid =
          isFormValid && isNicknameValid && isPasswordConfirmationValid;
      }
  
      // isFormValid의 boolean 값에 따라 Disabled
      submitButton.disabled = !isFormValid;
    }
  

    if (emailInput) {
      emailInput.addEventListener("focusout", checkEmailValidity);
    }
    if (nicknameInput) {
      nicknameInput.addEventListener("focusout", checkNicknameValidity);
    }
    if (passwordInput) {
      passwordInput.addEventListener("input", checkPasswordValidity);
    }
    if (passwordConfirmationInput) {
      passwordConfirmationInput.addEventListener(
        "input",
        checkPasswordConfirmationValidity
      );
    }
  
  
    if (loginForm) {
      loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        window.location.href = "items.html";
      });
    }
  
    if (signupForm) {
      signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        window.location.href = "signup.html";
      });
    }
  
    // 비밀번호 표시 상태 온오프(toggle) 버튼 동작
    function togglePasswordVisibility(event) {
      const button = event.currentTarget;
      const inputField = button.parentElement.querySelector("input");
      const toggleIcon = button.querySelector(".password-toggle-icon");
      const isPasswordVisible = inputField.type === "text";
      inputField.type = isPasswordVisible ? "text" : "password";
  
      //비밀번호 표시 숨김
      toggleIcon.src = isPasswordVisible
        ? "button/openEye.png"
        : "button/closeEye.png";
      toggleIcon.alt = isPasswordVisible
        ? "비밀번호 표시 상태 아이콘"
        : "비밀번호 숨김 상태 아이콘";
  
      button.setAttribute(
        "aria-label",
        isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"
      );
    }

  });
  