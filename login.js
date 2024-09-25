const input = document.querySelector("input");
const email = document.querySelector("input.myEmail");
const password = document.querySelector("input.myPw");
const emailEr = document.querySelector("div.emailError");

email.addEventListener("focusout", function (e) {
  const emailValue = email.value;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailValue == "") {
    emailEr.textContent = "이메일을 입력해주세요";
    input.style.outline = "2px solid red";
  } else if (emailPattern.test(emailValue)) {
    emailEr.textContent = "";
    input.style.outline = "0";
  } else {
    emailEr.textContent = "잘못된 이메일 형식입니다";
    input.style.outline = "2px solid red";
  }
});
