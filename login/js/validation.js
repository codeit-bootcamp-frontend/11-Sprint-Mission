//함수 안에 있는 변수 선언을 밖으로 빼면 왜 실행이 안될까요?
// chat GPT와 제출된 다른 분의 방법을 참조
function checkEmail() {
  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}'); 
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const email = emailInput.value.trim(); 
    if (emailInput.value.length < 1) { 
    emailError.textContent = "이메일을 입력해주세요.";
    emailInput.classList.add('error');
  }else if (!regex.test(email)) { 
    emailError.textContent = "잘못된 이메일 형식입니다.";
    emailInput.classList.add('error');
  }else{
    emailError.textContent = "";
    emailInput.classList.remove('error');
  }
}

function inputNickname() {
  const nickname = document.getElementById('nickname');
  const nicknameError = document.getElementById('nicknameError');
  if (nickname.value.length < 1) {
    nicknameError.textContent = "닉네임을 입력해주세요.";
    nickname.classList.add('error')
  } else {
    nicknameError.textContent = "";
    nickname.classList.remove('error');
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
  inputNickname,
}