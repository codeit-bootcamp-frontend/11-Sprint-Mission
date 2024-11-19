import { togglePwVisibility } from "./togglePwVisible.js";
import { checkInputValidity, validateForm } from "./validation.js";

const pwVisibilityToggleBtn = document.querySelector(
  ".btn-toggle"
) as HTMLButtonElement; // [sprint3 리뷰 반영] 변수명 직관적으로 변경
const inputs = document.querySelectorAll(
  ".input-area > input"
) as NodeListOf<HTMLInputElement>;
const loginButton = document.querySelector(".btn.login") as HTMLButtonElement;

pwVisibilityToggleBtn.addEventListener("click", togglePwVisibility);

inputs.forEach((input) => {
  input.addEventListener("focusout", (e) => {
    checkInputValidity(e);
    validateForm(e);
  });
});

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/pages/items.html";
});
