let signupEmail = document.querySelector('#signup-email');
let signupNickname = document.querySelector('#signup-nickname');
let signupPassword = document.querySelector('#signup-password');
let signupCheckPassword = document.querySelector('#signup-check-password');
let signupBtn = document.querySelector('.signup-btn');


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
  }
}


signupEmail.addEventListener('input', inputSignupEmail);
signupNickname.addEventListener('input', inputSignupNickname);
signupPassword.addEventListener('input', inputSignupPassword);
signupCheckPassword.addEventListener('input', inputSignupCheckPassword);
signupBtn.addEventListener('click')


