const inputs = document.querySelectorAll('input');
const btn = document.getElementById('button');
const errorMessage = document.querySelectorAll('.error-msg')

const emailInput = document.getElementById('email');
const nicknameInput = document.getElementById('nickname');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm_password');

const emailError = document.getElementById('email-error');
const nicknameError = document.getElementById('nickname-error');
const passwordError = document.getElementById('pwd-error');
const confirmPasswordError = document.getElementById('confirmpwd-error');


// ================ 입력값 검증 ================

// 에러 메시지 텍스트 변경하고 visible로 바꾸는 함수 (+테두리색)
function visibleError (el, messageEl, msg) {
    messageEl.textContent = msg;
    messageEl.style.display = 'block';
    el.style.border = 'solid #F74747';
}

// 요소 hidden으로 바꾸는 함수
function hideError (el, messageEl) {
    messageEl.style.display = 'none';
    el.style.border = 'none';
}

// 빈 값 검증 (이메일, 비밀번호, 닉네임)
function validateEmpty (el, messageEl) {
    if (el.value  === '') {
        visibleError(el, messageEl, `${el.placeholder}`);
        return false;
    } else {
        hideError(el, messageEl);
        return true;
    };
}

// 이메일 형식 검증
function validateEmail (emailEl, messageEl) {
    email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if(!email_regex.test(emailEl.value)) {
        visibleError(emailEl, messageEl, '잘못된 이메일 형식입니다');
    } else hideError(emailEl, messageEl);
}

// 비밀번호 형식 검증
function validatePassword(passwordEl, messageEl) {
    if(passwordEl.value.length < 8) {
        visibleError(passwordEl, messageEl, '비밀번호를 8자 이상 입력해주세요');
    } else hideError(passwordEl, messageEl);
}

// 비밀번호 일치 여부 검증
function validateConfirmPassword(passwordEl, confirmEl, messageEl) {
    if(passwordEl.value !== confirmEl.value) {
        visibleError(confirmEl, messageEl, '비밀번호가 일치하지 않습니다');
    } else hideError(confirmEl, messageEl);
}

// 이벤트 리스너
emailInput.addEventListener('focusout', () => {
    if(validateEmpty(emailInput, emailError)) validateEmail(emailInput, emailError);
    updateButton();
})

if (nicknameInput) {
    nicknameInput.addEventListener('focusout', () => {
        validateEmpty(nicknameInput, nicknameError);
        updateButton();
    });
}

passwordInput.addEventListener('focusout', () => {
    if(validateEmpty(passwordInput, passwordError)) validatePassword(passwordInput, passwordError);
    updateButton();
})

if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('focusout', () => {
        validateConfirmPassword(passwordInput, confirmPasswordInput, confirmPasswordError);
        updateButton();
    });
}


// ================ 입력 필드 체크, 버튼 업데이트 ================

function checkErrorMessage(errorMessages) {
    for (const errorMessage of errorMessages) {
        if (errorMessage.style.display === 'block') return false;
    }
    return true;
}

// btn 업데이트
function updateButton(){
    checkErrorMessage(errorMessage) ? btn.classList.add('active') : btn.classList.remove('active');
}