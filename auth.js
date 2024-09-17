// 각 입력 요소를 찾기 위한 변수를 선언
const emailInput = document.getElementById("email");
const nicknameInput = document.getElementById("nickname"); // 로그인 페이지에서는 존재하지 않을 수 있음
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("passwordConfirm"); // 로그인 페이지에서는 존재하지 않을 수 있음
const loginButton = document.getElementById("loginButton");

// 로그인 페이지인지 회원가입 페이지인지 확인
if (nicknameInput && passwordConfirmInput) {
  // 회원가입 페이지일 때
  function validateSignUpInputs() {
    const emailValue = emailInput.value.trim();
    const nicknameValue = nicknameInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const passwordConfirmValue = passwordConfirmInput.value.trim();

    if (
      emailValue !== "" &&
      nicknameValue !== "" &&
      passwordValue !== "" &&
      passwordConfirmValue !== "" &&
      passwordValue === passwordConfirmValue
    ) {
      loginButton.disabled = false;
      loginButton.classList.add("active");
    } else {
      loginButton.disabled = true;
      loginButton.classList.remove("active");
    }
  }

  emailInput.addEventListener("input", validateSignUpInputs);
  nicknameInput.addEventListener("input", validateSignUpInputs);
  passwordInput.addEventListener("input", validateSignUpInputs);
  passwordConfirmInput.addEventListener("input", validateSignUpInputs);
} else {
  // 로그인 페이지일 때
  function validateLoginInputs() {
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (emailValue !== "" && passwordValue !== "") {
      loginButton.disabled = false;
      loginButton.classList.add("active");
    } else {
      loginButton.disabled = true;
      loginButton.classList.remove("active");
    }
  }

  emailInput.addEventListener("input", validateLoginInputs);
  passwordInput.addEventListener("input", validateLoginInputs);
}
