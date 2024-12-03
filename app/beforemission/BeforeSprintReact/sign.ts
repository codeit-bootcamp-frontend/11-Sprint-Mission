document.addEventListener("DOMContentLoaded", function () {
  let emailValid = false;
  let usernameValid = false;
  let passwordValid = false;
  let passwordRepeatValid = false;

  const loginForm = document.getElementById(
    "loginGeneral"
  ) as HTMLFormElement | null;
  const signupForm = document.getElementById(
    "signupGeneral"
  ) as HTMLFormElement | null;
  const emailInput = document.getElementById(
    "email"
  ) as HTMLInputElement | null;
  const usernameInput = document.getElementById(
    "username"
  ) as HTMLInputElement | null;
  const passwordInput = document.getElementById(
    "password"
  ) as HTMLInputElement | null;
  const passwordRepeatInput = document.getElementById(
    "password_repeat"
  ) as HTMLInputElement | null;
  const submitButton = document.getElementById(
    "login_button"
  ) as HTMLButtonElement | null;

  function showErrorMessage(input: HTMLElement, errorId: string) {
    if (!errorId) return;
    const errorElement = document.getElementById(errorId) as HTMLElement | null;
    if (errorElement) {
      errorElement.style.display = "block";
      input.style.border = "1px solid #f74747";
    }
  }

  function hideErrorMessage(input: HTMLElement, errorId: string) {
    if (!errorId) return;
    const errorElement = document.getElementById(errorId) as HTMLElement | null;
    if (errorElement) {
      errorElement.style.display = "none";
      input.style.border = "none";
    }
  }

  function handleValidation(
    inputElement: HTMLInputElement,
    value: string,
    emptyErrorId: string | null,
    invalidErrorId: string | null,
    validationFn?: (value: string) => boolean
  ) {
    hideErrorMessage(inputElement, emptyErrorId || "");
    hideErrorMessage(inputElement, invalidErrorId || "");

    if (!value) {
      if (emptyErrorId) showErrorMessage(inputElement, emptyErrorId);
      return false;
    } else if (validationFn && !validationFn(value)) {
      if (invalidErrorId) showErrorMessage(inputElement, invalidErrorId);
      return false;
    }
    return true;
  }

  function validateEmailInput() {
    if (emailInput) {
      const value = emailInput.value.trim();
      const validationFn = (value: string) =>
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
  }

  function validateUsernameInput() {
    if (usernameInput) {
      const value = usernameInput.value.trim();
      usernameValid = handleValidation(
        usernameInput,
        value,
        "usernameEmptyError",
        null,
        undefined
      );
      updateSubmitBtnState();
    }
  }

  function validatePasswordInput() {
    if (passwordInput) {
      const value = passwordInput.value.trim();
      const validationFn = (value: string) => value.length >= 8;
      passwordValid = handleValidation(
        passwordInput,
        value,
        "passwordEmptyError",
        "passwordInvalidError",
        validationFn
      );
      updateSubmitBtnState();
    }
  }

  function validatePasswordRepeatInput() {
    if (passwordRepeatInput && passwordInput) {
      const passwordRepeatValue = passwordRepeatInput.value.trim();
      passwordRepeatValid = Boolean(
        passwordRepeatValue &&
          passwordRepeatValue === passwordInput.value.trim()
      );
      if (!passwordRepeatValid) {
        showErrorMessage(passwordRepeatInput, "passwordRepeatInvalidError");
      } else {
        hideErrorMessage(passwordRepeatInput, "passwordRepeatInvalidError");
      }
      updateSubmitBtnState();
    }
  }

  function updateSubmitBtnState() {
    const isAllInputValid =
      emailValid && usernameValid && passwordValid && passwordRepeatValid;
    const valueValid = signupForm
      ? isAllInputValid
      : emailValid && passwordValid;
    if (submitButton) {
      submitButton.disabled = !valueValid;
    }
  }

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
    if (element) {
      element.addEventListener("input", handler);
      element.addEventListener("focusout", handler);
    }
  });

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
});
