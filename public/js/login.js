// 이메일과 비밀번호 input 요소 가져오기
const emailInput = document.getElementsByClassName("email-input")[0];
const passwordInput = document.getElementsByClassName("password-input")[0];
const loginButton = document.querySelector(".login-main-button");
const emailForm = document.querySelector(".login-main-input-email");
const passwordForm = document.querySelector(".login-main-input-password");
const passwordFormCon = document.querySelector(".login-main-input-password-container")
const togglePassword = document.getElementById("toggle-password");
const eyeIcon = document.getElementById("eye-icon");



// 눈 모양 아이콘 함수
togglePassword.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';  // 비밀번호 보이기
        eyeIcon.src = '/public/images/btn_visibility_on_24px.png';
    } else {
        passwordInput.type = 'password';  // 비밀번호 가리기
        eyeIcon.src = '/public/images/btn_visibility_off_24px.png';
    }
});

// 에러 메시지 표시 함수
function showErrorMessage(form, message) {
    let errorMessage = form.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        form.appendChild(errorMessage);
    }
    errorMessage.innerText = message;
}

// 에러 메시지 숨기기 함수
function hideErrorMessage(form) {
    const errorMessage = form.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// 이메일 형식 검증 함수
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 로그인 버튼 활성화/비활성화 함수
function toggleLoginButton() {
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const emailValid = validateEmail(emailValue);
    const passwordValid = passwordValue.length >= 8;

    // 이메일과 비밀번호 모두 유효하면 버튼 활성화
    if (emailValid && passwordValid) {
        loginButton.classList.add('active');
        loginButton.disabled = false;
    } else {
        loginButton.classList.remove('active');
        loginButton.disabled = true;
    }
}

// 이메일 input에서 focus out 이벤트
emailInput.addEventListener('blur', function () {
    const emailValue = emailInput.value.trim();

    if (!emailValue) {
        emailInput.classList.add('input-error');
        showErrorMessage(emailForm, '이메일을 입력해주세요.');
    } else if (!validateEmail(emailValue)) {
        emailInput.classList.add('input-error');
        showErrorMessage(emailForm, '잘못된 이메일 형식입니다.');
    } else {
        emailInput.classList.remove('input-error');
        hideErrorMessage(emailForm);
    }
    toggleLoginButton();  // 로그인 버튼 활성화 상태 갱신
});

// 비밀번호 input에서 focus out 이벤트
passwordInput.addEventListener('blur', function () {
    const passwordValue = passwordInput.value.trim();

    if (!passwordValue) {
        passwordFormCon.classList.add('input-error');
        showErrorMessage(passwordForm, '비밀번호를 입력해주세요.');
    } else if (passwordValue.length < 8) {
        passwordFormCon.classList.add('input-error');
        showErrorMessage(passwordForm, '비밀번호를 8자 이상 입력해주세요.');
    } else {
        passwordFormCon.classList.remove('input-error');
        hideErrorMessage(passwordForm);
    }
    toggleLoginButton();
});

// input 이벤트로 입력 중 테두리 초기화 및 에러 메시지 숨기기
emailInput.addEventListener('input', function () {
    emailInput.classList.remove('input-error');
    hideErrorMessage(emailForm);
    toggleLoginButton();
});

// 비밀번호 input에서 입력 중일 때 테두리 초기화 및 에러 메시지 숨기기
passwordInput.addEventListener('input', function () {
    passwordFormCon.classList.remove('input-error');
    hideErrorMessage(passwordForm);
    toggleLoginButton();
});

// 로그인 버튼 클릭 이벤트
loginButton.addEventListener('click', function () {
    if (!loginButton.disabled) {
        window.location.href = "/items.html";
    }
});
