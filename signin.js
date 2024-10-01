// ID를 통해 DOM 요소에 접근
const signinForm = document.querySelector("signinForm");

// 이메일
const email = document.querySelector('#email');
const emailInput = document.querySelector('.emailEmptyError');
const emailFalse = document.querySelector('.emailFalseError');

// 비밀번호
const password = document.querySelector('#password');
const passwordInput = document.querySelector('.passwordEmptyError');
const passwordFalse = document.querySelector('.passwordFalseError');

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
    return passwordRegex.length(password) >= 8;
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
    }
    else {
        password.classList.remove('error');
        passwordInput.style.display = 'none';
        passwordFalse.style.display = 'none';
    }
    toggleSubmitBtn()
});

// 로그인 버튼
function toggleSubmitBtn() {
    const isEmailValid = emailRegex.test(email.value); 
    const isPasswordValid = passwordRegex.length(password.value); 

    if (isEmailValid && isPasswordValid) {
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