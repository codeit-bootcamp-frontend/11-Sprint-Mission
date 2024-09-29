
// ID를 통해 DOM 요소에 접근
const signupForm = document.querySelector("signupForm");

// 이메일
const email = document.querySelector('#email');
const emailInput = document.querySelector('.emailEmptyError');
const emailFalse = document.querySelector('.emailFalseError');

// 닉네임
const username = document.querySelector('#nickname');
const usernameInput = document.querySelector('.nicknameEmptyError');

// 비밀번호
const password = document.querySelector('#password');
const passwordInput = document.querySelector('.passwordEmptyError');
const passwordConfirmInput = document.querySelector('.passwordFalseError');

// 비밀번호 확인
const passwordCheck = document.querySelector('#passwordCheck');
const passwordConfirm = document.querySelector('.passwordConfirmError');
const passwordRetry = document.querySelector('.passwordretryError');

// 버튼
const submitBtn = document.querySelector('.sign_div form button[type="submit"]');

// 오류 메시지
function showError(input, errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = "block";
    input.style.border = "2px solid #f74747";
}

// 상태 초기화
function hideError(input, errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = "none";
    input.style.border = "none";
}

// 이메일 유효성 검사
function validateEmailString(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
};

// 비밀번호 유효성 검사
function validatePasswordString(password) {
    return password.length >= 8;
};

// 이메일(이벤트 핸들링)
email.addEventListener('input', function() {
    // if(!): if문 안의 내용을 부정했을 때 (반대로 했을 때) 참 값이면 실행
    // 값이 입력되지 않은 경우
    if(!email.value) {
        email.classList.add('error');
        emailInput.style.display = 'block';
        emailFalse.style.display = 'none';
    } 
    // 형식에 맞지 않는 경우
    else if (!emailRegex.test(email.value)) {
        email.classList.add('error');
        emailInput.style.display = 'none';
        emailFalse.style.display = 'block';
    }
    else {
        email.classList.remove('error');
        emailInput.style.display = 'none';
        emailFalse.style.display = 'none';
    }
    toggleSubmitBtn()
});

// 닉네임
username.addEventListener('input',function(){
    if(!username.value){
        username.classList.add('error');
        usernameNull.style.display = 'block';
    }else{
        username.classList.remove('error');
        usernameInput.style.display = 'none';
    }
    toggleSubmitBtn()
});

// 비밀번호(이벤트 핸들링)
password.addEventListener('input', function() {
    // 값이 입력되지 않은 경우
    if(!password.value) {
        password.classList.add('error');
        passwordInput.style.display = 'block';
        passwordFalse.style.display = 'none';
    }
    // 형식에 맞지 않는 경우
    else if (!passwordRegex.length(password.value)) {
        password.classList.add('error');
        passwordInput.style.display = 'none';
        passwordFalse.style.display = 'block';
    } else {
        password.classList.remove('error');
        passwordInput.style.display = 'none';
        passwordFalse.style.display = 'none';
    }
    toggleSubmitBtn()
});

// 비밀번호 확인
passwordCheck.addEventListener('input',function(){
    if(password.value != passwordCheck.value){
        passwordCheck.classList.add('error');
        passwordRetry.style.display = 'block';
    } else{
        passwordCheck.classList.remove('error');
        passwordRetry.style.display = 'none';
    }
    toggleSubmitBtn()
});

// 회원가입 버튼
function toggleSubmitBtn() {
    const isEmailValid = emailRegex.test(email.value); 
    const isPasswordValid = passwordRegex.length(password.value); 
    const isPasswordCheckValid = passwordCheck.value === password.value;
    const isUsernameValid = username.value.trim() !== "";

    if (isEmailValid && isPasswordValid && isPasswordVerifyValid && isUsernameValid) {
        submitBtn.classList.add('active');
        submitBtn.removeAttribute('disabled');
    } else {
        submitBtn.classList.remove('active');
        submitBtn.setAttribute('disabled', 'true');
    }
};

// 토글
const eyeInvisible = document.querySelector('.toggle_pwd_x');
const eyeVisible = document.querySelector('.toggle_pwd_o');

// 토글(이벤트 핸들링)
eyeInvisible.addEventListener('click', function() {
    password.type = 'text';
    eyeInvisible.style.display = 'none';
    eyeVisible.style.display = 'block';
});

eyeVisible.addEventListener('click', function() {
    password.type = 'password';
    eyeInvisible.style.display = 'block';
    eyeVisible.style.display = 'none';
});

// 토글_확인
const checkEyeInvisible = document.querySelector(".toggle_pwd_invisible");
const checkEyeVisible = document.querySelector(".toggle_pwd_visible");

// 토글_확인(이벤트 핸들러)
checkEyeInvisible.addEventListener('click', function() {
    passwordCheck.type = "text"; 
    checkEyeInvisible.style.display = 'none';
    checkEyeVisible.style.display = 'block';
});

checkEyeVisible.addEventListener('click', function() {
    passwordCheck.type = "password";
    checkEyeInvisible.style.display = 'block';
    checkEyeVisible.style.display = 'none';
});