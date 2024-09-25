const email = document.querySelector(".myEmail");
const password = document.querySelector(".myPw");
const emailEr = document.querySelector(".emailError");
const passwordEr = document.querySelector(".pwError");

email.addEventListener("focusout", function (e) {
  const emailValue = email.value;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailValue == "") {
    emailEr.textContent = "이메일을 입력해주세요";
    email.style.outline = "2px solid red";
  } else if (emailPattern.test(emailValue)) {
    emailEr.textContent = "";
    email.style.outline = "0";
  } else {
    emailEr.textContent = "잘못된 이메일 형식입니다";
    email.style.outline = "2px solid red";
  }
});

password.addEventListener("focusout", function (e) {
  const passwordValue = password.value;
  if (passwordValue == "") {
    passwordEr.textContent = "비밀번호를 입력해주세요";
    password.style.outline = "2px solid red";
  } else if (passwordValue.length >= 8) {
    passwordEr.textContent = "";
    password.style.outline = "0";
  } else {
    passwordEr.textContent = "비밀번호를 8자 이상 입력해주세요";
    password.style.outline = "2px solid red";
  }
});
