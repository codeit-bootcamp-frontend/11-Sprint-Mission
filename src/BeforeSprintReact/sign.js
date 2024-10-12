document.addEventListener("DOMContentLoaded", function () {
  // 유효성 검사 상태
  let emailValid = false;
  let usernameValid = false;
  let passwordValid = false;
  let passwordRepeatValid = false;

  // 요소 접근
  const loginForm = document.getElementById("loginGeneral");
  const signupForm = document.getElementById("signupGeneral");
  const emailInput = document.getElementById("email");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const passwordRepeatInput = document.getElementById("password_repeat");
  const submitButton = document.getElementById("login_button");

  // 오류 메시지 보여주기
  function showErrorMessage(input, errorId) {
    if (!errorId) return;
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = "block";
    input.style.border = "1px solid #f74747";
  }

  // 오류 메시지 가리기
  function hideErrorMessage(input, errorId) {
    if (!errorId) return;
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = "none";
    input.style.border = "none";
  }

  // 공통 오류 처리 함수
  function handleValidation(
    inputElement,
    value,
    emptyErrorId,
    invalidErrorId,
    validationFn
  ) {
    hideErrorMessage(inputElement, emptyErrorId);
    hideErrorMessage(inputElement, invalidErrorId);

    if (!value) {
      showErrorMessage(inputElement, emptyErrorId);
      return false;
    } else if (validationFn && !validationFn(value)) {
      showErrorMessage(inputElement, invalidErrorId);
      return false;
    }
    return true;
  }

  // 이메일 유효성 검사
  function validateEmailInput() {
    const value = emailInput.value.trim();
    const validationFn = (value) =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    emailValid = handleValidation(
      emailInput,
      value,
      "emailEmptyError",
      "emailInvalidError",
      validationFn
    );
    updateSubmitBtnState();
  }

  // 닉네임 유효성 검사
  function validateUsernameInput() {
    const value = usernameInput.value.trim();
    usernameValid = handleValidation(
      usernameInput,
      value,
      "usernameEmptyError",
      null,
      null
    );
    updateSubmitBtnState();
  }

  // 비밀번호 유효성 검사
  function validatePasswordInput() {
    const value = passwordInput.value.trim();
    const validationFn = (value) => value.length >= 8;
    passwordValid = handleValidation(
      passwordInput,
      value,
      "passwordEmptyError",
      "passwordInvalidError",
      validationFn
    );
    updateSubmitBtnState();
  }

  // 비밀번호 확인 유효성 검사
  function validatePasswordRepeatInput() {
    const passwordRepeatValue = passwordRepeatInput.value.trim();
    passwordRepeatValid =
      passwordRepeatValue && passwordRepeatValue === passwordInput.value.trim();
    if (!passwordRepeatValid) {
      showErrorMessage(passwordRepeatInput, "passwordRepeatInvalidError");
    } else {
      hideErrorMessage(passwordRepeatInput, "passwordRepeatInvalidError");
    }
    updateSubmitBtnState();
  }

  // 제출 버튼 상태 업데이트
  function updateSubmitBtnState() {
    const isAllInputValid =
      emailValid && usernameValid && passwordValid && passwordRepeatValid;
    const valueValid = signupForm
      ? isAllInputValid
      : emailValid && passwordValid;
    submitButton.disabled = !valueValid;
  }

  // 이벤트 리스너 추가
  const inputEvents = [
    { element: emailInput, handler: validateEmailInput },
    { element: passwordInput, handler: validatePasswordInput },
  ];

  if (signupForm) {
    inputEvents.push(
      { element: usernameInput, handler: validateUsernameInput },
      { element: passwordRepeatInput, handler: validatePasswordRepeatInput }
    );
  }

  inputEvents.forEach(({ element, handler }) => {
    element.addEventListener("input", handler);
    element.addEventListener("focusout", handler);
  });

  // 폼 제출
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      location.href = "items.html";
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      location.href = "signup.html";
    });
  }
});
