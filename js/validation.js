function checkInputValidity({ target }) {
  const { validity } = target;
  const isInputDataValid = validity.valid;
  const inputFilledData = target.value.trim("");
  const inputFilledLength = inputFilledData.length;
  const errorMessage = target
    .closest(".input-area")
    .querySelector(".msg-error");

  if (inputFilledLength === 0) {
    errorMessage.textContent = target.placeholder;
    target.classList.add("invalid");
  } else {
    target.classList.remove("invalid");
    if (target.id === "input_email") {
      if (!isInputDataValid) {
        errorMessage.textContent = "잘못된 이메일 형식입니다.";
        target.classList.add("invalid");
      } else {
        target.classList.remove("invalid");
      }
    } else if (target.id === "input_password") {
      if (inputFilledLength < 8) {
        errorMessage.textContent = "비밀번호를 8자리 이상 입력해주세요.";
        target.classList.add("invalid");
      } else {
        target.classList.remove("invalid");
      }
    } else if (target.id === "input_password_confirm") {
      const password = target
        .closest("form")
        .querySelector("#input_password")
        .value.trim("");
      if (inputFilledData !== password) {
        errorMessage.textContent = "비밀번호가 일치하지 않습니다.";
        target.classList.add("invalid");
      } else {
        if (inputFilledLength < 8) {
          errorMessage.textContent = "비밀번호를 8자리 이상 입력해주세요.";
          target.classList.add("invalid");
        } else {
          target.classList.remove("invalid");
        }
      }
    }
  }
}

export { checkInputValidity };
