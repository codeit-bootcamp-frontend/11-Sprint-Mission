import { togglePwVisibility } from "./togglePwVisible.js";
import { checkInputValidity, validateForm } from "./validation.js";

const pwVisibilityToggleBtn = document.querySelector(".btn-toggle"); // [sprint3 리뷰 반영] 변수명 직관적으로 변경
const inputs = document.querySelectorAll(".input-area > input");

pwVisibilityToggleBtn.addEventListener("click", togglePwVisibility);

inputs.forEach((input) => {
  input.addEventListener("focusout", (e) => {
    checkInputValidity(e);
    validateForm(e);
  });
});
