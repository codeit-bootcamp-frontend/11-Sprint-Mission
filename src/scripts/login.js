// 로그인 버튼 활성화, 페이지 이동 기능을 담은 스크립트.

const loginButton = document.querySelector(".auth-btn");
const form = document.querySelector(".auth-form");

// 로그인 버튼 활성화/비활성화 함수
function toggleLoginButton() {
  const isEmailValid = emailPattern.test(emailInput.value);
  const isPasswordValid = passwordInput.value.length >= 8;

  if (
    isEmailValid &&
    isPasswordValid &&
    !document.querySelector(".error-message")
  ) {
    loginButton.disabled = false;
    loginButton.classList.add("auth-btn-active");
  } else {
    loginButton.disabled = true;
    loginButton.classList.remove("auth-btn-active");
  }
}

// 부모 요소에 이벤트 위임으로 input 이벤트 등록
// 일반적으로 사용자들은 비밀번호까지 입력 후 바로 엔터를 누르는데, focusout에 등록한 경우 버튼색이 변하지 않음
// 따라서 input이벤트에 이벤트를 등록함

// ++ 기존 button type이 submit이어서 엔터가 동작했는데, api없이 type을 submit으로 하니 405에러가 발생함
// 고로 엔터 없이 클릭으로만 버튼을 누른다고 가정하고, focusout으로 다시 설정
// form.addEventListener("input", toggleLoginButton);

form.addEventListener("focusout", toggleLoginButton);

// 로그인 버튼 클릭 시 /items로 이동
loginButton.addEventListener("click", function (event) {
  if (!loginButton.disabled) {
    window.location.href = "./items";
  }
});
