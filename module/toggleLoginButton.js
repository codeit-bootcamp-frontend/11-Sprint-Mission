const emailInput = document.querySelector('.emailInput');
const passwordInput = document.querySelector('.passwordInput');
const loginBtn = document.querySelector('.login-button');

const emailError = document.querySelector('div.email-error');
const passwordError = document.querySelector('div.password-error');

const passwordIcon = document.querySelector('.password-icon')

function toggleButton() { //버튼 활성화
    if (emailInput.value && passwordInput.value && !emailError.textContent && !passwordError.textContent) {
        loginBtn.classList.add('active');
    } else {
        loginBtn.classList.remove('active')
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
    toggleButton(); //매번 에러 체크할때마다 버튼 상태 체크
}

function passwordVisibleIcon(){
    const isVisible = passwordInput.type === 'text';
    passwordInput.type = isVisible ? 'password' : 'text';
    passwordIcon.src = isVisible ? './image/gnb/btn_visibility_off_24px.png' : './image/gnb/btn_visibility_on_24px.png'
}

emailInput.addEventListener('input', toggleButton);
emailInput.addEventListener('focusout', focusOut);

passwordInput.addEventListener('input', toggleButton);
passwordInput.addEventListener('focusout', focusOut);

passwordIcon.addEventListener('click', passwordVisibleIcon);