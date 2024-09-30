const input = document.querySelectorAll(".input-box");
const button = document.querySelector(".login-btn");
const eye = document.querySelector(".eye");

const focusOut = (e) => {
  const getValue = e.target.value;
  const getType = e.target.type;
  let noticeMessage = "";

  const emailNotice = document.querySelector(".notice-email");
  const passwordNotice = document.querySelector(".notice-password");

  if (getType == "email") {
    noticeMessage = emailCheck(getValue, noticeMessage);
    emailNotice.innerText = noticeMessage;
  } else {
    noticeMessage = pwdCheck(getValue, noticeMessage);
    passwordNotice.innerText = noticeMessage;
  }

  // 알림 활성화
  if (noticeMessage.length > 0) {
    e.target.classList.add("input-notice");
  } else {
    e.target.classList.remove("input-notice");
  }

  // 다른 input에 값이 있는지 체크
  const checkInput = emptyCheck(input);

  // 로그인 버튼 활성화
  if (
    checkInput &&
    emailNotice.innerText.length < 1 &&
    passwordNotice.innerText.length < 1
  ) {
    button.classList.add("login-btn-active");
    button.disabled = false;
  } else {
    button.classList.remove("login-btn-active");
    button.disabled = true;
  }
};

const loginClick = (e) => {
  e.target.location.href = "/page/items/item.html";

};

for (let i = 0; i < input.length; i++) {
  input[i].addEventListener("focusout", focusOut);
}

// 비밀번호 숨김 기능
eye.addEventListener("click", (e) => showPassword(e));

button.addEventListener("click", loginClick);
