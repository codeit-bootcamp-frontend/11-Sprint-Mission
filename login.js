// 이메일
const email = document.querySelector('#email');
const emailNull = document.querySelector('.email-null');
const emailCheck = document.querySelector('.email-check');

// 비밀번호
const password = document.querySelector('#password');
const passwordNull = document.querySelector('.password-null');
const passwordCheck = document.querySelector('.password-check');

// 로그인 버튼
const loginBtn = document.querySelector('#login-btn');

// 이메일 형식
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 이메일
email.addEventListener('input', function() {

    // 값 없는 경우
    if (!email.value) {
        email.classList.add('error');
        emailNull.style.display = 'block';
        emailCheck.style.display = 'none';
    }
    // 형식에 맞지 않는 경우
    else if (!emailPattern.test(email.value)) {
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

// 비밀번호 눈 아이콘
const eyeOff = document.querySelector(".eye-off");
const eyeOn = document.querySelector(".eye-on");

eyeOff.addEventListener('click', function() {
    password.type = "text"; 
    eyeOff.style.display = 'none';
    eyeOn.style.display = 'block';
});

eyeOn.addEventListener('click', function() {
    password.type = "password";
    eyeOn.style.display = 'none';
    eyeOff.style.display = 'block';
});
