const email = document.querySelector(".myEmail");
const password = document.querySelector(".myPw");
const emailEr = document.querySelector(".emailError");
const passwordEr = document.querySelector(".pwError");
const loginBtn = document.querySelector(".login");

function renderOutline(value) {
  value.style.outline = "2px solid #3692ff";
}

function renderErOutline(value) {
  value.style.outline = "2px solid red";
}

function deleteOutline(value) {
  value.style.outline = "0";
}

email.addEventListener("focusout", function (e) {
  const emailValue = email.value;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailValue == "") {
    emailEr.textContent = "이메일을 입력해주세요";
    renderErOutline(email);
  } else if (emailPattern.test(emailValue)) {
    emailEr.textContent = "";
    deleteOutline(email);
  } else {
    emailEr.textContent = "잘못된 이메일 형식입니다";
    renderErOutline(email);
  }
});

email.addEventListener("focusin", function () {
  const emailValue = email.value;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailPattern.test(emailValue)) {
    renderOutline(email);
  }
});

password.addEventListener("focusout", function (e) {
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
});

password.addEventListener("focusin", function () {
  const passwordValue = password.value;

  if (passwordValue.length >= 8) {
    renderOutline(password);
  }
});

function login() {
  const emailValue = email.value;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = emailValue !== "" && emailPattern.test(emailValue);

  const passwordValue = password.value;
  const isPasswordValid = passwordValue.length >= 8;

  if (isEmailValid && isPasswordValid) {
    loginBtn.disabled = false;
  } else {
    loginBtn.disabled = true;
  }
}

email.addEventListener("input", login);
password.addEventListener("input", login);

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "./items.html";
});
