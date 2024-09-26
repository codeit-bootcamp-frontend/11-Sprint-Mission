const email = document.querySelector(".myEmail");
const nickname = document.querySelector(".myNickname");
const emailEr = document.querySelector(".emailError");
const nicknameEr = document.querySelector(".nicknameError");

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
