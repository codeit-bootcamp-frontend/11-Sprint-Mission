const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const loginButton = document.querySelector('button[type="submit"]');


function validateEmail() {
  const emailValue = emailInput.value.trim();  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailValue === '') {
    emailError.textContent = '이메일을 입력해주세요.';
    emailError.style.display = 'block';
    emailInput.style.borderColor = 'red';
    return false;
  } else if (!emailRegex.test(emailValue)) {
    emailError.textContent = '잘못된 이메일 형식입니다.';
    emailError.style.display = 'block';
    emailInput.style.borderColor = 'red';
    return false;
  } else {
    emailError.style.display = 'none';
    emailInput.style.borderColor = '';
    return true;
  }
}


function validatePassword() {
  const passwordValue = passwordInput.value.trim();

  if (passwordValue === '') {
    passwordError.textContent = '비밀번호를 입력해주세요.';
    passwordError.style.display = 'block';
    passwordInput.style.borderColor = 'red';
    return false;
  } else if
(passwordValue.length < 8) { passwordError.textContent = '비밀번호를 8자 이상 입력해주세요.'; passwordError.style.display = 'block'; passwordInput.style.borderColor = 'red'; return false; } else { passwordError.style.display = 'none'; passwordInput.style.borderColor = ''; return true; } }



function toggleLoginButton() {
const isEmailValid = validateEmail();
const isPasswordValid = validatePassword();

if (isEmailValid && isPasswordValid) {
loginButton.disabled = false;
} else {
loginButton.disabled = true;
}
}


emailInput.addEventListener('focusout', () => {
validateEmail();
toggleLoginButton();
});

passwordInput.addEventListener('focusout', () => {
validatePassword();
toggleLoginButton();
});


loginButton.addEventListener('click', (e) => {
e.preventDefault(); 

if (!loginButton.disabled) {
window.location.href = '/items';      
}
});