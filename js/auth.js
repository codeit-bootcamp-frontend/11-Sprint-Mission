const btnsTogglePw = document.querySelectorAll(".btn-toggle");
const inputs = document.querySelectorAll(".input-area > input");

/**
 * 비밀번호와 비밀번호 확인의 type을 변경하는 함수
 * @param {*} e
 */
function changeTypePw(e) {
  const inputPw = e.target.closest(".password").querySelector(".pw"); // 비밀번호 | 비밀번호 확인 input 요소
  const type = inputPw.getAttribute("type"); // 비밀번호 | 비밀번호 확인 input의 type 속성

  if (type === "password") {
    inputPw.setAttribute("type", "text"); // type이 password면 text로 변경
  } else {
    inputPw.setAttribute("type", "password"); // type이 text면 password로 변경
  }
}

/**
 * form의 모든 input 태그들이 공백인지 확인하는 함수
 * @param {*} e
 */
function checkIsFilled(e) {
  const form = e.target.closest("form");
  const inputs = form.querySelectorAll("input");
  const btnSubmit = form.querySelector("button[type=submit]"); // 로그인 | 회원가입 버튼
  const isFormValid = Array.from(inputs).every(
    (input) => input.value.trim() !== ""
  ); // form의 모든 input 요소의 값이 공백 아닌지 확인
  const pwConfirm = form.querySelector("#input_password_confirm");

  if (pwConfirm) {
    // 비밀번호 확인이 있는 경우(회원가입 페이지)
    const pwValue = form.querySelector("#input_password").value.trim();
    const pwConfirmValue = pwConfirm.value.trim();
    const isPasswordMath = pwValue === pwConfirmValue;

    if (isFormValid && isPasswordMath) {
      // 회원가입 페이지 : 비밀번호와 비밀번호 확인도 일치해야
      btnSubmit.disabled = false; // 전송 버튼 활성화
    } else {
      btnSubmit.disabled = true; // 전송 버튼 비활성화
    }
  } else {
    // 로그인 페이지 : input 요소가 모두 채워지기만 하면
    if (isFormValid) {
      btnSubmit.disabled = false; // 전송 버튼 활성화
    } else {
      btnSubmit.disabled = true; // 전송 버튼 비활성화
    }
  }
}

btnsTogglePw.forEach((btn) => {
  btn.addEventListener("click", changeTypePw);
});

inputs.forEach((input) => {
  input.addEventListener("input", checkIsFilled);
});
