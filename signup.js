const emailInput = document.getElementById("email");
const nicknameInput = document.getElementById("nickname");
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("password-confirm");
const toggleIcon = document.getElementById("toggleIcon");
const toggleConfirmIcon = document.getElementById("toggleConfirmIcon");
const visibilityOnIcon = "img/ic_visibility_on.png"; // 눈 모양 아이콘 (비밀번호 보임)
const visibilityOffIcon = "img/ic_visibility_off.png"; // 눈 모양에 사선 (비밀번호 숨김)
const emailError = document.getElementById("emailError");
const nicknameError = document.getElementById("nicknameError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const signupBtn = document.getElementById("signupBtn");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식 확인 정규식

// // 이메일 유효성 검사
// emailInput.onblur = function () {
//   if (!emailInput.value) {
//     emailInput.classList.add("error");
//     emailError.style.visibility = "visible";
//     emailError.innerHTML = "이메일을 입력해주세요.";
//   } else if (!emailRegex.test(emailInput.value)) {
//     emailInput.classList.add("error");
//     emailError.style.visibility = "visible";
//     emailError.innerHTML = "잘못된 이메일 형식입니다.";
//   } else {
//     emailInput.classList.remove("error");
//     emailError.style.visibility = "hidden";
//     emailError.innerHTML = "";
//   }
// };

// // 닉네임 유효성 검사
// nicknameInput.onblur = function () {
//   if (!nicknameInput.value) {
//     nicknameInput.classList.add("error");
//     nicknameError.style.visibility = "visible";
//     nicknameError.innerHTML = "닉네임을 입력해주세요.";
//   } else {
//     nicknameInput.classList.remove("error");
//     nicknameError.style.visibility = "hidden";
//     nicknameError.innerHTML = "";
//   }
// };

// // 비밀번호 유효성 검사
// passwordInput.onblur = function () {
//   const passwordLimitLength = 8;

//   if (!passwordInput.value) {
//     passwordInput.classList.add("error");
//     passwordError.style.visibility = "visible";
//     passwordError.innerHTML = "비밀번호를 입력해주세요.";
//   } else if (passwordInput.value.length < passwordLimitLength) {
//     passwordInput.classList.add("error");
//     passwordError.style.visibility = "visible";
//     passwordError.innerHTML = "비밀번호를 8자 이상 입력해주세요.";
//   } else {
//     passwordInput.classList.remove("error");
//     passwordError.style.visibility = "hidden";
//     passwordError.innerHTML = "";
//   }
// };

// // 비밀번호 확인 유효성 검사
// passwordConfirmInput.onblur = function () {
//   if (passwordConfirmInput.value !== passwordInput.value) {
//     passwordConfirmInput.classList.add("error");
//     confirmPasswordError.style.visibility = "visible";
//     confirmPasswordError.innerHTML = "비밀번호가 일치하지 않습니다.";
//   } else {
//     passwordConfirmInput.classList.remove("error");
//     confirmPasswordError.style.visibility = "hidden";
//     confirmPasswordError.innerHTML = "";
//   }
// };

// 눈 모양 아이콘 설정
toggleIcon.addEventListener("click", function () {
  // 현재 비밀번호 입력 필드의 type이 'password'라면 'text'로 변경하여 보이게 함
  if (passwordInput.type === "password") {
    passwordInput.type = "text"; // 비밀번호 보이도록
    toggleIcon.src = visibilityOnIcon; // 눈 모양 아이콘으로 변경
  } else {
    passwordInput.type = "password"; // 비밀번호 가리도록
    toggleIcon.src = visibilityOffIcon; // 사선이 그어진 눈 모양 아이콘으로 변경
  }
});

// 비번 확인 필드 눈 모양 아이콘 설정
toggleConfirmIcon.addEventListener("click", function () {
  // 현재 비밀번호 입력 필드의 type이 'password'라면 'text'로 변경하여 보이게 함
  if (passwordConfirmInput.type === "password") {
    passwordConfirmInput.type = "text"; // 비밀번호 보이도록
    toggleConfirmIcon.src = visibilityOnIcon; // 눈 모양 아이콘으로 변경
  } else {
    passwordConfirmInput.type = "password"; // 비밀번호 가리도록
    toggleConfirmIcon.src = visibilityOffIcon; // 사선이 그어진 눈 모양 아이콘으로 변경
  }
});

// 모든 입력이 유효할 때 회원가입 버튼 활성화
function checkForm() {
  const emailValid = emailRegex.test(emailInput.value); // 이메일 유효성 검사
  const nicknameValid = nicknameInput.value && !nicknameError.innerHTML;
  const passwordValid =
    passwordInput.value.length >= 8 && !passwordError.innerHTML;
  const confirmPasswordValid =
    passwordConfirmInput.value === passwordInput.value &&
    !confirmPasswordError.innerHTML;

  if (emailValid && nicknameValid && passwordValid && confirmPasswordValid) {
    signupBtn.classList.add("active");
    signupBtn.disabled = false; // 버튼 활성화
  } else {
    signupBtn.classList.remove("active");
    signupBtn.disabled = true; // 버튼 비활성화
  }
}

// 이메일과 비밀번호 입력 필드에서 입력할 때마다 checkForm 호출
emailInput.addEventListener("input", () => {
  // 이메일 유효성 검사와 오류 메시지 처리
  if (!emailRegex.test(emailInput.value)) {
    emailInput.classList.add("error");
    emailError.style.visibility = "visible";
    emailError.innerHTML = "잘못된 이메일 형식입니다.";
  } else {
    emailInput.classList.remove("error");
    emailError.style.visibility = "hidden";
    emailError.innerHTML = "";
  }
  checkForm(); // 버튼 상태 업데이트
});

emailInput.onblur = function () {
  if (!emailInput.value) {
    emailInput.classList.add("error");
    emailError.style.visibility = "visible";
    emailError.innerHTML = "이메일을 입력해주세요.";
  } else if (!emailRegex.test(emailInput.value)) {
    emailInput.classList.add("error");
    emailError.style.visibility = "visible";
    emailError.innerHTML = "잘못된 이메일 형식입니다.";
  } else {
    emailInput.classList.remove("error");
    emailError.style.visibility = "hidden";
    emailError.innerHTML = "";
  }
};

// 닉네임 입력 필드에서 입력할 때마다 checkForm 호출
nicknameInput.addEventListener("input", () => {
  // 닉네임 유효성 검사와 오류 메시지 처리
  if (!nicknameInput.value) {
    nicknameInput.classList.add("error");
    nicknameError.style.visibility = "visible";
    nicknameError.innerHTML = "닉네임을 입력해주세요.";
  } else {
    nicknameInput.classList.remove("error");
    nicknameError.style.visibility = "hidden";
    nicknameError.innerHTML = "";
  }
  checkForm(); // 버튼 상태 업데이트
});

passwordInput.addEventListener("input", () => {
  // 비밀번호 유효성 검사와 오류 메시지 처리
  if (passwordInput.value.length < 8) {
    passwordInput.classList.add("error");
    passwordError.style.visibility = "visible";
    passwordError.innerHTML = "비밀번호를 8자 이상 입력해주세요.";
  } else {
    passwordInput.classList.remove("error");
    passwordError.style.visibility = "hidden";
    passwordError.innerHTML = "";
  }
  checkForm(); // 버튼 상태 업데이트
});

// 비밀번호 확인 유효성 검사
passwordConfirmInput.addEventListener("input", () => {
  if (passwordInput.value !== passwordConfirmInput.value) {
    passwordConfirmInput.classList.add("error");
    passwordConfirmError.style.visibility = "visible";
    passwordConfirmError.innerHTML = "비밀번호가 일치하지 않습니다.";
  } else {
    passwordConfirmInput.classList.remove("error");
    passwordConfirmError.style.visibility = "hidden";
    passwordConfirmError.innerHTML = "";
  }
  checkForm();
});

// 회원가입 버튼 클릭 시 이동
signupBtn.onclick = function (event) {
  event.preventDefault(); // 기본 동작 방지
  if (!signupBtn.disabled) {
    document.location.href = "/login.html"; // 유효한 입력이 모두 있으면 /login으로 이동
  }
};
