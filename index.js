//메인페이지
function updateLineBreak() {
  const bannerTitle = document.querySelector(".banner_title");
  const screenWidth = window.innerWidth;

  if (screenWidth >= 768 && screenWidth <= 1199) {
    bannerTitle.innerHTML = "일상의 모든 물건을 거래해 보세요"; // 태블릿 모드에서 <br> 제거
  } else {
    bannerTitle.innerHTML = "일상의 모든 물건을<br> 거래해 보세요"; // 다른 모드에서는 <br> 유지
  }
}
// 화면 크기가 변경될 때마다 실행
window.addEventListener("resize", updateLineBreak);
// 페이지 로드 시 처음 한 번 실행
window.addEventListener("load", updateLineBreak);

//로그인, 회원가입 페이지
const emailInput = document.getElementById("email");
const passwordInput = document.querySelector('input[type="password"]');
const loginButton = document.querySelector(".form_btn");
const nicknameInput = document.getElementById("nickname");
const passwordConfirmInput = document.getElementById("passwordConfirm");

// 로그인 페이지인지 회원가입 페이지인지 확인
if (
  document.body.contains(nicknameInput) &&
  document.body.contains(passwordConfirmInput)
) {
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
