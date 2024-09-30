const get = (id) => {
  const element = document.querySelectorAll(id);

  return element.length === 1 ? element[0] : element;
};

const emailInput = get("#email");
const passwordInput = get("#password");
const loginButton = get("#login_button");
const passwordToggle = get("#password_toggle");
const inputsError = get("#error");

function vaildEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validPassword(password) {
  return password.length >= 8;
}

function vaildateEmail(email) {
  const emailErrorElement = inputsError[0];

  if (!email) {
    emailErrorElement.textContent = "이메일을 입력해주세요.";
  } else if (!vaildEmail(email)) {
    emailErrorElement.textContent = "잘못된 이메일 형식입니다.";
  } else {
    emailErrorElement.textContent = "";
  }
}

function vaildatePassword(password) {
  const passwordErrorElement = inputsError[1];

  if (!password) {
    passwordErrorElement.textContent = "비밀번호를 입력해주세요.";
  } else if (!validPassword(password)) {
    passwordErrorElement.textContent = "비밀번호를 8자 이상 입력해주세요.";
  } else {
    passwordErrorElement.textContent = "";
  }
}

function changeBorderErrorStatus(condition, element) {
  element.style.border = condition ? "2px solid red" : "none";
}

function updateLoginButtonStatus() {
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  const errorEmail = !vaildEmail(emailValue);
  const errorPassword = !validPassword(passwordValue);

  loginButton.disabled = errorEmail || errorPassword;
  return errorEmail || errorPassword;
}

emailInput.addEventListener("focusout", (event) => {
  const { value } = event.target;
  const errorEmail = !vaildEmail(value);

  vaildateEmail(value);
  changeBorderErrorStatus(errorEmail, emailInput);
});

passwordInput.addEventListener("focusout", (event) => {
  const { value } = event.target;
  const errorPassword = !validPassword(value);

  vaildatePassword(value);
  changeBorderErrorStatus(errorPassword, passwordInput);
});

emailInput.addEventListener("input", updateLoginButtonStatus);
passwordInput.addEventListener("input", updateLoginButtonStatus);

loginButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (!loginButton.disabled) {
    location.href = "../items/items.html";
  }
});

updateLoginButtonStatus();
