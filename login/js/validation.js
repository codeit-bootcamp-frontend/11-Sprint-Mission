/* 입력값이 올바른 형태가 아닐때
* @와 . 이 포함되지 않으면 이메일의 형태가 아니다.
* 입력값이 8개 이상이 아니면 비밀번호의 형태가 아니다.
* 입력값에 @와 . 이 포함되어 있나 확인해보자. 다른 분꺼 참조
* 먼저 요소 노드를 선택하고 묶어서 선택해야하나? 각각 선택해야하나?
* 에서 생각이 멈추어 다른분과 chatGPT의 도움을 받으며 만들었습니다.
*
*/ 

//함수 안에 있는 변수 선언을 밖으로 빼면 왜 실행이 안될까요?
function checkEmail() {
  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const email = emailInput.value.trim(); 
  if (!regex.test(email)) { // 제출된 다른 분의 방법을 참조
    emailError.textContent = "잘못된 이메일 형식입니다.";
    emailInput.classList.add('error');
  }else{
    emailError.textContent = "";
    emailInput.classList.remove('error');
  }
}

function checkPassword() {
  const password = document.getElementById('password');
  const passwordError = document.getElementById('passwordError');
  if (password.value.length < 8) {
    passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
    password.classList.add('error')
  } else {
    passwordError.textContent = "";
    password.classList.remove('error');
  } 
}

function comparePassword() {
  const password = document.getElementById('password');
  const comparePassword = document.getElementById('comparePassword');
  const comparePasswordError = document.getElementById('comparePasswordError');
  if (password.value.length < 8) {
    comparePasswordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
    comparePassword.classList.add('error')
  } else if (password.value !== comparePassword.value ) {
    comparePasswordError.textContent = "비밀번호가 일치하지 않습니다.";
    comparePassword.classList.add('error')
  } else {
    comparePasswordError.textContent = "";
    comparePassword.classList.remove('error');
  } 
}

function activationLogin() {
  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  const emailInput = document.getElementById('email');
  const email = emailInput.value.trim(); 
  const password = document.getElementById('password');
  const loginButton = document.getElementById('loginButton')

  if (regex.test(email) &&
    password.value.length >= 8
  ) {
    loginButton.classList.add('active');
  } else {
    loginButton.classList.remove('active');
  } 
}



export {
  comparePassword,
  checkEmail,
  checkPassword,
  activationLogin,
}