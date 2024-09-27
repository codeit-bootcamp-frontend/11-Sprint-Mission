const get = (id) => {
  const element = document.querySelectorAll(id);

  return element.length === 1 ? element[0] : element;
}

const emailInput = get("#email");
const paswordInput = get("#password");
const loginButton = get("#login_button");
const passwordToggle = get("#password_toggle");
const inputsError = get("#error")

function changeBorderErrorStatus(element) {
  element.style.border = "2px solid red";
}

function innerTextContent(element, text) {
  element.textContent = text
}

function checkEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function clearError(inputElement, errorElement) {
  innerTextContent(errorElement, "");
  inputElement.style.border = "none";
}
 

emailInput.addEventListener("focusout", (event) => {
  const { value } = event.target;

  if (!value) {
    innerTextContent(inputsError[0], "이메일을 입력해주세요.")
    changeBorderErrorStatus(emailInput)
  } else if (!checkEmail(value)) {
    innerTextContent(inputsError[0], "잘못된 이메일 형식입니다.")
    changeBorderErrorStatus(emailInput)
  } else {
    clearError(emailInput, inputsError[0])
  }
})

paswordInput.addEventListener("focusout", (event) => {
  const { value } = event.target;

  if (!value) {
    innerTextContent(inputsError[1], "비밀번호를 입력해주세요.")
    changeBorderErrorStatus(paswordInput)
  } else if (value.length < 8) {
    innerTextContent(inputsError[1], "비밀번호를 8자 이상 입력해주세요.")
    changeBorderErrorStatus(paswordInput)
  } else {
    clearError(paswordInput, inputsError[1])
  }
})
