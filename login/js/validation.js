const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}'); 
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');

function checkEmail() {
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

const nickname = document.getElementById('nickname');
const nicknameError = document.getElementById('nicknameError');

function inputNickname() {
  if (nickname.value.length < 1) {
    nicknameError.textContent = "닉네임을 입력해주세요.";
    nickname.classList.add('error')
  } else {
    nicknameError.textContent = "";
    nickname.classList.remove('error');
  } 
}

const password = document.getElementById('password');
const passwordError = document.getElementById('passwordError');

function checkPassword() {
  if (password.value.length < 8) {
    passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
    password.classList.add('error')
  } else {
    passwordError.textContent = "";
    password.classList.remove('error');
  } 
}

const comparePassword = document.getElementById('comparePassword');
const comparePasswordError = document.getElementById('comparePasswordError');

function comparePasswords() {
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

const loginButton = document.getElementById('loginButton');

function activationLogin2() {
  const emailValue = emailInput.value.trim(); 
  const passwordValue = password.value.trim(); 
  const nicknameValue = nickname.value.trim();
  const comparePasswordValue = comparePassword.value.trim();
  if (regex.test(emailValue) &&
    passwordValue.length >= 8 &&
    nicknameValue.length > 1 &&
    passwordValue === comparePasswordValue 
  ) { 
    loginButton.disabled = false
    loginButton.classList.add('active');
  } else {
    loginButton.disabled = true
    loginButton.classList.remove('active');
  }  
}

function activationLogin() {
  const emailValue = emailInput.value.trim(); 
  const passwordValue = password.value.trim(); 
  if (regex.test(emailValue) &&
    passwordValue.length >= 8
  ) { 
    loginButton.disabled = false
    loginButton.classList.add('active');
  } else {
    loginButton.disabled = true
    loginButton.classList.remove('active');
  }  
}

const eyeButton = document.getElementById('eyeButton')
const eyeButton2 = document.getElementById('eyeButton2')
 
function checkingPassword(){
  const currentType = password.getAttribute("type");
  if (currentType === "password") {
    password.setAttribute("type", "text");
    eyeButton.src = "../img/open-eye.png"; 
  } else {
    password.setAttribute("type", "password");
    eyeButton.src = "../img/close-eye.png"; 
  }
}

function checkingPassword2(){
  const currentType = comparePassword.getAttribute("type");
  if (currentType === "password") {
    comparePassword.setAttribute("type", "text");
    eyeButton2.src = "../img/open-eye.png"; 
  } else {
    comparePassword.setAttribute("type", "password");
    eyeButton2.src = "../img/close-eye.png"; 
  }
}

export {
  comparePasswords,
  checkEmail,
  checkPassword,
  activationLogin,
  activationLogin2,
  inputNickname,
  checkingPassword,
  checkingPassword2,
}