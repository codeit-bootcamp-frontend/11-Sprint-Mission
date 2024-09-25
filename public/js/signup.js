const emailInput = document.getElementById("email-input");
const nicknameInput = document.getElementById("nickname-input");
const passwordInput = document.getElementById("password-input");
const passwordAgainInput = document.getElementById("password-again-input");
const signupButton = document.querySelector(".signup-main-button");
const emailForm = document.querySelector(".signup-main-input-email");
const nicknameForm = document.querySelector(".signup-main-input-nickname");
const passwordForm = document.querySelector(".signup-main-input-password");
const passwordAgainForm = document.querySelector(".signup-main-input-password-again");

function showErrorMessage(form, message) {
    let errorMessage = form.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        form.appendChild(errorMessage);
    }
    errorMessage.innerText = message;
}

function hideErrorMessage(form) {
    const errorMessage = form.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function toggleSignupButton() {
    const emailValue = emailInput.value.trim();
    const nicknameValue = nicknameInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const passwordAgainValue = passwordAgainInput.value.trim();
    const emailValid = validateEmail(emailValue);
    const nicknameValid = nicknameValue.length >= 1;
    const passwordValid = passwordValue.length >= 8;
    const passwordAgainValid = (passwordValue === passwordAgainValue);

    if (emailValid && nicknameValid && passwordValid && passwordAgainValid) {
        signupButton.classList.add('active');
        signupButton.disabled = false;
    } else {
        signupButton.classList.remove('active');
        signupButton.disabled = true;
    }
}

emailInput.addEventListener('blur', function () {
    const emailValue = emailInput.value.trim();

    if (!emailValue) {
        emailInput.classList.add('input-error');
        showErrorMessage(emailForm, '이메일을 입력해주세요.');
    } else if (!validateEmail(emailValue)) {
        emailInput.classList.add('input-error');
        showErrorMessage(emailForm, '잘못된 이메일 형식입니다.');
    } else {
        emailInput.classListremove('input-error');
        hideErrorMessage(emailForm);
    }
    toggleSignupButton();
});

nicknameInput.addEventListener('blur', function () {
    const nicknameValue = nicknameInput.value.trim();

    if (!nicknameValue) {
        nicknameInput.classList.add('input-error');
        showErrorMessage(nicknameForm, '닉네임을 입력해주세요.');
    } else {
        nicknameInput.classListremove('input-error');
        hideErrorMessage(nicknameForm);
    }
    toggleSignupButton();
})

passwordInput.addEventListener('blur', function () {
    const passwordValue = passwordInput.value.trim();

    if (!passwordValue) {
        passwordInput.classList.add('input-error');
        showErrorMessage(passwordForm, '비밀번호를 입력해주세요.');
    } else if (passwordValue.length < 8) {
        passwordInput.classList.add('input-error');
        showErrorMessage(passwordForm, '비밀번호를 8자 이상 입력해주세요.');
    } else {
        passwordInput.classList.remove('input-error');
        hideErrorMessage(passwordForm);
    }
    toggleSignupButton();
});