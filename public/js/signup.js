const emailInput = document.getElementsByClassName("email-input")[0];
const nicknameInput = document.getElementsByClassName("nickname-input")[0];
const passwordInput = document.getElementsByClassName("password-input")[0];
const passwordAgainInput = document.getElementsByClassName(
  "password-again-input"
)[0];

const signupButton = document.querySelector(".signup-main-button");

const emailForm = document.querySelector(".signup-main-input-email");
const nicknameForm = document.querySelector(".signup-main-input-nickname");
const passwordForm = document.querySelector(".signup-main-input-password");
const passwordAgainForm = document.querySelector(
  ".signup-main-input-password-again"
);

const passwordFormCon = document.querySelector(
  ".signup-main-input-password-container"
);
const passwordAgainFormCon = document.querySelector(
  ".signup-main-input-password-again-container"
);

const togglePassword = document.getElementById("toggle-password");
const eyeIconPassword = document.getElementById("eye-icon-password");

const togglePasswordAgain = document.getElementById("toggle-password-again");
const eyeIconPasswordAgain = document.getElementById("eye-icon-password-again");

togglePassword.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text"; // 비밀번호 보이기
    eyeIconPassword.src = "/public/images/btn_visibility_on_24px.png";
  } else {
    passwordInput.type = "password"; // 비밀번호 가리기
    eyeIconPassword.src = "/public/images/btn_visibility_off_24px.png";
  }
});

togglePasswordAgain.addEventListener("click", function () {
  if (passwordAgainInput.type === "password") {
    passwordAgainInput.type = "text"; // 비밀번호 보이기
    eyeIconPasswordAgain.src = "/public/images/btn_visibility_on_24px.png";
  } else {
    passwordAgainInput.type = "password"; // 비밀번호 가리기
    eyeIconPasswordAgain.src = "/public/images/btn_visibility_off_24px.png";
  }
});

function showErrorMessage(form, message) {
  let errorMessage = form.querySelector(".error-message");
  if (!errorMessage) {
    errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    form.appendChild(errorMessage);
  }
  errorMessage.innerText = message;
}

function hideErrorMessage(form) {
  const errorMessage = form.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function toggleSignupButton() {
  const emailValue = emailInput.value.trim();
  const nicknameValue = nicknameInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const passwordAgainValue = passwordAgainInput.value.trim();
  const emailValid = validateEmail(emailValue);
  const nicknameValid = nicknameValue.length >= 1;
  const passwordValid = passwordValue.length >= 8;
  const passwordAgainValid = passwordValue === passwordAgainValue;

  if (emailValid && nicknameValid && passwordValid && passwordAgainValid) {
    signupButton.classList.add("active");
    signupButton.disabled = false;
  } else {
    signupButton.classList.remove("active");
    signupButton.disabled = true;
  }
}

emailInput.addEventListener("blur", function () {
  const emailValue = emailInput.value.trim();

  if (!emailValue) {
    emailInput.classList.add("input-error");
    showErrorMessage(emailForm, "이메일을 입력해주세요.");
  } else if (!validateEmail(emailValue)) {
    emailInput.classList.add("input-error");
    showErrorMessage(emailForm, "잘못된 이메일 형식입니다.");
  } else {
    emailInput.classList.remove("input-error");
    hideErrorMessage(emailForm);
  }
  toggleSignupButton();
});

nicknameInput.addEventListener("blur", function () {
  const nicknameValue = nicknameInput.value.trim();

  if (!nicknameValue) {
    nicknameInput.classList.add("input-error");
    showErrorMessage(nicknameForm, "닉네임을 입력해주세요.");
  } else {
    nicknameInput.classList.remove("input-error");
    hideErrorMessage(nicknameForm);
  }
  toggleSignupButton();
});

passwordInput.addEventListener("blur", function () {
  const passwordValue = passwordInput.value.trim();

  if (!passwordValue) {
    passwordFormCon.classList.add("input-error");
    showErrorMessage(passwordForm, "비밀번호를 입력해주세요.");
  } else if (passwordValue.length < 8) {
    passwordFormCon.classList.add("input-error");
    showErrorMessage(passwordForm, "비밀번호를 8자 이상 입력해주세요.");
  } else {
    passwordFormCon.classList.remove("input-error");
    hideErrorMessage(passwordForm);
  }
  toggleSignupButton();
});

passwordAgainInput.addEventListener("blur", function () {
  const passwordValue = passwordInput.value.trim();
  const passwordAgainValue = passwordAgainInput.value.trim();

  if (passwordValue !== passwordAgainValue) {
    passwordAgainFormCon.classList.add("input-error");
    showErrorMessage(passwordAgainForm, "비밀번호가 일치하지 않습니다.");
  } else {
    passwordAgainFormCon.classList.remove("input-error");
    hideErrorMessage(passwordAgainForm);
  }
  toggleSignupButton();
});

emailInput.addEventListener("input", function () {
  emailInput.classList.remove("input-error");
  hideErrorMessage(emailForm);
  toggleSignupButton();
});

nicknameInput.addEventListener("input", function () {
  nicknameInput.classList.remove("input-error");
  hideErrorMessage(nicknameForm);
  toggleSignupButton();
});

passwordInput.addEventListener("input", function () {
  passwordFormCon.classList.remove("input-error");
  hideErrorMessage(passwordForm);
  toggleSignupButton();
});

passwordAgainInput.addEventListener("input", function () {
  passwordAgainFormCon.classList.remove("input-error");
  hideErrorMessage(passwordAgainForm);
  toggleSignupButton();
});

signupButton.addEventListener("click", function () {
  if (!signupButton.disabled) {
    window.location.href = "/signin.html";
  }
});
