import { errorNullTextMsg, regexEmail } from "../validation.js";

const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const authForm = document.querySelector("#authForm");
const validInputs = document.querySelectorAll("[data-valid]");
const submitBtn = document.querySelector("#submitBtn");

emailInput.addEventListener("focusout", (e) => validationInput(e, "email"));
passwordInput.addEventListener("focusout", (e) =>
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

  wrongTxtDom.textContent = "";
  e.target.dataset.valid = true;
};
