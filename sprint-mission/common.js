// 이메일 조건 체크
const emailCheck = (getValue = "", msg = "") => {
  if (getValue.length < 1) {
    msg = "이메일을 입력해주세요.";
  } else {
    const inputValArr = getValue.split("");
    const commercialCount = inputValArr.filter((dt) => dt == "@").length;
    const periodCount = inputValArr.filter((dt) => dt == ".").length;
    if (commercialCount != 1 || periodCount < 1) {
      msg = "잘못된 이메일 형식입니다.";
    }
  }

  return msg;
};

// 비밀번호 조건 체크
const pwdCheck = (getValue = "", msg = "", comfirm = false) => {
  if (comfirm) {
    const pwd = document.querySelector("#password");
    if (pwd.value != getValue) {
      msg = "비밀번호가 일치하지 않습니다.";
    }
  } else {
    if (getValue.length < 1) {
      msg = "비밀번호를 입력해주세요.";
    }
    if (getValue.length < 8) {
      msg = "비밀번호를 8자 이상 입력해주세요.";
    }
  }

  return msg;
};

// 비밀번호 숨김 기능
// **이전 요소를 참조하니 주의할 것**
const showPassword = (e) => {
  let prevElement = e.target.previousElementSibling;
  const status = e.target.classList.contains("show-eye");
  if (status) {
    e.target.classList.remove("show-eye");
    e.target.style.backgroundImage = "url(/img/public/ic_openEye.png)";
    prevElement.type = "password";
  } else {
    e.target.classList.add("show-eye");
    e.target.style.backgroundImage = "url(/img/public/ic_clossEye.png)";
    prevElement.type = "";
  }
};

// input 데이터 유무 체크
// 값이 하나라도 없으면 false
const emptyCheck = (e) => {
  try {
    for (let i = 0; i < e.length; i++) {
      if (e[i].value.length < 1) {
        return false;
      }
    }
    return true;
  } catch (e) {
    return false;
  }
};
