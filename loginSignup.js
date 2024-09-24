// 이메일
const email = document.querySelector('#email');
const emailNull = document.querySelector('.email-null');
const emailCheck = document.querySelector('.email-check');

// 비밀번호
const password = document.querySelector('#password');
const passwordNull = document.querySelector('.password-null');
const passwordCheck = document.querySelector('.password-check');

//비밀번호 확인
const passwordVerify = document.querySelector('#password-verify');
const passwordDifferent = document.querySelector('.password-different')

//닉네임
const username = document.querySelector('#username');
const usernameNull = document.querySelector('.username-null');

// 로그인 버튼
const loginBtn = document.querySelector('#login-btn');

//회원가입 버튼
const signupBtn = document.querySelector('#signup-btn')

// 이메일 형식
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// 이메일
email.addEventListener('input', function() {
    const emailValue = email.value;

    // 값 없는 경우
    if (!emailValue) {
        email.classList.add('error');
        emailNull.style.display = 'block';
        emailCheck.style.display = 'none';
    }
    // 형식에 맞지 않는 경우
    else if (!emailPattern.test(emailValue)) {
        email.classList.add('error');
        emailNull.style.display = 'none';
        emailCheck.style.display = 'block';
    }
 
    else {
        email.classList.remove('error');
        emailNull.style.display = 'none';
        emailCheck.style.display = 'none';
    }
    toggleLoginButton()
    toggleSinupButton()
});

// 비밀번호
password.addEventListener('input', function() {

    // 값 없는 경우
    if (!password.value) {
        password.classList.add('error');
        passwordNull.style.display = 'block';
        passwordCheck.style.display = 'none';
    }
    // 8자 미만인 경우
    else if (password.value.length < 8) {
        password.classList.add('error');
        passwordNull.style.display = 'none';
        passwordCheck.style.display = 'block';
    }

    else {
        password.classList.remove('error');
        passwordNull.style.display = 'none';
        passwordCheck.style.display = 'none';
    }
    toggleLoginButton()
    toggleSinupButton()
});

// 로그인 버튼
function toggleLoginButton() {
    const isEmailValid = emailPattern.test(email.value); 
    const isPasswordValid = password.value.length >= 8; 

    if (isEmailValid && isPasswordValid) {
        loginBtn.classList.add('active');
        loginBtn.removeAttribute('disabled');
    } else {
        loginBtn.classList.remove('active');
        loginBtn.setAttribute('disabled', 'true');
    }
};

// 비밀번호 확인
passwordVerify.addEventListener('input',function(){
    if(password.value != passwordVerify.value){
        passwordVerify.classList.add('error');
        passwordDifferent.style.display = 'block';
    } else{
        passwordVerify.classList.remove('error');
        passwordDifferent.style.display = 'none';
    }
    toggleSinupButton()
});

// 닉네임
username.addEventListener('input',function(){
    if(!username.value){
        username.classList.add('error');
        usernameNull.style.display = 'block';
    }else{
        username.classList.remove('error');
        usernameNull.style.display = 'none';
    }
    toggleSinupButton()
});

//회원가입 버튼
function toggleSinupButton() {
    const isEmailValid = emailPattern.test(email.value); 
    const isPasswordValid = password.value.length >= 8; 
    const isPasswordVerifyValid = passwordVerify.value === password.value;
    const isUsernameValid = username.value.trim() !== "";

    if (isEmailValid && isPasswordValid && isPasswordVerifyValid && isUsernameValid) {
        signupBtn.classList.add('active');
        loginBtn.removeAttribute('disabled');
    } else {
        signupBtn.classList.remove('active');
        signupBtn.setAttribute('disabled', 'true');
    }
};