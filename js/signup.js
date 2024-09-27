import { activePasswordVisibility } from './components/label.js'

const signupEmail = document.querySelector('#signup-email');
const signupNickname = document.querySelector('#signup-nickname');
const signupPassword = document.querySelector('#signup-password');
const signupCheckPassword = document.querySelector('#signup-check-password');
const signupBtn = document.querySelector('.signup-btn');

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

[signupEmail, signupNickname, signupPassword, signupCheckPassword].forEach((input) => {
  input.addEventListener('input', activeSignupBtn);
})



const signupPasswordVisibility = document.querySelector('.signup-password-visibility');
const signupCheckpasswordVisibility = document.querySelector('.signup-checkpassword-visibility');

console.log(signupCheckpasswordVisibility);

signupPasswordVisibility.addEventListener('click', () => activePasswordVisibility(signupPasswordVisibility));
signupCheckpasswordVisibility.addEventListener('click', () => activePasswordVisibility(signupCheckpasswordVisibility));