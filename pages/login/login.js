const get = (id) => {
  const element = document.querySelectorAll(id);

  return element.length === 1 ? element[0] : element;
}

const emailInput = get("#email");
const paswordInput = get("#password");
const loginButton = get("#login_button");
const passwordToggle = get("#password_toggle");
const inputsError = get("#error")


function vaildEmail (email) {
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return email && emailPattern.test(email);
   }

function ValidPassword(password) {
  return password && password.length >= 8;
}


function vaildateEmail(email) {
  if (!email) {
    inputsError[0].textContent = "이메일을 입력해주세요."
  } else if (!vaildEmail(email)) {
    inputsError[0].textContent = "잘못된 이메일 형식입니다."
  } else {
    inputsError[0].textContent = ""
  }
}

function vaildatePassword(password) {
  if (!password) {
    inputsError[1].textContent = "비밀번호를 입력해주세요."
  } else if (password.length < 8) {
    inputsError[1].textContent = "비밀번호를 8자 이상 입력해주세요."
  } else {
    inputsError[1].textContent = ""
  }
}

function changeBorderErrorStatus(condition, element) {
    element.style.border = condition ? "2px solid red" : "none";
}

emailInput.addEventListener("focusout", (event) => {
  const { value } = event.target;
  const errorEmail = !vaildEmail(value);

  vaildateEmail(value)
  changeBorderErrorStatus(errorEmail, emailInput)
})

paswordInput.addEventListener("focusout", (event) => {
  const { value } = event.target;
  const errorPassword = !ValidPassword(value);

  vaildatePassword(value)
  changeBorderErrorStatus(errorPassword, paswordInput)
})