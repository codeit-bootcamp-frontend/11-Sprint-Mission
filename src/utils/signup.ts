import { togglePwVisibility } from "./togglePwVisible.js";
import { checkInputValidity, validateForm } from "./validation.js";
const signupButton = document.querySelector(".btn.signup") as HTMLButtonElement;

const pwVisibilityToggleBtn = document.querySelectorAll(
  ".btn-toggle"
) as NodeListOf<HTMLButtonElement>; // [sprint3 리뷰 반영] 변수명 직관적으로 변경
const inputs = document.querySelectorAll(
  ".input-area > input"
) as NodeListOf<HTMLInputElement>;

pwVisibilityToggleBtn.forEach((btn) => {
  btn.addEventListener("click", togglePwVisibility);
});

inputs.forEach((input) => {
  input.addEventListener("focusout", (e) => {
    checkInputValidity(e);
    validateForm(e);
  });
});

signupButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/pages/signin.html";
});
