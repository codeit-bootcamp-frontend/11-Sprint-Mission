const pwVisibilityToggleBtn = document.querySelectorAll(".btn-toggle"); // [sprint3 리뷰 반영] 변수명 직관적으로 변경
const inputs = document.querySelectorAll(".input-area > input");
const btnSubmit = document.querySelector("button[type=submit]"); // 회원가입 버튼

/**
 * 비밀번호와 비밀번호 확인의 type을 변경하는 함수
 * @param {*} e
 */
function togglePwVisibility(e) {
  // [sprint3 리뷰 반영] 함수명 직관적으로 변경
  const inputPw = e.target.closest(".password").querySelector(".pw"); // 비밀번호 | 비밀번호 확인 input 요소
  const type = inputPw.getAttribute("type"); // 비밀번호 | 비밀번호 확인 input의 type 속성

  // [sprint3 리뷰 반영] if문 3항 연산자 사용해 코드 간결하게 수정
  inputPw.setAttribute("type", type === "password" ? "text" : "password");
}

/**
 * 폼 태그의 모든 입력이 입력 되었는지 확인하는 함수
 * @param {*} e
 */
function isFormValid(e) {
  const form = e.target.closest("form");
  const inputs = form.querySelectorAll("input");
  const isFormAllFilled = Array.from(inputs).every(
    (input) => input.value.trim() !== ""
  ); // form의 모든 input 요소의 값이 공백 아닌지 확인

  checkPasswordMatch(isFormAllFilled); // 비밀번호 일치 확인을 위해 checkPasswordMatch 함수 호출
}

/**
 * 비밀번호와 비밀번호 확인이 일치하는지 확인하는 함수
 * @param {*} isFormAllFilled
 */
function checkPasswordMatch(isFormAllFilled) {
  const pwValue = document.querySelector("#input_password").value.trim();
  const pwConfirmValue = document
    .querySelector("#input_password_confirm")
    .value.trim();

  btnSubmit.disabled =
    isFormAllFilled && pwValue === pwConfirmValue ? false : true; // 모든 입력이 공백이 아니고, 비밀번호가 일치하면 회원가입 버튼 활성화
}

function validateForm(e) {
  isFormValid(e);
}

pwVisibilityToggleBtn.forEach((btn) => {
  btn.addEventListener("click", togglePwVisibility);
});

inputs.forEach((input) => {
  input.addEventListener("input", validateForm);
});
