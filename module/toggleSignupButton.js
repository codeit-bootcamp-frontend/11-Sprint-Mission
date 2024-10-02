const emailInput = document.querySelector('input[type="email"]');
const usernameInput = document.querySelector('input[type="username"]');
const passwordInput = document.querySelector('input[type="password"]');
const confirmPasswordInput = document.querySelector('input[type="passwordConfirm"]');
const signBtn = document.querySelector('.sign-button');

const emailError = document.querySelector('div.email-error');
const usernameError = document.querySelector('div.username-error');
const passwordError = document.querySelector('div.password-error');
const passwordConfirmError = document.querySelector('div.passwordConfirm-error');

function toggleSignupButton() {
    if (emailInput.value && usernameInput.value && passwordInput.value && confirmPasswordInput.value && !emailError.textContent && !passwordError.textContent && !usernameError.textContent && !passwordConfirmError.textContent) {
        signBtn.classList.add('active');
    } else {
        signBtn.classList.remove('active')
    }
}

function focusOut(){ //에러 띄우기
    //이메일 검증
    if(!emailInput.value){
        emailInput.classList.add('input-error');
        emailError.textContent = "이메일을 입력해주세요.";
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)){
        emailInput.classList.add('input-error');
        emailError.textContent = "잘못된 이메일 형식입니다.";
    }
    else{
        emailInput.classList.remove('input-error');
        emailError.textContent = "";
    }
    //닉네임 검증
    if(!usernameInput.value){
        usernameInput.classList.add('input-error');
        usernameError.textContent = "닉네임을 입력해주세요.";
    }else{
        usernameInput.classList.remove('input-error');
        usernameError.textContent = "";
    }
    //비밀번호 검증
    if(!passwordInput.value){
        passwordInput.classList.add('input-error');
        passwordError.textContent = "비밀번호를 입력해주세요.";
    }else if(passwordInput.value.length<8){
        passwordInput.classList.add('input-error');
        passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
    }
    else{
        passwordInput.classList.remove('input-error');
        passwordError.textContent = "";
    }
    //비밀번호 확인 검증
    if(!confirmPasswordInput.value){
        confirmPasswordInput.classList.add('input-error');
        passwordConfirmError.textContent = "비밀번호를 다시 한 번 입력해주세요.";
    }else if(confirmPasswordInput.value.length<8){
        confirmPasswordInput.classList.add('input-error');
        passwordConfirmError.textContent = "비밀번호를 8자 이상 입력해주세요.";
    }else if(confirmPasswordInput.value !== passwordInput.value){
        confirmPasswordInput.classList.add('input-error');
        passwordConfirmError.textContent = "비밀번호가 일치하지 않습니다..";
    }
    else{
        confirmPasswordInput.classList.remove('input-error');
        passwordConfirmError.textContent = "";
    }
    toggleSignupButton(); //매번 에러 체크할때마다 버튼 상태 체크
}

emailInput.addEventListener('input', toggleSignupButton);
emailInput.addEventListener('focusout', focusOut);

usernameInput.addEventListener('input', toggleSignupButton);
usernameInput.addEventListener('focusout', focusOut);

passwordInput.addEventListener('input', toggleSignupButton);
passwordInput.addEventListener('focusout', focusOut);

confirmPasswordInput.addEventListener('input', toggleSignupButton);
confirmPasswordInput.addEventListener('focusout', focusOut);
