import { activePasswordVisibility, checkInputFormat} from './components/label.js'

const signupEmail = document.querySelector('#signup-email');
const signupNickname = document.querySelector('#signup-nickname');
const signupPassword = document.querySelector('#signup-password');
const signupCheckPassword = document.querySelector('#signup-check-password');
const signupBtn = document.querySelector('.signup-btn');

let isEmailValid = false;
let isPasswordValid = false;
let isNicknameValid = false;
let isCheckPasswordValid = false;

//input 값 validation에 따라 빨간색 아웃라인을 추가  
[signupEmail, signupNickname, signupPassword, signupCheckPassword].forEach((input) => {
  input.addEventListener('focusout', (e) => {
    checkInputFormat(event, signupPassword.value);
    let isValid = checkInputFormat(event, signupPassword.value);
    console.log(isValid);
    setSignUpInputValid(isValid); 
  });
})

//각 input별로 validation 확인하는 함수 
function setSignUpInputValid(input){
  input[0] === 'email' ? isEmailValid = input[1] :
  input[0] === 'password' ? isPasswordValid = input[1] :
  input[0] === 'nickname' ? isNicknameValid = input[1] :
  input[0] === 'checkpassword' ? isCheckPasswordValid = input[1] :
  null

  activeSignupBtn();
}

//로그인 버튼 활성화 하는 함수
function activeSignupBtn(){
  const workSignupBtn = (isEmailValid && isPasswordValid && isNicknameValid && isCheckPasswordValid);
  signupBtn.classList.toggle('active', workSignupBtn );
  
  return workSignupBtn;
}

[signupEmail, signupNickname, signupPassword, signupCheckPassword].forEach((input) => {
  input.addEventListener('input', activeSignupBtn);
})





const signupPasswordVisibility = document.querySelector('.signup-password-visibility');
const signupCheckpasswordVisibility = document.querySelector('.signup-checkpassword-visibility');

console.log(signupCheckpasswordVisibility);

signupPasswordVisibility.addEventListener('click', () => activePasswordVisibility(signupPasswordVisibility));
signupCheckpasswordVisibility.addEventListener('click', () => activePasswordVisibility(signupCheckpasswordVisibility));