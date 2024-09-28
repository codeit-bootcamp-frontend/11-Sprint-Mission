//함수 안에 있는 변수 선언을 밖으로 빼면 왜 실행이 안될까요?
// chat GPT와 제출된 다른 분의 방법을 참조
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
//값을 밖으로 빼면 로그인 사이트가 함수 실행이 안되고 안으로 넣으면 comparePassword값을 무시

function activationLogin2() {

  const emailValue = emailInput.value.trim(); 
  const passwordValue = password.value.trim(); 
  const nicknameValue = nickname.value.trim();
  const comparePasswordValue = comparePassword.value.trim();

  if (regex.test(emailValue) &&
    passwordValue.length >= 8 &&
    nicknameValue.length > 1 &&
    passwordValue === comparePasswordValue //왜? comparePassword값을 입력도 전에 활성화가 되죠? value값이 중복해서 붙으면 안됨.
  ) { // 이제는 활성화가 안됨. 다른 값은 입력하자 마자 값이 나오는데 왜 nickname 과 comparePassword만 값이 바로 나오지 않지? nickname.addEventListener('input', activationLogin); 이걸 입력하면 됨.
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