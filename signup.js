const email = document.querySelector(".myEmail");
const nickname = document.querySelector(".myNickname");
const password = document.querySelector(".myPw");
const passwordCheck = document.querySelector(".checkMyPw");
const emailEr = document.querySelector(".emailError");
const nicknameEr = document.querySelector(".nicknameError");
const passwordEr = document.querySelector(".passwordError");
const passwordCheckEr = document.querySelector(".checkPwError");

email.addEventListener("focusout", function () {
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

nickname.addEventListener("focusout", function () {
  const nicknameValue = nickname.value;

  if (nicknameValue == "") {
    nicknameEr.textContent = "닉네임을 입력해주세요";
    nickname.style.outline = "2px solid red";
  } else {
    nicknameEr.textContent = "";
    nickname.style.outline = "0";
  }
});

password.addEventListener("focusout", function () {
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

passwordCheck.addEventListener("focusout", function () {
  const passwordCheckValue = passwordCheck.value;
  const passwordValue = password.value;

  if (passwordValue !== passwordCheckValue) {
    passwordCheckEr.textContent = "비밀번호가 일치하지 않습니다";
    passwordCheck.style.outline = "2px solid red";
  } else {
    passwordCheckEr.textContent = "";
    passwordCheck.style.outline = "0";
  }
});
