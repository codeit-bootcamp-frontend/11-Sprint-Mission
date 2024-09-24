const input = document.querySelectorAll(".input-box");
const button = document.querySelector(".signup-btn");
const eye = document.querySelectorAll(".eye");

const focusOut = (e) => {
  const getValue = e.target.value;
  const getType = e.target.type;
  const getID = e.target.id;
  let noticeMessage = "";

  const emailNotice = document.querySelector(".notice-email");
  const passwordNotice = document.querySelector(".notice-password");
  const pwdconfirmNotice = document.querySelector(".notice-password-confirm");
  const nicknameNotice = document.querySelector(".notice-nickname");

  if (getType == "email") {
    noticeMessage = emailCheck(getValue, noticeMessage);
    emailNotice.innerText = noticeMessage;
  } else if (getID == "password") {
    noticeMessage = pwdCheck(getValue, noticeMessage);
    passwordNotice.innerText = noticeMessage;
  } else if (getID == "password-confirm") {
    noticeMessage = pwdCheck(getValue, noticeMessage, true);
    pwdconfirmNotice.innerText = noticeMessage;
  } else {
    if (getValue.length < 1) {
      noticeMessage = "닉네임을 입력해주세요.";
    }
    nicknameNotice.innerText = noticeMessage;
  }

  // 알림 활성화
  if (noticeMessage.length > 0) {
    e.target.classList.add("input-notice");
  } else {
    e.target.classList.remove("input-notice");
  }

  // 다른 input에 값이 있는지 체크
  const checkInput = emptyCheck(input);

  // 버튼 활성화
  if (
    checkInput &&
    emailNotice.innerText.length < 1 &&
    passwordNotice.innerText.length < 1 &&
    pwdconfirmNotice.innerText.length < 1 &&
    nicknameNotice.innerText.length < 1
  ) {
    // 알림 메시지가 없고, input에 값이 있는 경우
    button.classList.add("signup-btn-active");
    button.disabled = false;
  } else {
    button.classList.remove("signup-btn-active");
    button.disabled = true;
  }
};

const loginClick = (e) => {
  console.log(e);
};

for (let i = 0; i < input.length; i++) {
  input[i].addEventListener("focusout", focusOut);
}

for (let i = 0; i < eye.length; i++) {
  // 비밀번호 숨김 기능
  eye[i].addEventListener("click", (e) => showPassword(e));
}

button.addEventListener("click", loginClick);
