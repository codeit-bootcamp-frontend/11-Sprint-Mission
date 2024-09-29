//상수로 변수선언을 해보자. dom에서 
const emailInput = document.querySelector('.email-input');
const passwordInput = document.querySelector('.password-input');
const loginButton = document.querySelector('.login-button');

//이메일 형식을 정의
const emailPattern= /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/;

//email-input이 빈값일때 사용자에게 에러메시지 표현
const emailErrorMessage = document.createElement('span');
const passwordErrorMessage = document.createElement('span');

//클래스를 추가. 스타일링. 
emailErrorMessage.classList.add('error-message'); 
passwordErrorMessage.classList.add('error-message');

//부모요소div,span요소를추가해서,에러메시지를 추가한다.
emailInput.parentNode.appendChild(emailErrorMessage); // 에러 메시지를 input 아래에 추가
passwordInput.parentNode.appendChild(passwordErrorMessage);

// 이메일 유효성 검사 함수 정의
// 입력값이 비어있는지 또는 잘못된 형식인지를 확인하기 위해 설정



export function checkEmail() {
  if (emailInput.value.trim() === "") {
    //input-error클래스 추가
    emailInput.classList.add('input-error'); // 테두리에 빨간색 추가
    //span요소가 무엇을 표시할지를 정의, 실제로 표시할 텍스트를 설정, 어떤 문제가 있는지
    emailErrorMessage.textContent = "이메일을 입력해주세요"; 
    //show-error클래스 추가
    emailErrorMessage.classList.add('show-error'); // 에러 메시지 표시
    //입력값이 있으면 검사
  } else if (!emailPattern.test(emailInput.value)) {
    //error 메시지 추가
    emailInput.classList.add('input-error');
    //어떤 문제인지 알려줌
    emailErrorMessage.textContent ="잘못된 이메일 형식입니다.";
    emailErrorMessage.classList.add('show-error'); 
  } else {
    //테두리와 메시지 제거
    emailInput.classList.remove('input-error');
    emailErrorMessage.classList.remove('show-error');
  }
  updateLoginButtonState();
}

//비밀번호 검사함수
export function checkPassword() {
  if(passwordInput.value.trim()==="") {
    passwordErrorMessage.textContent = "비밀번호를 입력해주세요.";
    passwordInput.classList.add('password-input-error');
    passwordErrorMessage.classList.add('show-error');
  } else if (passwordInput.value.length < 8) {
    passwordErrorMessage.textContent = "비밀번호를 8자 이상 입력해주세요.";
    passwordErrorMessage.classList.add('show-error');
    passwordInput.classList.add('password-input-error');
  } else {
    passwordInput.classList.remove('password-input-error');
    passwordErrorMessage.classList.remove('show-error');
  }
    updateLoginButtonState();
}

export function updateLoginButtonState() {
  const emailValid = emailInput.value.trim()
  !== ""&& emailPattern.test(emailInput.value);
  const passwordValid = passwordInput.value.trim()
  !== ""&& passwordInput.value.length >=8;

if(emailValid && passwordValid) {
  loginButton.disabled = false;
  } else {
  loginButton.disabled = true;
  }
}

/*
// 이벤트 함수 추가
emailInput.addEventListener('focusout', () => {
  checkEmail();
  updateLoginButtonState(); 
});
passwordInput.addEventListener('focusout', () => {
  checkPassword();
  updateLoginButtonState(); 
});
*/