
let isEmailValid = false;
let isNicknameValid = false;
let isPasswordValid = false;
let isPasswordConfirmationValid = false;



const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const emailInput = document.getElementById("email-input");
const nicknameInput = document.getElementById("nickname");
const passwordInput = document.getElementById("password-input");
const passwordConfirmationInput = document.getElementById(
  "passwordConfirm"
);
const submitButton = document.querySelector(
  '.auth-container form button[type="submit"]'
);



function showError(input, errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.style.display = "block";
  input.style.border = "1px solid #f74747";
}



function hideError(input, errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.style.display = "none";
  input.style.border = "none";
}



function validateEmailString(email) {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
}



function checkEmailValidity() {
  const emailValue = emailInput.value.trim();

  
  isEmailValid = false;
  hideError(emailInput, "emailMessage");
  hideError(emailInput, "emailErrorMessage");

  if (!emailValue) {
    showError(emailInput, "emailMessage");
  } else if (!validateEmailString(emailValue)) {
    showError(emailInput, "emailErrorMessage");
  } else {
    isEmailValid = true;
    hideError(emailInput, "emailMessage");
    hideError(emailInput, "emailErrorMessage");
  }
 
  updateSubmitButtonState();
}



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



function checkPasswordValidity() {
  const passwordValue = passwordInput.value.trim();
  isPasswordValid = false;

  hideError(passwordInput, "passwordMessage");
  hideError(passwordInput, "passwordLengthError");

  if (!passwordValue) {
    showError(passwordInput, "passwordMessage");
  } else if (passwordValue.length < 8) {
    showError(passwordInput, "passwordLengthError");
  } else {
    isPasswordValid = true;
    hideError(passwordInput, "passwordMessage");
    hideError(passwordInput, "passwordLengthError");
  }
  updateSubmitButtonState();

  
  if (signupForm) {
    checkPasswordConfirmationValidity();
  }
}



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



function updateSubmitButtonState() {
  let isFormValid = isEmailValid && isPasswordValid;

  if (signupForm) {
    isFormValid =
      isFormValid && isNicknameValid && isPasswordConfirmationValid;
  }

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


updateSubmitButtonState();

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


