const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const loginBtn = document.querySelector('.login-button');

const emailError = document.createElement('p');
const passwordError = document.createElement('p');

function toggleButton() {
    if (emailInput.value && passwordInput.value) {
        loginBtn.classList.add('active');
    } else {
        loginBtn.classList.remove('active')
    }
}

function focusOut(){
    if(!emailInput.value){
        emailInput.classList.add('input-error');
        emailError.textContent = "이메일을 입력해주세요.";
    }else{
        emailError.textContent = "";
    }
}

emailInput.addEventListener('input', toggleButton);
emailInput.addEventListener('focusout', focusOut);
passwordInput.addEventListener('input', toggleButton);