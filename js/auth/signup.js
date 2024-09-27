import { errorNullTextMsg, regexEmail } from "../validation.js";

const emailInput = document.querySelector("#signupEmailInput");
const passwordInput = document.querySelector("#signupPasswordInput");
const nicknameInput = document.querySelector("#signupNicknameInput");
const passwordInputRe = document.querySelector("#signupPasswordInputRe");
const submitBtn = document.querySelector("#signupSubmitBtn");
const validInputs = document.querySelectorAll("[data-valid]");
const authForm = document.querySelector("#signupAuthForm");

emailInput.addEventListener("focusout", (e) => validationInput(e, "email"));
passwordInput.addEventListener("focusout", (e) =>
  validationInput(e, "password")
);
nicknameInput.addEventListener("focusout", (e) =>
  validationInput(e, "nickname")
);

passwordInputRe.addEventListener("focusout", (e) =>
  validationInput(e, "password")
);

authForm.addEventListener("focusout", (e) => checkBtnDisabled(e));

const checkBtnDisabled = (e) => {
  const result = Array.from(validInputs).every(
    (e) => e.dataset.valid === "true"
  );
  if (result) submitBtn.disabled = false;
  submitBtn.classList.toggle("active", result);
  return result;
};

// validation 함수
const validationInput = (e, type) => {
  let msg = "";
  const inputValue = e.target.value;
  const parentDom = e.target.parentElement;
  const wrongTxtDom = parentDom.querySelector(".wrong-txt");

  if (inputValue === "") {
    msg = errorNullTextMsg(type);
    wrongTxtDom.textContent = msg;
    return;
  }

  if (type === "email" && !regexEmail.test(inputValue)) {
    msg = "잘못된 이메일 형식입니다.";
    wrongTxtDom.textContent = msg;
    return;
  }

  if (type === "password" && inputValue.length < 8) {
    msg = "비밀번호를 8자 이상 입력해주세요.";
    wrongTxtDom.textContent = msg;
    return;
  }

  if (type === "password" && inputValue !== passwordInput.value) {
    msg = "비밀번호가 일치하지 않습니다.";
    wrongTxtDom.textContent = msg;
    return;
  }

  wrongTxtDom.textContent = "";
  e.target.dataset.valid = true;
};
