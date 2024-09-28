const get = (id) => {
  const element = document.querySelectorAll(id);

  return element.length === 1 ? element[0] : element;
}

const emailInput = get("#email");
const paswordInput = get("#password");
const loginButton = get("#login_button");
const passwordToggle = get("#password_toggle");
const inputsError = get("#error")


function checkEmailMessage(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    inputsError[0].textContent = "이메일을 입력해주세요."
  } else if (!emailPattern.test(email)) {
    inputsError[0].textContent = "잘못된 이메일 형식입니다."
  } else {
    inputsError[0].textContent = ""
  }
}

function checkPasswordMessage(password) {
  
  if (!password) {
    inputsError[1].textContent = "비밀번호를 입력해주세요."
  } else if (password.length < 8) {
    inputsError[1].textContent = "비밀번호를 8자 이상 입력해주세요."
  } else {
    inputsError[1].textContent = ""
  }
}

function changeBorderErrorStatus(condition, element) {
  if(condition) {
    element.style.border = "2px solid red";
  } else {
    element.style.border = "none";
  }
}

emailInput.addEventListener("focusout", (event) => {
  const { value } = event.target;
  const errorEmail = !value && !checkEmail(value)

  checkEmailMessage(value)
  changeBorderErrorStatus(errorEmail, emailInput)
})

paswordInput.addEventListener("focusout", (event) => {
  const { value } = event.target;
  const errorPassword = !value && value.length < 8

  checkPasswordMessage(value)
  changeBorderErrorStatus(errorPassword, paswordInput)
})