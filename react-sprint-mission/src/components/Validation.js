// 이메일 조건 체크
const emailValidationMsg = (emailValue) => {
  let massage = "";
  const emailStrimValue = emailValue.trim();
  if (emailStrimValue.length < 1) {
    massage = "이메일을 입력해주세요.";
  } else {
    const refEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

    if (!refEx.test(emailStrimValue)) {
      massage = "잘못된 이메일 형식입니다.";
    }
  }

  return massage;
};

// 비밀번호 조건 체크
const pwdValidationMsg = (pwdValue, comfirm = false) => {
  let massage = "";
  const pwdStrimValue = pwdValue.trim();
  if (pwdStrimValue.length < 1) {
    massage = "비밀번호를 입력해주세요.";
    return massage;
  }

  if (comfirm) {
    const pwd = document.querySelector("#password");
    if (pwd.value !== pwdStrimValue) {
      massage = "비밀번호가 일치하지 않습니다.";
    }
  } else {
    if (pwdStrimValue.length < 8) {
      massage = "비밀번호를 8자 이상 입력해주세요.";
    }
  }

  return massage;
};

// 비밀번호 숨김 기능
// **이전 요소를 참조하니 주의할 것**
const showPassword = (e) => {
  let prevElement = e.target.previousElementSibling;
  const isPwdOpened = e.target.classList.contains("show-eye");

  if (isPwdOpened) {
    e.target.classList.remove("show-eye");
    e.target.style.backgroundImage = `url('${process.env.PUBLIC_URL}/assets/common/ic_clossEye.png')`;
    prevElement.type = "password";
  } else {
    e.target.classList.add("show-eye");
    e.target.style.backgroundImage = `url(${process.env.PUBLIC_URL}/assets/common/ic_openEye.png)`;
    prevElement.type = "";
  }
};

// input 데이터 유무 체크
// 값이 하나라도 없으면 false
const emptyCheck = (inputArr) => {
  return inputArr.reduce((acc, cur) => {
    if (cur.length < 1) {
      acc = false;
    }
    return acc;
  }, true);
};

export { emailValidationMsg, pwdValidationMsg, showPassword, emptyCheck };
