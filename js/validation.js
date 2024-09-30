/**
 * validation 체크함수
 */

const regexEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

function isNullValue(val) {
  const inputValue = val.trim();
  if (inputValue === "") {
    return true;
  }
  return false;
}

// 공백 문자열리턴함수
const errorNullTextMsg = (type) => {
  let msg = "";

  if (type === "email") {
    msg = "이메일을 입력해주세요.";
  }

  if (type === "nickname") {
    msg = "닉네임을 입력해주세요.";
  }

  if (type === "password") {
    msg = "비밀번호를 입력해주세요.";
  }
  return msg;
};

export { isNullValue, regexEmail, errorNullTextMsg };
