import {
  renderOutline,
  renderErOutline,
  deleteOutline,
  validateEmail,
  email,
  password,
  emailPattern,
} from "./login.js";

const nickname = document.querySelector(".myNickname");
const passwordCheck = document.querySelector(".checkMyPw");
const signupBtn = document.querySelector(".signup");
const nicknameEr = document.querySelector(".nicknameError");
const passwordEr = document.querySelector(".passwordError");
const passwordCheckEr = document.querySelector(".checkPwError");

function validateNickname(nickname) {
  const nicknameValue = nickname.value;

  if (nicknameValue == "") {
    nicknameEr.textContent = "닉네임을 입력해주세요";
    renderErOutline(nickname);
  } else {
    nicknameEr.textContent = "";
    deleteOutline(nickname);
  }
}

function validatePassword(password) {
  const passwordValue = password.value;

  if (passwordValue == "") {
    passwordEr.textContent = "비밀번호를 입력해주세요";
    renderErOutline(password);
  } else if (passwordValue.length >= 8) {
    passwordEr.textContent = "";
    deleteOutline(password);
  } else {
    passwordEr.textContent = "비밀번호를 8자 이상 입력해주세요";
    renderErOutline(password);
  }
}

email.addEventListener("focusout", function () {
  validateEmail(email);
});

email.addEventListener("focusin", function () {
  const emailValue = email.value;

  if (emailPattern.test(emailValue)) {
    renderOutline(email);
  }
});

nickname.addEventListener("focusout", function () {
  validateNickname(nickname);
});

nickname.addEventListener("focusin", function () {
  const nicknameValue = nickname.value;

  if (nicknameValue !== "") {
    renderOutline(nickname);
  }
});

password.addEventListener("focusout", function () {
  validatePassword(password);
});

password.addEventListener("focusin", function () {
  const passwordValue = password.value;

  if (passwordValue.length >= 8) {
    renderOutline(password);
  }
});

function checkPassword() {
  const passwordCheckValue = passwordCheck.value;
  const passwordValue = password.value;

  if (passwordCheckValue !== "") {
    if (passwordValue !== passwordCheckValue) {
      passwordCheckEr.textContent = "비밀번호가 일치하지 않습니다";
      renderErOutline(passwordCheck);
    } else {
      passwordCheckEr.textContent = "";
      deleteOutline(passwordCheck);
    }
  }
}

passwordCheck.addEventListener("focusin", function () {
  const passwordCheckValue = passwordCheck.value;
  const passwordValue = password.value;

  if (passwordValue == passwordCheckValue) {
    renderOutline(passwordCheck);
  }
});

password.addEventListener("focusout", checkPassword);
passwordCheck.addEventListener("focusout", checkPassword);

function signup() {
  const emailValue = email.value;
  const isEmailValid = emailValue !== "" && emailPattern.test(emailValue);

  const nicknameValue = nickname.value;
  const isNicknameValid = nicknameValue !== "";

  const passwordValue = password.value;
  const isPasswordValid = passwordValue.length >= 8;

  const passwordCheckValue = passwordCheck.value;
  const isPasswordCheckValid = passwordCheckValue == passwordValue;

  if (
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordCheckValid
  ) {
    signupBtn.disabled = false;
  } else {
    signupBtn.disabled = true;
  }
}

email.addEventListener("input", signup);
nickname.addEventListener("input", signup);
password.addEventListener("input", signup);
passwordCheck.addEventListener("input", signup);

signupBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "./signin.html";
});
