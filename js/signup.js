import { isEmail, isPassword, showWarning, deleteWarning, validSignupInput } from './form-utils/validation.js';
import { passwordVisible, passwordInvisible } from './form-utils/password-toggle.js';

const inputs = document.querySelectorAll('input');
const emailInput = document.querySelector('#email');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const passwordCheckInput = document.querySelector('#password__check');

const warningEmail = document.querySelector('.warning__email');
const warningUsername = document.querySelector('.warning__username');
const warningPassword = document.querySelector('.warning__password');
const warningPasswordCheck = document.querySelector('.warning__password__check');

const buttonDisabled = document.querySelector('.button--disabled');
const buttonEnabled = document.querySelector('.button--enabled');

const visibleEye = document.querySelector('.password__visibility--on');
const invisibleEye = document.querySelector('.password__visibility--off');
const secondVisibleEye = document.querySelector('.password__check__visibility--on');
const secondInvisibleEye = document.querySelector('.password__check__visibility--off');


function invalidEmail() {
    emailInput.style.outline = 'none';
    if (emailInput.value.trim() == "") {
        showWarning(emailInput, warningEmail, '이메일을 입력해주세요.');
    } else if (!isEmail(emailInput.value)) {
        showWarning(emailInput, warningEmail, '잘못된 이메일 형식입니다.');
    }
}

function invalidUsername() {
    usernameInput.style.outline = 'none';
    if (usernameInput.value.trim() == "") {
        showWarning(usernameInput, warningUsername, '닉네임을 입력해주세요.');
    }
}
 
function invalidPassword() {
    passwordInput.style.outline = 'none';
    if (passwordInput.value.trim() == "") {
        showWarning(passwordInput, warningPassword, '비밀번호를 입력해주세요.');
    } else if (passwordInput.value.length < 8) {
        showWarning(passwordInput, warningPassword, '비밀번호를 8자 이상 입력해주세요.');
    }
}

function invalidPasswordCheck() {
    passwordCheckInput.style.outline = 'none';
    if (passwordCheckInput.value !== passwordInput.value) {
        showWarning(passwordCheckInput, warningPasswordCheck, '비밀번호가 일치하지 않습니다.');
    }
}

// 포커스 아웃 시 유효성 검사 후 오류 메시지 출력
emailInput.addEventListener('focusout', invalidEmail);
usernameInput.addEventListener('focusout', invalidUsername);
passwordInput.addEventListener('focusout', invalidPassword);
passwordCheckInput.addEventListener('focusout', invalidPasswordCheck);

// 비밀번호 공백 사용 금지
passwordInput.addEventListener('input', () => isPassword(passwordInput));
passwordCheckInput.addEventListener('input', () => isPassword(passwordCheckInput));

// 오류 메시지 제거
emailInput.addEventListener('focusin', () => deleteWarning(emailInput, warningEmail));
usernameInput.addEventListener('focusin', () => deleteWarning(usernameInput, warningUsername));
passwordInput.addEventListener('focusin', () => deleteWarning(passwordInput, warningPassword));
passwordCheckInput.addEventListener('focusin', () => deleteWarning(passwordCheckInput, warningPasswordCheck));

// 우측 클릭 사용 금지, 값 다 채워졌을 때 버튼 활성화
inputs.forEach(input => input.addEventListener('contextmenu', (event) => event.preventDefault()));
inputs.forEach(input => input.addEventListener('input', () => validSignupInput(buttonEnabled, buttonDisabled, emailInput, usernameInput, passwordInput, passwordCheckInput)));

// 비밀번호 눈 깜빡임
visibleEye.addEventListener('click', () => passwordVisible(passwordInput, visibleEye, invisibleEye));
invisibleEye.addEventListener('click', () => passwordInvisible(passwordInput, visibleEye, invisibleEye));
secondVisibleEye.addEventListener('click', () => passwordVisible(passwordCheckInput, secondVisibleEye, secondInvisibleEye));
secondInvisibleEye.addEventListener('click', () => passwordInvisible(passwordCheckInput, secondVisibleEye, secondInvisibleEye));