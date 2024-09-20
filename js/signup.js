const signupEmail = document.querySelector('#signup-email');
const signupNickname = document.querySelector('#signup-nickname');
const signupPassword = document.querySelector('#signup-password');
const signupCheckPassword = document.querySelector('#signup-check-password');
const signupBtn = document.querySelector('.signup-btn');


function inputSignupEmail(){
  activeSignupBtn()
}

function inputSignupNickname(){
  activeSignupBtn()
}

function inputSignupPassword(){
  activeSignupBtn()
}

function inputSignupCheckPassword(){
  activeSignupBtn()
}

function activeSignupBtn(){
  if( signupEmail.value.length > 0 &&
      signupNickname.value.length > 0 &&
      signupPassword.value.length > 0 &&
      signupCheckPassword.value.length > 0 &&
      signupPassword.value === signupCheckPassword.value
  ) {
    signupBtn.classList.add('active');
  } else {
    signupBtn.classList.remove('active');
  }
}


signupEmail.addEventListener('input', inputSignupEmail);
signupNickname.addEventListener('input', inputSignupNickname);
signupPassword.addEventListener('input', inputSignupPassword);
signupCheckPassword.addEventListener('input', inputSignupCheckPassword);
//signupBtn.addEventListener('click')


let SignupPasswordVisibility = document.querySelector('.signup-password-visibility');
let SignupCheckpasswordVisibility = document.querySelector('.signup-checkpassword-visibility');

console.log(SignupPasswordVisibility);


function setSignupPasswordVisibility() {
  let img = SignupPasswordVisibility.getAttribute('src');
  if(img === './img/btn_visibility_off.svg'){
    SignupPasswordVisibility.setAttribute('src', './img/btn_visibility_on.svg');
    SignupPasswordVisibility.previousElementSibling.setAttribute('type', 'text');
  } else {
    SignupPasswordVisibility.setAttribute('src', './img/btn_visibility_off.svg');
    SignupPasswordVisibility.previousElementSibling.setAttribute('type', 'password');
  }
}

function setSignupCheckpasswordVisibility() {
  let img = SignupCheckpasswordVisibility.getAttribute('src');
  if(img === './img/btn_visibility_off.svg'){
    SignupCheckpasswordVisibility.setAttribute('src', './img/btn_visibility_on.svg');
    SignupCheckpasswordVisibility.previousElementSibling.setAttribute('type', 'text');
  } else {
    SignupCheckpasswordVisibility.setAttribute('src', './img/btn_visibility_off.svg');
    SignupCheckpasswordVisibility.previousElementSibling.setAttribute('type', 'password');
  }
}


SignupPasswordVisibility.addEventListener('click', setSignupPasswordVisibility);
SignupCheckpasswordVisibility.addEventListener('click', setSignupCheckpasswordVisibility);