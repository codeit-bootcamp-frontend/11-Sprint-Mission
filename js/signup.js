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

const SignupPasswordVisibility = document.querySelector('.signup-password-visibility');
const SignupCheckpasswordVisibility = document.querySelector('.signup-checkpassword-visibility');

console.log(SignupPasswordVisibility);


function togglePasswordVisibility(visibilityToggle) {
  const img = visibilityToggle.getAttribute('src');
  const newImg = img === './img/btn_visibility_off.svg' ? './img/btn_visibility_on.svg' : './img/btn_visibility_off.svg';
  const inputType = newImg.includes('on') ? 'text' : 'password'; //includes: 특정 문자열이 포함이 되어있는지 확인

  visibilityToggle.setAttribute('src', newImg);
  visibilityToggle.previousElementSibling.setAttribute('type', inputType);
}

SignupPasswordVisibility.addEventListener('click', () => togglePasswordVisibility(SignupPasswordVisibility));
SignupCheckpasswordVisibility.addEventListener('click', () => togglePasswordVisibility(SignupCheckpasswordVisibility));