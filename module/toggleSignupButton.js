const emailInput = document.querySelector('input[type="email"]');
const usernameInput = document.querySelector('input[type="username"]');
const passwordInput = document.querySelector('input[type="password"]');
const confirmPasswordInput = document.querySelector('input[type="passwordConfirm"]');
const signBtn = document.querySelector('.sign-button');

function toggleSignupButton() {
    if (emailInput.value && usernameInput.value && passwordInput.value && confirmPasswordInput.value) {
        signBtn.classList.add('active');
    } else {
        signBtn.classList.remove('active')
    }
}

emailInput.addEventListener('input', toggleSignupButton);
usernameInput.addEventListener('input', toggleSignupButton);
passwordInput.addEventListener('input', toggleSignupButton);
confirmPasswordInput.addEventListener('input', toggleSignupButton);
