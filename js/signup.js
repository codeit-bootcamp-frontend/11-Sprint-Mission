import { activePasswordVisibility, checkInputFormat, addError} from './components/input.js'

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
    //console.log(isValid);
    setSignUpInputValid(isValid); 
    addError(isValid); //에러 메세지 추가하기
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

//로그인 버튼 제출했을 때의 함수 = 로그인 버튼 클릭했을 때의 함수
function submitSignup(e) {
  e.preventDefault(); 

  if(activeSignupBtn()){
    console.log('로그인 제출:', {
      signupEmail: signupEmail.value,
      signupNickname: signupNickname.value,
      signupPassword: signupPassword.value,
      signupCheckPassword: signupCheckPassword.value
    });

    ///signin.html로 이동 
    window.location.href = '/signin.html';
  } else {
    console.log('입력이 부족합니다.')
  }

}
signupBtn.addEventListener('click', submitSignup);



const signupPasswordVisibility = document.querySelector('.signup-password-visibility');
const signupCheckpasswordVisibility = document.querySelector('.signup-checkpassword-visibility');

console.log(signupCheckpasswordVisibility);

signupPasswordVisibility.addEventListener('click', () => activePasswordVisibility(signupPasswordVisibility));
signupCheckpasswordVisibility.addEventListener('click', () => activePasswordVisibility(signupCheckpasswordVisibility));