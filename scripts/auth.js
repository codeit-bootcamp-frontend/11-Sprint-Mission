// 로그인과 회원가입 페이지에 공통된 이메일과 비밀번호 유효성 체크, 비밀번호 토글, 에러 메시지 추가 및 제거 함수를 공통 스크립트로써 작성.

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.querySelector(".toggle-password");

// 이메일 유효성 검사를 위한 정규식
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 경우에 따른 에러메시지를 추가하는 함수
function showErrorMessage(inputElement, message) {
  // 이메일과 비밀번호에 공통적으로 적용할 수 있는 부모 노드인 .input-wrapper를 사용
  let wrapper = inputElement.closest(".input-wrapper");
  let errorMessage = wrapper.querySelector(".error-message");

  if (!errorMessage) {
    errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    wrapper.appendChild(errorMessage); // 부모 wrapper에 에러 메시지 추가
  }

  errorMessage.textContent = message;

  // 유효성 검사 후 수정&재입력한 값도 유효하지 않은 경우를 식별하기 위해 클래스를 재등록하여 리플로우 유발
  inputElement.classList.remove("error");
  void inputElement.offsetWidth;
  inputElement.classList.add("error");
}

// 에러 메시지 제거 함수
function clearErrorMessage(inputElement) {
  let wrapper = inputElement.closest(".input-wrapper");
  let errorMessage = wrapper.querySelector(".error-message");

  if (errorMessage) {
    errorMessage.remove();
  }

  inputElement.classList.remove("error");
}

// 이메일 유효성 검사
emailInput.addEventListener("focusout", function () {
  // 값이 없는 경우
  if (emailInput.value === "") {
    if (!emailInput.classList.contains("error")) {
      emailInput.classList.add("error");
    }
    showErrorMessage(emailInput, "이메일을 입력해주세요.");
  }
  // 값은 있으나 유효하지 않은 형식인 경우
  else if (!emailPattern.test(emailInput.value)) {
    if (!emailInput.classList.contains("error")) {
      emailInput.classList.add("error");
    }
    showErrorMessage(emailInput, "잘못된 이메일입니다.");
  }
  // 값이 올바른 형식으로 입력된 경우
  else {
    emailInput.classList.remove("error");
    clearErrorMessage(emailInput);
  }
});

// 비밀번호 유효성 검사
passwordInput.addEventListener("focusout", function () {
  if (passwordInput.value === "") {
    if (!passwordInput.classList.contains("error")) {
      passwordInput.classList.add("error");
    }
    showErrorMessage(passwordInput, "비밀번호를 입력해주세요.");
  } else if (passwordInput.value.length < 8) {
    if (!passwordInput.classList.contains("error")) {
      passwordInput.classList.add("error");
    }
    showErrorMessage(passwordInput, "비밀번호를 8자 이상 입력해주세요");
  } else {
    passwordInput.classList.remove("error");
    clearErrorMessage(passwordInput);
  }
});

// 비밀번호 표시/숨김 토글 기능
togglePassword.addEventListener("click", function () {
  // 현재 입력 필드의 type이 'password'인지 확인
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type); // type 변경

  // 아이콘 변경 (눈 모양 이미지의 src 속성을 변경)
  this.src =
    type === "text"
      ? "/images/icons/password-invisible.svg"
      : "/images/icons/password-visible.png"; // 예시로 src 변경
});
